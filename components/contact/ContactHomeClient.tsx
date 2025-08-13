'use client';

import ModuleHomeHeader from '@/components/module/ModuleHomeHeader';
import ModuleListView, { Column } from '@/components/module/ModuleListView';
import { Download, Trash2, Settings } from 'lucide-react';

type Contact = {
  id: string;
  name: string;
  email: string;
  company?: string;
  createdAt?: string; // ISO
};

export default function ContactHomeClient({ data }: { data: Contact[] }) {
  const columns: Column<Contact>[] = [
    { key: 'name', label: 'Name', sortable: true, widthClass: 'w-64' },
    { key: 'email', label: 'Email', sortable: true, widthClass: 'w-64' },
    { key: 'company', label: 'Company', sortable: true, widthClass: 'w-56' },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      widthClass: 'w-40',
      render: (v) => (v ? new Date(v).toLocaleDateString() : '—'),
      sortAccessor: (row) => (row.createdAt ? new Date(row.createdAt) : null),
      align: 'right',
    },
  ];

  return (
    <>
      <ModuleHomeHeader
        onFilter={() => console.log('Filter Contacts')}
        onCreate={() => console.log('Create Contact')}
        onImport={() => console.log('Import Contacts')}
        tools={[
          { label: 'Export CSV', onClick: () => console.log('Export CSV'), icon: Download },
          { label: 'Bulk Delete', onClick: () => console.log('Bulk Delete'), icon: Trash2 },
          { label: 'Settings', onClick: () => console.log('Open Settings'), icon: Settings },
        ]}
      />

      {/* ⬇️ Added 2px spacing */}
      <div className="mt-[4px]">
        <ModuleListView<Contact>
          columns={columns}
          data={data}
          idKey="id"
          initialPageSize={10}
          renderBulkActions={(rows) => (
            <>
              <button
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700"
                onClick={() => console.log('Export', rows.map(r => r.id))}
              >
                Export Selected
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700"
                onClick={() => console.log('Delete', rows.map(r => r.id))}
              >
                Delete Selected
              </button>
            </>
          )}
          onRowClick={(row) => console.log('Open', row.id)}
        />
      </div>
    </>
  );
}
