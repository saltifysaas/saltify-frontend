// src/app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { supaAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ProfileRow = {
  id: string;
  salutation: string | null;
  gender: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile: string | null;
  alt_contact: string | null;
  job_title: string | null;
  role_internal: string | null;
  signature: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  followers?: number | null;
  following?: number | null;
};

const ALLOWED_FIELDS = new Set<keyof ProfileRow>([
  'salutation',
  'gender',
  'first_name',
  'last_name',
  'email',
  'mobile',
  'alt_contact',
  'job_title',
  'role_internal',
  'signature',
  'avatar_url',
  'cover_url',
]);

function pickUpdatable(input: Record<string, unknown>) {
  const out: Partial<ProfileRow> = {};
  for (const [k, v] of Object.entries(input)) {
    if (ALLOWED_FIELDS.has(k as keyof ProfileRow) && (typeof v === 'string' || v === null)) {
      (out as Record<string, string | null>)[k] = v as string | null;
    }
  }
  return out;
}

async function resolveUserId(url: URL): Promise<string | null> {
  const h = headers();
  const c = cookies();

  const q = url.searchParams.get('userId');
  if (q) return q;

  const hdr = h.get('x-user-id');
  if (hdr) return hdr;

  const ck = c.get('uid')?.value;
  if (ck) return ck;

  const db = supaAdmin();
  const latest = await db
    .from('users')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return latest.data?.id ?? null;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = await resolveUserId(url);
    if (!userId) return NextResponse.json({ error: 'No user found' }, { status: 404 });

    const db = supaAdmin();
    const sel = await db
      .from('users')
      .select(
        [
          'id',
          'salutation',
          'gender',
          'first_name',
          'last_name',
          'email',
          'mobile',
          'alt_contact',
          'job_title',
          'role_internal',
          'signature',
          'avatar_url',
          'cover_url',
        ].join(',')
      )
      .eq('id', userId)
      .single();

    if (sel.error) return NextResponse.json({ error: sel.error.message }, { status: 500 });

    const profile: ProfileRow = sel.data as ProfileRow;
    (profile as Record<string, unknown>).followers ??= 0;
    (profile as Record<string, unknown>).following ??= 0;
    (profile as Record<string, unknown>).is_self = true;

    return NextResponse.json({ profile });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to load profile';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = await resolveUserId(url);
    if (!userId) return NextResponse.json({ error: 'No user found' }, { status: 404 });

    const body = (await req.json()) as Record<string, unknown>;
    const update = pickUpdatable(body);
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'No valid fields' }, { status: 400 });
    }

    const db = supaAdmin();
    const upd = await db.from('users').update(update).eq('id', userId).select('id').single();
    if (upd.error) return NextResponse.json({ error: upd.error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to update profile';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
