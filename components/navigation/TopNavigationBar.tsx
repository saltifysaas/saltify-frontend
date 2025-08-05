'use client';

import AppLauncher from './AppLauncher';
import CreateButton from './CreateButton';
import SearchBox from './SearchBox';
import ProfileIcon from './ProfileIcon';
import Image from 'next/image';

export default function TopNavigationBar() {
  return (
    <div
      className="mt-[2px] mb-[2px] mx-[8px] rounded-md border 
      bg-white dark:bg-[#1F1F1F] 
      text-[#00332D] dark:text-white 
      border-gray-200 dark:border-[#2B2B2B] 
      shadow-[0_2px_6px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_6px_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-center px-6 py-5 h-[72px]">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-4 flex-[1]">
          {/* Light Mode Logo */}
          <Image
            src="/logo/logo-green.svg"
            alt="Saltify Logo"
            width={150}
            height={35}
            className="block dark:hidden"
          />

          {/* Dark Mode Logo */}
          <Image
            src="/logo/logo-white.svg"
            alt="Saltify Logo"
            width={150}
            height={28}
            className="hidden dark:block"
          />
        </div>

        {/* Center: Search Box */}
        <div className="flex justify-center">
          <div className="w-full max-w-screen-xl">
            <SearchBox />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex justify-end items-center gap-4 flex-[1]">
          <CreateButton />
          <AppLauncher />
          <ProfileIcon />
        </div>
      </div>
    </div>
  );
}
