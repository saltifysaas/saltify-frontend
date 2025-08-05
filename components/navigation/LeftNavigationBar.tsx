'use client';

import { useState, useRef, useEffect } from 'react';
import {
  LayoutTemplate,
  FileText,
  Bot,
  Database,
  Users,
  BarChart2,
  LayoutDashboard,
  FolderClosed,
  Layers2,
  BarChart,
  PlusSquare,
  Settings,
  SunMoon,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  children?: NavItem[];
}

export default function LeftNavigationBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems: NavItem[] = [
    { label: 'Landing Pages', icon: LayoutTemplate, href: '/landing-pages' },
    { label: 'Forms', icon: FileText, href: '/forms' },
    { label: 'AI Agents', icon: Bot, href: '/ai-agents' },
    {
      label: 'Data Extensions',
      icon: Database,
      href: '/dataextension',
      children: [
        { label: 'All Data Extensions', icon: Layers2, href: '/dataextension' },
        { label: 'My Data Extensions', icon: FolderClosed, href: '/data-extensions/mine' },
        { label: 'Analyze Data', icon: BarChart, href: '/data-extensions/analyze' }
      ]
    },
    {
      label: 'Contacts',
      icon: Users,
      href: '/contacts',
      children: [
        { label: 'Create Contact', icon: PlusSquare, href: '/contact/create' }
      ]
    },
    { label: 'Reports', icon: BarChart2, href: '/reports' },
    { label: 'Dashboards', icon: LayoutDashboard, href: '/dashboards' }
  ];

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoverMenu(null), 200);
  };

  const handleChildClick = (childHref: string) => {
    router.push(childHref);
  };

  return (
    <div
      className={clsx(
        'h-screen flex flex-col shadow-sm transition-[width] duration-300 ease-in-out border z-50 relative',
        collapsed ? 'w-[64pt]' : 'w-[220px]',
        'bg-white dark:bg-[#1f1f1f] border-gray-200 dark:border-gray-700'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-1 pt-1 pb-1">
        {!collapsed ? (
          <div className="text-lg font-solway font-normal text-gray-500 dark:text-gray-400 tracking-normal pl-4">
            Menu
          </div>
        ) : (
          <div className="h-6" />
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

      {/* Nav Items */}
      <div className={clsx(
        "flex-1 overflow-y-auto flex flex-col gap-2 pt-0",
        collapsed ? "items-center p-3" : "p-3 pl-2"
      )}>
        {navItems.map(({ label, icon: Icon, href, children }) => {
          const isActive = pathname === href || (children && children.some(child => pathname.startsWith(child.href)));
          const isOpen = openMenu === label;
          const isHovering = hoverMenu === label;

          return (
            <div key={label} className="group relative" onMouseLeave={handleMouseLeave}>
              <button
                onClick={() => {
                  if (!children) router.push(href);
                  else setOpenMenu(prev => (prev === label ? null : label));
                }}
                onMouseEnter={() => handleMouseEnter(label)}
                className={clsx(
                  'flex w-full gap-3 p-2 rounded-md transition-colors',
                  collapsed ? 'justify-center' : 'items-center',
                  isActive
                    ? 'bg-[#E6F4F1] text-[#00332D] dark:bg-[#00332D] dark:text-white font-semibold'
                    : 'text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                )}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{label}</span>}
              </button>

              {/* Expanded Submenu */}
              {children && !collapsed && isOpen && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  {children.map(({ label: childLabel, icon: ChildIcon, href: childHref }) => (
                    <a
                      key={childLabel}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChildClick(childHref);
                      }}
                      className={clsx(
                        'flex items-center gap-2 text-sm p-2 rounded-md transition-colors',
                        pathname === childHref
                          ? 'bg-[#D1FADF] text-[#00332D] dark:bg-[#005f4b] dark:text-white'
                          : 'text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                      )}
                    >
                      <ChildIcon className="w-4 h-4" />
                      <span>{childLabel}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Flyout for Collapsed */}
              {children && collapsed && isHovering && (
                <div
                  onMouseEnter={() => handleMouseEnter(label)}
                  onMouseLeave={handleMouseLeave}
                  className="fixed left-[75px] top-auto mt-[-40px] bg-white dark:bg-[#111827] border rounded shadow-lg z-[999] w-56"
                >
                  {children.map(({ label: childLabel, icon: ChildIcon, href: childHref }) => (
                    <a
                      key={childLabel}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChildClick(childHref);
                      }}
                      className={clsx(
                        'flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2a2a2a]',
                        pathname === childHref
                          ? 'font-semibold text-[#00332D] dark:text-white'
                          : 'text-gray-700 dark:text-white'
                      )}
                    >
                      <ChildIcon className="w-4 h-4" /> {childLabel}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Compact Items */}
<div className="sticky bottom-0 bg-white dark:bg-[#1f1f1f] border-t border-gray-200 dark:border-gray-700 p-2">
  <div className="flex flex-col gap-2 items-start">

    {/* Theme Toggle Row */}
    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 text-[#00332D] dark:text-white"
      >
        <SunMoon className="w-5 h-5" />
        {!collapsed && <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
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

    {/* Settings Row */}
    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
      <button
        className="flex items-center gap-2 text-[#00332D] dark:text-white"
      >
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
    </div>
  );
}