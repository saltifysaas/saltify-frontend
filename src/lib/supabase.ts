import { createClient } from '@supabase/supabase-js';

export function supabaseServer() {
  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon =
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) throw new Error('Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)');
  if (!anon) throw new Error('Missing SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)');

  return createClient(url, anon, { auth: { persistSession: false } });
}
