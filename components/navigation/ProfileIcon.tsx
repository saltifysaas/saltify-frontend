'use client';

import { useState } from 'react';
import { User } from 'lucide-react';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 grid place-items-center rounded-md border border-[#00332d] dark:border-white hover:bg-gray-100 dark:hover:bg-[#ffffff22]"
      >
        <User size={18} className="text-[#00332D] dark:text-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-white-700 rounded-md shadow-lg z-50">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Profile
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Settings
          </div>
          <div className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
