'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      className={clsx(
        'fixed bottom-4 right-4 z-50 px-4 py-2 flex items-center gap-2 rounded-full text-sm font-semibold shadow-lg transition-all',
        theme === 'dark'
          ? 'bg-[#00332D] text-white'
          : 'bg-white text-[#00332D]'
      )}
    >
      {theme === 'dark' ? (
        <>
          <Moon className="w-4 h-4 text-yellow-400" />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-yellow-500" />
          Light Mode
        </>
      )}
    </button>
  );
}
