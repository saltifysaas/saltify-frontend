'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import LeftNavigationBar from '@/components/navigation/LeftNavigationBar';
import TopNavigationBar from '@/components/navigation/TopNavigationBar';
import Breadcrumbs from '@/components/navigation/Breadcrumb';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // 🍞 Auto-generate breadcrumb from URL
  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + arr.slice(0, index + 1).join('/'),
    }));

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-[#0f0f0f] p-2">
      <div className="flex gap-1">
        <LeftNavigationBar collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-col w-full gap-x-1 gap-y-1">
          <TopNavigationBar />

          {/* 🧱 Main Content Area with breadcrumb inside */}
          <main
            className={clsx(
              'flex-1 bg-white dark:bg-[#1a1a1a] rounded-md p-4 border border-gray-200 dark:border-gray-700 shadow-sm'
            )}
          >
            {/* 🔗 Breadcrumb inside content box */}
            <div className="mb-4">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
