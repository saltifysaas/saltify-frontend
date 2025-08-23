'use client';

import AppShell from '@/components/layout/AppShell';
import ModuleHomeHeader from '@/components/module/ModuleHomeHeader';
import ModuleListView, { Column } from '@/components/module/ModuleListView';
import { PlusCircle, Upload, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DataExtension = {
  id: string;
  name: string;
  records: number;
  createdAt: string;
};

export default function DataExtensionPage() {
  // Dummy table config
  const columns: Column<DataExtension>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'records', label: 'Records', sortable: true, align: 'right' },
    { key: 'createdAt', label: 'Created At', sortable: true },
  ];

  const data: DataExtension[] = [
    { id: '1', name: 'Customer List', records: 1200, createdAt: '2025-08-01' },
    { id: '2', name: 'Newsletter Subscribers', records: 540, createdAt: '2025-08-10' },
  ];

  return (
    <AppShell>
      <div className="flex flex-col h-full w-full">
        {/* 🔹 Header */}
        <ModuleHomeHeader
          title="Data Extensions"
          description="Manage all your data extensions, import records, and access tools."
          actions={
            <div className="flex gap-2">
              <Button
                onClick={() => alert('Create Data Extension')}
                className="flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Create
              </Button>
              <Button
                onClick={() => alert('Import Data Extension')}
                className="flex items-center gap-1 bg-green-600 text-white hover:bg-green-700"
              >
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button
                onClick={() => alert('Open Tools')}
                className="flex items-center gap-1 bg-gray-600 text-white hover:bg-gray-700"
              >
                <Wrench className="w-4 h-4" />
                Tools
              </Button>
            </div>
          }
        />

        {/* 🔹 List View */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <ModuleListView columns={columns} data={data} />
        </div>
      </div>
    </AppShell>
  );
}
