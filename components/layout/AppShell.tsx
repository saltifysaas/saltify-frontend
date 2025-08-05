'use client';

import LeftNavigationBar from '@/components/navigation/LeftNavigationBar';
import TopNavigationBar from '@/components/navigation/TopNavigationBar';
import Breadcrumbs from '@/components/navigation/Breadcrumb';

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function AppShell({ children, breadcrumbs }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f] flex">
      {/* Flush Left Navigation Bar */}
      <LeftNavigationBar />

      <div className="flex-1 flex flex-col">
        {/* Full-width Top Navigation Bar */}
        <TopNavigationBar />

        {/* Page content */}
        <main className="flex-1">
          {/* ✅ Breadcrumb block */}
          {breadcrumbs && (
            <div className="max-w-6xl mx-auto px-4 pt-4">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}