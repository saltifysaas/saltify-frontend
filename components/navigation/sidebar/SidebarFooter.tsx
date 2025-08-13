'use client';

import clsx from 'clsx';
import { SunMoon, Settings as SettingsIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function SidebarFooter({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean | ((c: boolean) => boolean)) => void;
}) {
  const router = useRouter();
  const { setTheme, theme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const current = (resolvedTheme ?? theme) as string | undefined;
    setTheme(current === 'dark' ? 'light' : 'dark');
  };

  const iconBox = (active = false) =>
    clsx(
      'w-11 h-11 rounded-md grid place-items-center transition-all duration-200',
      active
        ? 'bg-[#00332D] text-white'
        : 'bg-white dark:bg-ui-navigationDark text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#242932]'
    );

  return (
    <div className={clsx('p-2 mt-auto flex flex-col gap-2', collapsed && 'items-center')}>
      <div className={clsx('w-full flex items-center', collapsed ? 'gap-1 justify-start' : 'group justify-between')}>
        {collapsed ? (
          <button onClick={toggleTheme} title="Dark Mode" className={clsx('w-11 h-11 grid place-items-center', iconBox(false))}>
            <SunMoon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#1b1f25] text-[#00332D] dark:text-gray-200"
          >
            <SunMoon className="w-5 h-5" />
            <span>Dark Mode</span>
          </button>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={clsx(
            'rounded-md transition focus:outline-none',
            collapsed ? iconBox(false) : 'p-2 ml-2 hover:bg-gray-50 dark:hover:bg-[#1b1f25]'
          )}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {/* ✅ fixed stray bracket typos */}
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <div className={clsx('w-full flex items-center', collapsed ? 'gap-1 justify-start' : 'group justify-between')}>
        {collapsed ? (
          <button onClick={() => router.push('/settings')} title="Settings" className={clsx('w-11 h-11 grid place-items-center', iconBox(false))}>
            <SettingsIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => router.push('/settings')}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#1b1f25] text-[#00332D] dark:text-gray-200"
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={clsx(
            'rounded-md transition focus:outline-none focus:ring-2 focus:ring-[#00332D]/30',
            collapsed ? iconBox(false) : 'p-2 ml-2 hover:bg-gray-50 dark:hover:bg-[#1b1f25]'
          )}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
