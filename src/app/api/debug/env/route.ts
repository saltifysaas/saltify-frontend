export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    has_SUPABASE_URL: !!process.env.SUPABASE_URL,
    has_SERVICE_ROLE: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}
