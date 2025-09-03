'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ModuleHomeHeader from '@/components/module/ModuleHomeHeader';
import ModuleListView, { type Column } from '@/components/module/ModuleListView';
import { Download, Trash2, Settings } from 'lucide-react';
import { type Segment } from '@/types/segment';
import { segmentColumns } from '@/components/module/segment/SegmentColumns';

// ---- helpers (no deps) ----
const slugify = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const deriveRouteId = (row: Segment, idx: number): string => {
  if (row.id && row.id.trim()) return row.id;
  if (row.name && row.name.trim()) return `${slugify(row.name)}-${idx}`;
  return `row-${idx}`;
};

const segmentDetailPath = (rid: string) => `/segments/${rid}`;

type SegmentRow = Segment & { _rid: string };

export default function SegmentsHomeClient({ data }: { data: Segment[] }) {
  const router = useRouter();

  // add a safe route id for every row
  const rows: SegmentRow[] = useMemo(
    () => data.map((r, i) => ({ ...r, _rid: deriveRouteId(r, i) })),
    [data]
  );

  // reuse your shared columns; cast to SegmentRow for ModuleListView generics
  const columns = segmentColumns as unknown as Column<SegmentRow>[];

  return (
    <>
      <ModuleHomeHeader
        onFilter={() => console.log('Filter Segments')}
        onCreate={() => router.push('/segments/create')}
        onImport={() => console.log('Import Segments')}
        tools={[
          { label: 'Export CSV', onClick: () => console.log('Export CSV'), icon: Download },
          { label: 'Bulk Delete', onClick: () => console.log('Bulk Delete'), icon: Trash2 },
          { label: 'Settings', onClick: () => console.log('Open Settings'), icon: Settings },
        ]}
      />

      <div className="mt-[4px]">
        <ModuleListView<SegmentRow>
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
            router.push(segmentDetailPath(row._rid)); // navigate on row click
          }}
          renderLabel={(row) => (
            <Link
              href={segmentDetailPath(row._rid)}
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
