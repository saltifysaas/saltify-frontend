// file: components/navigation/SettingsIcon.tsx
'use client';

import { Settings } from 'lucide-react';

export default function SettingsIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-[#345a4f] transition-colors"
    >
      <Settings className="w-5 h-5 text-[#00332D] dark:text-white" />
    </button>
  );
}
