'use client';

import TopNavigationBar from '@/components/navigation/TopNavigationBar';
import LeftNavigationBar from '@/components/navigation/LeftNavigationBar';
import Breadcrumb from '@/components/navigation/Breadcrumb'; // ✅ Import Breadcrumb
import CreateContactPage from '@/components/contact/CreateContactPage';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function CreateContactRoutePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1f]">
      <TopNavigationBar />

      <div className="flex gap-[1px] px-2 pb-2">
        <LeftNavigationBar />

        <main className="w-full max-w-6xl mx-auto p-6">
          <Breadcrumb /> {/* ✅ Add Breadcrumb here */}

          <CreateContactPage />
        </main>
      </div>

      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
