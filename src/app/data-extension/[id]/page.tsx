'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';

export default function DataExtensionRecordPage() {
  const params = useParams();
  const deId = params?.id;

  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Data Extension Records
        </h1>
        <p className="text-gray-500 dark:text-gray-400">DE ID: {deId}</p>
        {/* Table of records inside this DE */}
      </div>
    </AppShell>
  );
}
