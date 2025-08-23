'use client';

import { Bell, User } from 'lucide-react';
import SearchBox from '@/components/navigation/SearchBox';
import GlobalCreateButton from '@/components/navigation/GlobalCreateButton';

export default function TopNavigationBar() {
  return (
<header className="relative z-50 h-[65px] flex items-center rounded-md mt-[1px] justify-between px-8 bg-white dark:bg-ui-navigationDark border-r border-gray-200 dark:border-gray-700">
      {/* 🔍 Centered Search Box */}
      <div className="flex-1 flex justify-center">
        <SearchBox className="w-full max-w-[700px]" />
      </div>

      {/* Global Create + Help + Notifications + User */}
      <div className="flex items-center gap-5 pl-2">
        {/* ➕ Global Create */}
        <GlobalCreateButton />

        {/* ? Help Icon */}
        <span
          title="Help"
          className="w-15 h-15 flex items-center justify-center text-lg font-bold text-[#00332D] dark:text-white cursor-pointer hover:opacity-80"
        >
          ?
        </span>

        <Bell className="w-5 h-5 text-[#00332D] dark:text-white cursor-pointer" />
        <User className="w-5 h-5 text-[#00332D] dark:text-white cursor-pointer" />
      </div>
    </header>
  );
}
