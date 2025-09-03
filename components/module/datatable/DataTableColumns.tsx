'use client';
import { type Column } from '@/components/module/ModuleListView';
import { type DataTable } from '@/types/datatable';

export const dataTableColumns: Column<DataTable>[] = [
  { key: 'name', label: 'Table Name', sortable: true, widthClass: 'w-72' },
  { key: 'records', label: 'Records', sortable: true, align: 'right', widthClass: 'w-32' },
  { key: 'fields',  label: 'Fields',  sortable: true, align: 'right', widthClass: 'w-28' },
  {
    key: 'updatedAt',
    label: 'Last Updated',
    sortable: true,
    widthClass: 'w-56',
    render: v => new Date(String(v)).toLocaleString(),
  },
];
