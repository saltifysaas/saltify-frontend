'use client';

import TopNavigationBar from '@/components/navigation/TopNavigationBar';
import LeftNavigationBar from '@/components/navigation/LeftNavigationBar';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function ContactHomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f]">
      <TopNavigationBar />
      <div className="flex px-2 pb-2">
        <LeftNavigationBar />
        <main className="flex-1 p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-[#00332D] dark:text-white">
            Contacts
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to your Contacts dashboard. Here you can view, search, and manage all your contacts.
          </p>
          {/* Future: table, filters, bulk import, etc. */}
        </main>
      </div>
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
