'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={clsx(
        'h-screen flex flex-col transition-all duration-300 border-r shadow-sm',
        collapsed ? 'w-[60px]' : 'w-[220px]',
        'bg-white dark:bg-[#1f1f1f] border-gray-200 dark:border-gray-700'
      )}
    >
      <div className="flex-1 overflow-y-auto">{children}</div>

      <div className="shrink-0 flex items-center justify-end p-3 border-t border-gray-200 dark:border-gray-700">
        <button onClick={() => setCollapsed(!collapsed)} className="hover:scale-110 transition-transform">
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}
