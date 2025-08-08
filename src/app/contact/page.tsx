'use client';

import AppShell from '@/components/layout/AppShell';

export default function ContactsHomePage() {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contacts</h1>
        <p className="text-gray-500 dark:text-gray-400">This will show a list of all your contacts.</p>
        {/* Contact Table/Filters will go here */}
      </div>
    </AppShell>
  );
}
