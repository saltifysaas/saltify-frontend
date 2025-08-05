'use client';

import TopNavigationBar from '@/components/navigation/TopNavigationBar';
import LeftNavigationBar from '@/components/navigation/LeftNavigationBar';
import Breadcrumbs from '@/components/navigation/Breadcrumb';

interface AppShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function AppShell({ children, breadcrumbs }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f]">
      <div className="ml-2 pt-[1px]">
        <TopNavigationBar />
      </div>

      <div className="flex px-2 sm:px-4">
        <div className="mt-[1px]">
          <LeftNavigationBar />
        </div>

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
