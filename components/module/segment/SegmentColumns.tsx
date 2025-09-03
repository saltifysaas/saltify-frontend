'use client';
import { type Column } from '@/components/module/ModuleListView';
import { type Segment } from '@/types/segment';

export const segmentColumns: Column<Segment>[] = [
  { key: 'name', label: 'Segment Name', sortable: true, widthClass: 'w-72' },
  {
    key: 'sources',
    label: 'Sources',
    widthClass: 'w-[28rem]',
    render: (value: unknown) => {
      const arr = (value as Segment['sources']) ?? [];
      return (
        <div className="flex flex-wrap gap-1">
          {arr.map(s => (
            <span key={s.id} className="px-2 py-0.5 rounded-md border text-xs">
              {s.name}
            </span>
          ))}
        </div>
      );
    },
  },
  { key: 'records', label: 'Records', sortable: true, align: 'right', widthClass: 'w-32' },
  {
    key: 'updatedAt',
    label: 'Last Updated',
    sortable: true,
    widthClass: 'w-56',
    render: (v) => new Date(String(v)).toLocaleString(),
  },
];
