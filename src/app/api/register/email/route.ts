import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/** ===== Config ===== */
const APP_DOMAIN =
  process.env.NEXT_PUBLIC_APP_DOMAIN || 'saltifysaas.com';
const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
// Fallback origin if wildcard subdomains aren’t allowed yet (dev safe)
const FALLBACK_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/** ===== Minimal validators ===== */
const RESERVED = new Set([
  'www','app','api','cdn','static','assets','admin','edge','docs','help','status','support','blog',
  'dev','stage','staging','prod','production','dashboard','mail','smtp','imap','ftp','sso','auth',
  'login','logout','register','signup','files','media','images','img','video','portal','store',
  'shop','billing','payments','ws','socket','graphql','rest','v1','v2'
]);
const isAlnum = (c: string) => {
  const code = c.charCodeAt(0);
  return (code >= 48 && code <= 57) || (code >= 97 && code <= 122);
};
function isValidSubdomain(s: string) {
  if (!s) return false;
  if (s.length < 3 || s.length > 63) return false;
  for (const ch of s) {
    const ok = ch === '-' || isAlnum(ch);
    if (!ok) return false;
  }
  return true;
}
const isEmail = (v: string) => /.+@.+\..+/.test(v);

function looksLikeRedirectError(msg: string) {
  const m = msg.toLowerCase();
  return (
    m.includes('redirect') ||
    m.includes('url not allowed') ||
    m.includes('site url') ||
    m.includes('for security reasons')
  );
}
function looksLikeSmtpError(msg: string) {
  const m = msg.toLowerCase();
  return (
    m.includes('smtp') ||
    m.includes('email provider') ||
    m.includes('error sending confirmation email') ||
    m.includes('failed to send')
  );
}

export async function POST(req: Request) {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Supabase env missing (SUPABASE_URL / SUPABASE_ANON_KEY)' },
        { status: 500 }
      );
    }

    const { email, password, company, subdomain } = await req.json();

    // Basic input checks
    if (!email || !password || !subdomain) {
      return NextResponse.json(
        { error: 'Missing email/password/subdomain' },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const sub = String(subdomain).toLowerCase();
    if (!isValidSubdomain(sub)) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 });
    }
    if (RESERVED.has(sub)) {
      return NextResponse.json({ error: 'Subdomain is reserved' }, { status: 400 });
    }

    // TODO: enforce subdomain uniqueness in your DB here. If taken:
    // return NextResponse.json({ error: 'Subdomain already taken' }, { status: 409 });

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });

    // Try workspace redirect first (recommended)
    let emailRedirectTo = `https://${sub}.${APP_DOMAIN}/auth/verified`;

    async function trySignUp(redirectTo: string) {
      return await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      });
    }

    let { data, error } = await trySignUp(emailRedirectTo);

    // If redirect isn’t in the allowed list, retry with a safe fallback
    if (error && looksLikeRedirectError(error.message)) {
      emailRedirectTo = `${FALLBACK_BASE_URL}/auth/verified?ws=${encodeURIComponent(sub)}`;
      ({ data, error } = await trySignUp(emailRedirectTo));
    }

    if (error) {
      // Map common cases to friendly messages
      const msg = error.message || 'Unknown error';
      if (looksLikeSmtpError(msg)) {
        return NextResponse.json(
          {
            error:
              'Error sending confirmation email. Configure SMTP (Auth → Email → SMTP) or disable custom SMTP to use the built-in sender.',
            details: msg,
          },
          { status: 502 }
        );
      }
      if (msg.toLowerCase().includes('already registered')) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // TODO: create tenant + workspace with status='pending_verification'
    // and place a soft hold on {sub} (TTL). Store `company` if provided.

    return NextResponse.json({
      status: 'pending_verification',
      user_id: data.user?.id,
      workspace_url: `https://${sub}.${APP_DOMAIN}/onboarding`,
      message: 'Verification email sent',
      redirect_used: emailRedirectTo,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: 'Use POST' }, { status: 405 });
}
