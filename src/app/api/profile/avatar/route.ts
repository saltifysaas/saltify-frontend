// app/api/profile/avatar/route.ts
import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { supaAdmin } from '@/lib/supabaseAdmin';

async function resolveUserId(): Promise<string | null> {
  const h = headers();
  const c = cookies();
  return (
    h.get('x-user-id') ??
    c.get('uid')?.value ??
    (await supaAdmin.from('users').select('id').order('created_at', { ascending: false }).limit(1).maybeSingle()).data
      ?.id ??
    null
  );
}

export async function POST(req: Request) {
  try {
    const userId = await resolveUserId();
    if (!userId) return NextResponse.json({ error: 'No user' }, { status: 404 });

    const fd = await req.formData();
    const file = fd.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }

    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
    const path = `avatars/${userId}-${Date.now()}.${ext}`;

    const up = await supaAdmin.storage
      .from('profiles')
      .upload(path, buffer, { contentType: file.type || 'application/octet-stream', upsert: true });

    if (up.error) return NextResponse.json({ error: up.error.message }, { status: 500 });

    const pub = supaAdmin.storage.from('profiles').getPublicUrl(path);
    const url = pub.data.publicUrl;

    await supaAdmin.from('users').update({ avatar_url: url }).eq('id', userId);

    return NextResponse.json({ url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
