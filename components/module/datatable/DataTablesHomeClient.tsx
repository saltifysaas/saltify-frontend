'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ModuleHomeHeader from '@/components/module/ModuleHomeHeader';
import ModuleListView, { type Column } from '@/components/module/ModuleListView';
import { Download, Trash2, Settings } from 'lucide-react';
import { type DataTable } from '@/types/datatable';
import { dataTableColumns } from '@/components/module/datatable/DataTableColumns';

// ---- helpers (no deps) ----
const slugify = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const deriveRouteId = (row: DataTable, idx: number): string => {
  if (row.id && row.id.trim()) return row.id;
  if (row.name && row.name.trim()) return `${slugify(row.name)}-${idx}`;
  return `row-${idx}`;
};

const tableDetailPath = (rid: string) => `/data-tables/${rid}`;

type DataTableRow = DataTable & { _rid: string };

export default function DataTablesHomeClient({ data }: { data: DataTable[] }) {
  const router = useRouter();

  // add a safe route id for every row
  const rows: DataTableRow[] = useMemo(
    () => data.map((r, i) => ({ ...r, _rid: deriveRouteId(r, i) })),
    [data]
  );

  // reuse your shared columns; cast to row type for ModuleListView generics
  const columns = dataTableColumns as unknown as Column<DataTableRow>[];

  return (
    <>
      <ModuleHomeHeader
        onFilter={() => console.log('Filter Tables')}
        onCreate={() => router.push('/data-tables/create')}
        onImport={() => console.log('Import Tables')}
        tools={[
          { label: 'Export CSV', onClick: () => console.log('Export CSV'), icon: Download },
          { label: 'Bulk Delete', onClick: () => console.log('Bulk Delete'), icon: Trash2 },
          { label: 'Settings', onClick: () => console.log('Open Settings'), icon: Settings },
        ]}
      />

      <div className="mt-[4px]">
        <ModuleListView<DataTableRow>
          columns={columns}
          data={rows}
          idKey="_rid"
          initialPageSize={10}
          renderBulkActions={(sel) => (
            <>
              <button
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700"
                onClick={() => console.log('Export', sel.map((r) => r._rid))}
              >
                Export Selected
              </button>
              <button
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700"
                onClick={() => console.log('Delete', sel.map((r) => r._rid))}
              >
                Delete Selected
              </button>
            </>
          )}
          onRowClick={(row) => {
            router.push(tableDetailPath(row._rid)); // navigate on row click
          }}
          // optional: make the name a link like Contacts
          renderLabel={(row) => (
            <Link
              href={tableDetailPath(row._rid)}
              className="text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {row.name}
            </Link>
          )}
        />
      </div>
    </>
  );
}
