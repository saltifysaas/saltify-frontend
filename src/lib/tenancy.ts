// src/lib/tenancy.ts
import { supaAdmin } from '@/src/lib/supabaseAdmin';

/**
 * Adjust ONLY these if your table/column names differ.
 * From your screenshot, workspace_members has: workspace_id, user_id, role, created_at
 */
const WORKSPACES_TABLE = 'workspaces';
const MEMBERS_TABLE = 'workspace_members';
const SUBDOMAIN_COL = 'subdomain'; // change to 'slug' if your schema uses that

export type EnsureWorkspaceArgs = {
  userId: string;     // owner user id
  company: string;    // display name
  subdomain: string;  // validated slug
};

export async function ensureWorkspaceAndOwner({
  userId,
  company,
  subdomain,
}: EnsureWorkspaceArgs) {
  const slug = subdomain.toLowerCase();

  // 1) Insert workspace (no upsert first — avoids overwriting)
  const ins = await supaAdmin
    .from(WORKSPACES_TABLE)
    .insert([{ name: company, [SUBDOMAIN_COL]: slug, created_by: userId }])
    .select('id, created_by, ' + SUBDOMAIN_COL)
    .single();

  let workspaceId: string;

  if (ins.error) {
    // Unique violation → fetch existing by subdomain
    const pgCode = (ins as any).error?.code;
    if (pgCode !== '23505') throw ins.error;

    const ex = await supaAdmin
      .from(WORKSPACES_TABLE)
      .select('id, created_by, ' + SUBDOMAIN_COL)
      .eq(SUBDOMAIN_COL, slug)
      .single();

    if (ex.error) throw ex.error;

    // Do not let another user's workspace be claimed
    if (ex.data.created_by && ex.data.created_by !== userId) {
      const err: any = new Error('Subdomain already taken');
      err.status = 409;
      throw err;
    }

    workspaceId = ex.data.id;
  } else {
    workspaceId = ins.data.id;
  }

  // 2) Ensure membership row as OWNER (idempotent on (workspace_id,user_id))
  const mem = await supaAdmin
    .from(MEMBERS_TABLE)
    .upsert([{ workspace_id: workspaceId, user_id: userId, role: 'owner' }], {
      onConflict: 'workspace_id,user_id',
    });

  if (mem.error) throw mem.error;

  return { workspaceId, subdomain: slug };
}
