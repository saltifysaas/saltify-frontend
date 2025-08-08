'use client';

import AppShell from '@/components/layout/AppShell';

export default function ContactBuilderPage() {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Create New Contact</h1>
        <p className="text-gray-500 dark:text-gray-400">Use this form to build a contact record manually.</p>
        {/* DE-driven form field builder comes here */}
      </div>
    </AppShell>
  );
}
