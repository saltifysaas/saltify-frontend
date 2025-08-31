import crypto from 'crypto';
import { supaAdmin } from './supabaseAdmin';

const OTP_SALT = process.env.OTP_SALT || 'dev-otp-salt';
const OTP_TOKEN_SECRET = process.env.OTP_TOKEN_SECRET || 'dev-token-secret';

export type OtpKind = 'phone' | 'email';

export function normalizeTarget(kind: OtpKind, raw: string) {
  if (kind === 'phone') {
    const s = raw.replace(/[^\d+]/g, '');
    return s.startsWith('+') ? s : '+91' + s.replace(/^0+/, '');
  }
  // email
  return raw.trim().toLowerCase();
}

export function genCode(digits = 6) {
  // cryptographically strong numeric code
  const max = 10 ** digits;
  const n = crypto.randomInt(0, max);
  return String(n).padStart(digits, '0');
}

export function hashCode(target: string, code: string) {
  return crypto.createHmac('sha256', OTP_SALT).update(`${target}|${code}`).digest('hex');
}

function safeEqualHex(a: string, b: string) {
  const ab = Buffer.from(a, 'hex');
  const bb = Buffer.from(b, 'hex');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function signVerificationToken(payload: Record<string, any>, ttlSec = 600) {
  const body = { ...payload, iat: Date.now(), exp: Date.now() + ttlSec * 1000 };
  const base = Buffer.from(JSON.stringify(body)).toString('base64url');
  const sig = crypto.createHmac('sha256', OTP_TOKEN_SECRET).update(base).digest('base64url');
  return `${base}.${sig}`;
}

export function verifyVerificationToken(token: string) {
  try {
    const [base, sig] = token.split('.');
    const expSig = crypto.createHmac('sha256', OTP_TOKEN_SECRET).update(base).digest('base64url');
    if (sig !== expSig) return null;
    const body = JSON.parse(Buffer.from(base, 'base64url').toString('utf8'));
    if (body.exp && body.exp < Date.now()) return null;
    return body;
  } catch {
    return null;
  }
}

type IssueOpts = {
  kind: OtpKind;
  targetRaw: string;
  purpose?: string;       // 'signup' | 'login' | ...
  ttlSec?: number;        // default 5m
  cooldownSec?: number;   // default 45s
  digits?: number;        // default 6
  maxPerHour?: number;    // simple abuse control, default 6
};

export async function issueOtp(opts: IssueOpts) {
  const purpose = opts.purpose || 'signup';
  const ttlSec = opts.ttlSec ?? 300;
  const cooldownSec = opts.cooldownSec ?? 45;
  const digits = opts.digits ?? 6;
  const maxPerHour = opts.maxPerHour ?? 6;

  const target = normalizeTarget(opts.kind, opts.targetRaw);

  // Cooldown: last record
  const { data: last } = await supaAdmin
    .from('verifications')
    .select('id,created_at')
    .eq('kind', opts.kind)
    .eq('target', target)
    .eq('purpose', purpose)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (last) {
    const seconds = Math.floor((Date.now() - new Date(last.created_at).getTime()) / 1000);
    const left = cooldownSec - seconds;
    if (left > 0) {
      return { ok: false as const, error: 'cooldown', retry_after: left };
    }
  }

  // Per-hour cap
  const hourAgo = new Date(Date.now() - 60 * 60_000).toISOString();
  const { count } = await supaAdmin
    .from('verifications')
    .select('*', { count: 'exact', head: true })
    .eq('kind', opts.kind)
    .eq('target', target)
    .eq('purpose', purpose)
    .gte('created_at', hourAgo);
  if ((count || 0) >= maxPerHour) {
    return { ok: false as const, error: 'rate_limited' };
  }

  const code = genCode(digits);
  const code_hash = hashCode(target, code);
  const expires_at = new Date(Date.now() + ttlSec * 1000).toISOString();

  const { error: insErr } = await supaAdmin.from('verifications').insert({
    kind: opts.kind,
    target,
    purpose,
    code_hash,
    expires_at,
    attempts: 0,
  });
  if (insErr) throw insErr;

  const devReveal = process.env.DEBUG_SHOW_OTP === '1' ? code : undefined;
  return { ok: true as const, code, target, devReveal, ttlSec };
}

type VerifyOpts = {
  kind: OtpKind;
  targetRaw: string;
  purpose?: string;
  code: string;
  maxAttempts?: number; // default 5
};

export async function verifyOtp(opts: VerifyOpts) {
  const purpose = opts.purpose || 'signup';
  const maxAttempts = opts.maxAttempts ?? 5;
  const target = normalizeTarget(opts.kind, opts.targetRaw);

  const { data: rec } = await supaAdmin
    .from('verifications')
    .select('*')
    .eq('kind', opts.kind)
    .eq('target', target)
    .eq('purpose', purpose)
    .is('used_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!rec) return { ok: false as const, error: 'no_code' };
  if (new Date(rec.expires_at).getTime() < Date.now()) return { ok: false as const, error: 'expired' };
  if (rec.attempts >= maxAttempts) return { ok: false as const, error: 'too_many_attempts' };

  const match = safeEqualHex(rec.code_hash, hashCode(target, opts.code));
  if (!match) {
    await supaAdmin.from('verifications').update({ attempts: rec.attempts + 1 }).eq('id', rec.id);
    return { ok: false as const, error: 'invalid' };
  }

  await supaAdmin.from('verifications').update({ used_at: new Date().toISOString() }).eq('id', rec.id);

  const verification_token = signVerificationToken({ type: opts.kind, target, purpose }, 10 * 60); // 10 min
  return { ok: true as const, verification_token, target };
}
