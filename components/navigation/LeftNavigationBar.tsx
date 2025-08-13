'use client';

import {
  LayoutDashboard,
  FileText,
  Bot,
  Database,
  Users,
  BarChart,
  LayoutTemplate,
  Settings as SettingsIcon,
  SunMoon,
  ChevronLeft,
  ChevronRight,
  Menu,
  ChevronDown,
  ChevronUp,
  List,
  Table,
  User as UserIcon,
  Filter,
  type LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';
import { useState, type CSSProperties } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Tooltip from '../ui/Tooltip';

type ChildItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

type NavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: ChildItem[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Landing Pages', icon: LayoutTemplate, href: '/landingpages' },
  { label: 'Forms', icon: FileText, href: '/forms' },
  { label: 'AI Agents', icon: Bot, href: '/ai-agents' },
  {
    label: 'Contacts',
    icon: Users,
    children: [
      { label: 'All Contacts', icon: List, href: '/contacts' },
      { label: 'Segmentation', icon: Filter, href: '/contacts/segmentation' },
      { label: 'Profiles', icon: UserIcon, href: '/contacts/profiles' },
    ],
  },
  {
    label: 'Data Extensions',
    icon: Database,
    children: [
      { label: 'All Data Extensions', icon: List, href: '/data-extensions' },
      { label: 'Data Tables', icon: Table, href: '/data-extensions/tables' },
    ],
  },
  { label: 'Reports', icon: BarChart, href: '/reports' },
];

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean | ((c: boolean) => boolean)) => void;
  style?: CSSProperties;
};

export default function LeftNavigationBar({ collapsed, setCollapsed, style }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Proper typing from next-themes (no `any`)
  const { setTheme, theme, resolvedTheme } = useTheme();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

  function InlineCollapseBtn({ forceVisible = false }: { forceVisible?: boolean }) {
    return (
      <button
        onClick={() => setCollapsed((c) => !c)}
        className={clsx(
          'rounded-md transition focus:outline-none focus:ring-2 focus:ring-[#00332D]/30',
          collapsed
            ? iconBox(false)
            : clsx('p-2 ml-2 hover:bg-gray-50 dark:hover:bg-[#1b1f25]', forceVisible ? '' : 'opacity-0 group-hover:opacity-100')
        )}
        title={collapsed ? 'Expand' : 'Collapse'}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-5 h-5 ]" /> : <ChevronLeft className="w-5 h-5]" />}
      </button>
    );
  }

  const handleParentClick = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <aside
      style={style}
      className={clsx(
        'flex flex-col justify-between border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-ui-navigationDark transition-all duration-300 rounded-md mt-[2px]',
        'h-full'
      )}
    >
      {/* 🍔 Collapse / Expand header */}
      <div className={clsx('mt-4', collapsed ? 'px-0' : 'px-3')}>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={clsx('group w-full flex items-center rounded-md transition', collapsed ? 'justify-center' : 'justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]')}
        >
          {!collapsed && <span className="text-lg text-gray-700 dark:text-gray-400 ">Menu</span>}
          {collapsed ? (
            <span className={iconBox(false)}>
              <Menu className="w-5 h-5" />
            </span>
          ) : (
            <Menu className="w-5 h-5 text-[#00332D] dark:text-gray-200 " />
          )}
        </button>
      </div>

      {/* 🧭 Nav list */}
      <div className={clsx('flex-1 flex flex-col gap-1 py-2', collapsed ? 'items-center px-0' : 'items-stretch px-2')}>
        {NAV_ITEMS.map(({ label, icon: Icon, href, children }) => {
          const isActive = !!href && pathname === href;
          const isOpen = openMenu === label;

          if (collapsed) {
            return (
              <Tooltip key={label} label={label}>
                <button
                  onClick={() => (children ? handleParentClick(label) : href ? router.push(href) : undefined)}
                  className="group justify-center w-full flex"
                >
                  <span className={iconBox(isActive)}>
                    <Icon className="w-5 h-5" />
                  </span>
                </button>
              </Tooltip>
            );
          }

          return (
            <div key={label}>
              <button
                onClick={() => (children ? handleParentClick(label) : href ? router.push(href) : undefined)}
                className={clsx(
                  'relative w-full rounded-md transition-colors flex items-center gap-3 px-3 py-2',
                  isActive ? 'bg-[#eaf0ff]' : 'hover:bg-gray-50 dark:hover:bg-[#1b1f25]'
                )}
              >
                {isActive && <span className="absolute left-0 top-0 h-full w-[2px] bg-[#00332D] rounded-l-md" />}
                <Icon className={clsx('w-5 h-5', isActive ? 'text-[#00332D]' : 'text-[#00332D] dark:text-gray-200')} />
                <span className={clsx('text-sm', isActive ? 'text-[#00332D] dark:text-white font-semibold' : 'text-[#00332D] dark:text-gray-200')}>
                  {label}
                </span>
                {children && (isOpen ? <ChevronUp className="ml-auto shrink-0 w-4 h-4" /> : <ChevronDown className="ml-auto shrink-0 w-4 h-4" />)}
              </button>

              {isOpen && children && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  {children.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = pathname === child.href;
                    return (
                      <button
                        key={child.label}
                        onClick={() => router.push(child.href)}
                        className={clsx(
                          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-[#1b1f25]',
                          childActive ? 'bg-[#eaf0ff] text-[#00332D]' : 'text-[#00332D] dark:text-gray-200'
                        )}
                      >
                        <ChildIcon className="w-4 h-4" />
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ⚙️ Footer actions */}
      <div className={clsx('p-2 mt-auto flex flex-col gap-2', collapsed && 'items-center')}>
        <div className={clsx('w-full flex items-center', collapsed ? 'gap-1 justify-start' : 'group justify-between')}>
          {collapsed ? (
            <Tooltip label="Dark Mode">
              <button onClick={toggleTheme} className={clsx('w-11 h-11 grid place-items-center', iconBox(false))}>
                <SunMoon className="w-5 h-5" />
              </button>
            </Tooltip>
          ) : (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#1b1f25] text-[#00332D] dark:text-gray-200"
            >
              <SunMoon className="w-5 h-5" />
              <span>Dark Mode</span>
            </button>
          )}
          <InlineCollapseBtn forceVisible />
        </div>

        <div className={clsx('w-full flex items-center', collapsed ? 'gap-1 justify-start' : 'group justify-between')}>
          {collapsed ? (
            <Tooltip label="Settings">
              <button onClick={() => router.push('/settings')} className={clsx('w-11 h-11 grid place-items-center', iconBox(false))}>
                <SettingsIcon className="w-5 h-5" />
              </button>
            </Tooltip>
          ) : (
            <button
              onClick={() => router.push('/settings')}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#1b1f25] text-[#00332D] dark:text-gray-200"
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </button>
          )}
          <InlineCollapseBtn forceVisible />
        </div>
      </div>
    </aside>
  );
}
