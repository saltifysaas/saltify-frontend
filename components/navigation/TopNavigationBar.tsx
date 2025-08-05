'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import ProfileIcon from './ProfileIcon';
import SearchBox from './SearchBox';

export default function TopNavigationBar() {
  return (
    <header className="w-full border-b bg-white dark:bg-[#111827] shadow-sm">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 py-4">
        
        {/* Left: Logo + Divider */}
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo-green.svg"
              alt="SALTify Logo"
              width={120}
              height={30}
              className="block dark:hidden"
            />
            <Image
              src="/logo/logo-white.svg"
              alt="SALTify Logo"
              width={120}
              height={30}
              className="hidden dark:block"
            />
          </Link>

          {/* Thicker, taller divider */}
          <div className="h-8 w-[2px] bg-gray-400 dark:bg-gray-600 rounded-sm" />
        </div>

        {/* Center: Search Box */}
        <div className="flex-1 flex justify-center">
          <SearchBox />
        </div>

        {/* Right: Divider + Icons */}
        <div className="flex items-center gap-5">
          {/* Divider on right side */}
          <div className="h-8 w-[2px] bg-gray-400 dark:bg-gray-600 rounded-sm" />

          <button
            type="button"
            className="hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-md"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200 stroke-[2.4]" />
          </button>
          <ProfileIcon className="w-8 h-8 text-gray-700 dark:text-gray-200 stroke-[2.4]" />
        </div>
      </div>
    </header>
  );
}
