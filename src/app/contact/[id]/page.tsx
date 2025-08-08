'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';

export default function ContactRecordPage() {
  const params = useParams();
  const contactId = params?.id;

  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Contact Details
        </h1>
        <p className="text-gray-500 dark:text-gray-400">ID: {contactId}</p>
        {/* Tabs, Info Cards, Timeline, etc. */}
      </div>
    </AppShell>
  );
}
