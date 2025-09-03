import AppShell from '@/components/layout/AppShell';
import DataTablesHomeClient from '@/components/module/datatable/DataTablesHomeClient';

// Server Component
export default async function DataTablesHomePage() {
  // TODO: replace with Supabase/DB call
  const tables = [
    { id: 'tbl_contacts', name: 'Contacts', records: 1289, fields: 16, updatedAt: new Date().toISOString() },
    { id: 'tbl_products', name: 'Products', records: 312, fields: 12, updatedAt: new Date().toISOString() },
  ];

  return (
    <AppShell>
      <DataTablesHomeClient data={tables} />
    </AppShell>
  );
}
