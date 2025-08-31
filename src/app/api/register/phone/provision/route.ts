// app/api/register/phone/provision/route.ts
import { NextResponse } from 'next/server';
import { supaAdmin } from '@/src/lib/supabaseAdmin';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

type Body = {
  verification_token: string;
  company: string;
  subdomain: string;
  password: string;
  email?: string | null;
  phone?: string | null; // optional override; we primarily pull phone from otp row
};

const OWNER_ROLE = 'owner';

export async function POST(req: Request) {
  try {
    const { verification_token, company, subdomain, password } = (await req.json()) as Body;

    if (!verification_token || !company || !subdomain || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1) Validate verification token & fetch phone
    const { data: otpRow, error: otpErr } = await supaAdmin
      .from('otp_codes')
      .select('id, phone, verified, verification_expires_at')
      .eq('verification_token', verification_token)
      .single();

    if (otpErr || !otpRow) {
      return NextResponse.json({ error: 'Invalid or used verification token' }, { status: 400 });
    }
    if (!otpRow.verified) {
      return NextResponse.json({ error: 'Token not verified yet' }, { status: 400 });
    }
    if (new Date(otpRow.verification_expires_at).getTime() < Date.now()) {
      return NextResponse.json({ error: 'Verification token expired' }, { status: 400 });
    }
    const phone = otpRow.phone as string;

    // 2) Ensure user exists (create or reuse) and get its id
    const password_hash = await bcrypt.hash(password, 10);

    // Try to find existing user by phone first
    let userId: string | null = null;

    const { data: existingUser, error: findErr } = await supaAdmin
      .from('users')
      .select('id')
      .eq('phone', phone)
      .maybeSingle();

    if (findErr) {
      return NextResponse.json({ error: findErr.message }, { status: 500 });
    }

    if (existingUser) {
      userId = existingUser.id;
      // Optionally refresh password hash if empty:
      // await supaAdmin.from('users').update({ password_hash }).eq('id', userId);
    } else {
      const newId = crypto.randomUUID();
      const { data: created, error: createErr } = await supaAdmin
        .from('users')
        .insert({
          id: newId,
          phone,
          password_hash,
          // fill optional columns your schema has, e.g. name, email, created_at
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (createErr) {
        return NextResponse.json({ error: `Create user failed: ${createErr.message}` }, { status: 400 });
      }
      userId = created!.id;
    }

    // 3) Create workspace (use the **actual** userId we just confirmed)
    const { data: ws, error: wsErr } = await supaAdmin
      .from('workspaces')
      .insert({
        name: company,
        subdomain,
        created_by: userId, // <-- this must exist in public.users(id)
        created_at: new Date().toISOString(),
      })
      .select('id, subdomain')
      .single();

    if (wsErr) {
      return NextResponse.json({ error: `Create workspace failed: ${wsErr.message}` }, { status: 400 });
    }

    // 4) Insert owner membership
    const { error: memErr } = await supaAdmin
      .from('workspace_members')
      .insert({
        workspace_id: ws.id,
        user_id: userId,
        role: OWNER_ROLE,
        created_at: new Date().toISOString(),
      });

    if (memErr) {
      return NextResponse.json({ error: `Create membership failed: ${memErr.message}` }, { status: 400 });
    }

    // 5) (Optional) mark OTP row as consumed so token can’t be reused
    await supaAdmin
      .from('otp_codes')
      .update({ verification_token: null })
      .eq('id', otpRow.id);

    const workspace_url = `https://${ws.subdomain}.${process.env.NEXT_PUBLIC_APP_DOMAIN || 'saltifysaas.com'}`;
    return NextResponse.json({ ok: true, workspace_url });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Provision failed' }, { status: 500 });
  }
}
