'use client';

import { useTheme } from 'next-themes';
import { ChevronLeft, ChevronRight, Settings, SunMoon } from 'lucide-react';

interface SidebarFooterProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function SidebarFooter({ collapsed, setCollapsed }: SidebarFooterProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="sticky bottom-0 bg-white dark:bg-[#1f1f1f] border-t border-gray-200 dark:border-gray-700 p-2">
      <div className="flex flex-col gap-2 items-start">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-[#00332D] dark:text-white"
          >
            <SunMoon className="w-5 h-5" />
            {!collapsed && <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#333] transition"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Settings Button */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
          <button className="flex items-center gap-2 text-[#00332D] dark:text-white">
            <Settings className="w-5 h-5" />
            {!collapsed && <span className="font-medium">Settings</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#333] transition"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
