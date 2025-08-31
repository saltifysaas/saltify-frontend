// src/lib/supabaseAdmin.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function supaAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !serviceRole) {
    // Helpful server log while keeping a simple error to client
    console.error('Supabase admin missing env', {
      hasUrl: !!url,
      hasServiceRole: !!serviceRole,
    });
    throw new Error('Supabase admin not configured (missing SUPABASE_URL / SUPABASE_SERVICE_ROLE)');
  }

  return createClient(url, serviceRole, { auth: { persistSession: false } });
}
