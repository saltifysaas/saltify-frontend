// components/navigation/sidebar/SidebarWrapper.tsx
'use client';

import { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import SidebarFooter from './SidebarFooter';

interface SidebarWrapperProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  children: ReactNode;
  style?: CSSProperties; // ✅ allow inline style
}

export default function SidebarWrapper({ collapsed, setCollapsed, children, style }: SidebarWrapperProps) {
  return (
    <div
      style={style} // ✅ apply it
      className={clsx(
        'h-screen flex flex-col mt-0 transition-[width] duration-300 ease-in-out border z-50 relative',
        collapsed ? 'w-[72px]' : 'w-[250px]',
        'bg-white dark:bg-[#1f1f1f] border-gray-200 dark:border-gray-700',
        'rounded-md m-[2px] overflow-hidden'
      )}
    >
      {/* 🔰 Logo */}
      <div className="flex items-center justify-center p-1">
        <div className="bg-[#00000000] border-2 border-gray-200 rounded-md flex items-center justify-center w-full h-[63px] mt-0">
          {collapsed ? (
            <img src="/logo/saltify-icon-trans/1.svg" alt="Saltify Icon" className="w-8 h-8" />
          ) : (
            <img src="/logo/logo-green.svg" alt="Saltify Logo" className="w-[140px] h-auto" />
          )}
        </div>
      </div>

      {/* Top Header + Nav */}
      <div className="flex-1 flex flex-col justify-between">
        <div className={clsx('flex-1 overflow-y-auto flex flex-col gap-2', collapsed ? 'items-center p-3' : 'p-3 pl-2')}>
          {/* Menu Header + Collapse Toggle */}
          <div className="flex items-center justify-between px-1 pt-1 pb-1">
            {!collapsed ? (
              <div className="text-lg font-solway font-normal text-gray-500 dark:text-gray-400 tracking-normal pl-4">Menu</div>
            ) : (
              <div className="h-8" />
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={clsx(
                'w-[40px] h-[40px] flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors',
                collapsed && 'mx-auto mt-[6px]'
              )}
              aria-label="Toggle Sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* 🧩 All Children */}
          {children}
        </div>

        {/* 🧿 Sticky Bottom */}
        <SidebarFooter collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </div>
  );
}
