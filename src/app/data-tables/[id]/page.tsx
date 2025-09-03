// file: /src/app/data-tables/[id]/page.tsx
import Link from 'next/link';
import { MOCK_TABLES, MOCK_SEGMENTS } from '@/utils/mockData';

type Props = { params: { id: string } };

export default function DataTableDetail({ params }: Props) {
  const table = MOCK_TABLES.find((t) => t.id === params.id);
  if (!table) return <div className="p-6">Table not found.</div>;

  // Segments are GLOBAL; show only those that include this table as a source
  const related = MOCK_SEGMENTS.filter((seg) =>
    seg.sources?.some((src) => src.id === table.id)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{table.name}</h1>
          <p className="text-sm opacity-70">
            {table.records} records • {table.fields} fields
          </p>
        </div>
        <div className="flex gap-2">
          <Link className="px-3 py-2 rounded-md bg-primary text-primary-foreground" href="#">
            Add Record
          </Link>
          <Link className="px-3 py-2 rounded-md border" href="#">
            Manage Fields
          </Link>
        </div>
      </div>

      {/* Related Segments (from global Segments) */}
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Related Segments</h2>
          <Link href="/segments" className="text-sm underline">
            View all segments
          </Link>
        </div>

        {related.length > 0 ? (
          <ul className="divide-y">
            {related.map((seg) => (
              <li key={seg.id} className="py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <Link
                    href={`/segments/${seg.id}`}
                    className="font-medium hover:underline truncate block"
                    title={seg.name}
                  >
                    {seg.name}
                  </Link>

                  {/* Criteria preview */}
                  <div className="text-xs opacity-70 mt-1 truncate">
                    {seg.criteriaText ?? 'Criteria available in segment'}
                  </div>

                  {/* Source chips */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {seg.sources.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 rounded-md border text-[11px]"
                        title={s.name}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side meta */}
                <div className="text-sm opacity-70 shrink-0 pl-4">
                  {seg.records} records
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 rounded-md border">
            <p className="text-sm opacity-70">
              No segments currently reference this table.
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/segments/create"
                className="px-3 py-2 rounded-md bg-primary text-primary-foreground"
              >
                Create Segment
              </Link>
              <Link href="/segments" className="px-3 py-2 rounded-md border">
                Browse Segments
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
