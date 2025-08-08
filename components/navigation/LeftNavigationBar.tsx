'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ChevronLeft, ChevronRight, SunMoon, Settings } from 'lucide-react';

import type { NavItem } from './nav.types';
import { NAV_ITEMS } from './nav.config';

type Props = {
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
};

export default function LeftNavigationBar({
  collapsed: controlledCollapsed,
  setCollapsed: setControlledCollapsed,
}: Props) {
  // Allow controlled or uncontrolled usage
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(controlledCollapsed ?? false);
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = setControlledCollapsed ?? setInternalCollapsed;

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const isActive = (href?: string) => !!href && (pathname === href || pathname.startsWith(`${href}/`));

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoverMenu(null), 120);
  };

  const toggleMenu = (label: string) => setOpenMenu((prev) => (prev === label ? null : label));

  const onNav = (href?: string) => {
    if (href) router.push(href);
  };

  return (
    <aside
      className={clsx(
        'h-full flex flex-col bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-700 rounded-r-xl',
        'transition-[width] duration-300 ease-in-out',
        collapsed ? 'px-2' : 'px-3'
      )}
    >
      {/* Logo */}
      <div className="pt-3 pb-2">
        <div className={clsx('mb-[2px]', collapsed ? 'w-[75px]' : 'w-[225px]')}>
          <div
            className={clsx(
              'bg-[#00332D] rounded-md flex items-center justify-center text-white',
              'ring-1 ring-gray-200/30 dark:ring-white/10',
              collapsed ? 'w-14 h-14 mx-auto' : 'w-[170px] h-14 mx-auto'
            )}
          >
            <Image
              src={collapsed ? '/logo/saltify-icon-trans/2.svg' : '/logo/logo-white.svg'}
              alt="Saltify Logo"
              width={collapsed ? 32 : 120}
              height={24}
              priority
            />
          </div>
        </div>
      </div>

      {/* Collapse toggle */}
      <div className={clsx('flex items-center justify-end', collapsed ? 'px-0' : 'px-1', 'pb-2')}>
        <button
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setCollapsed(!collapsed)}
          className={clsx(
            'flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700',
            'hover:bg-gray-100 dark:hover:bg-[#1f2937]',
            'h-7 w-7'
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item: NavItem) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;
            const active = isActive(item.href);

            return (
              <li key={item.label} className="group relative" onMouseLeave={handleMouseLeave}>
                <button
                  type="button"
                  onMouseEnter={() => collapsed && handleMouseEnter(item.label)}
                  onClick={() => {
                    if (hasChildren) {
                      if (collapsed) {
                        onNav(item.href);
                      } else {
                        toggleMenu(item.label);
                      }
                    } else {
                      onNav(item.href);
                    }
                  }}
                  className={clsx(
                    'w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm',
                    active
                      ? 'bg-[#00332D]/10 text-[#00332D] dark:text-white dark:bg-[#00332D]/40'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1f2937]'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && hasChildren && (
                    <span className="ml-auto text-xs text-gray-400">{openMenu === item.label ? '▾' : '▸'}</span>
                  )}
                </button>

                {/* Inline submenu (expanded) */}
                {!collapsed && hasChildren && openMenu === item.label && (
                  <ul className="mt-1 ml-8 space-y-1">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = isActive(child.href);
                      return (
                        <li key={child.label}>
                          <button
                            type="button"
                            onClick={() => onNav(child.href)}
                            className={clsx(
                              'w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                              childActive
                                ? 'bg-[#00332D]/10 text-[#00332D] dark:text-white dark:bg-[#00332D]/40'
                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#1f2937]'
                            )}
                          >
                            <ChildIcon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{child.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* Floating submenu (collapsed) */}
                {collapsed && hasChildren && hoverMenu === item.label && (
                  <div
                    className="absolute left-full top-0 ml-2 w-60 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] shadow-lg p-2"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="space-y-1">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = isActive(child.href);
                        return (
                          <li key={child.label}>
                            <button
                              type="button"
                              onClick={() => onNav(child.href)}
                              className={clsx(
                                'w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                                childActive
                                  ? 'bg-[#00332D]/10 text-[#00332D] dark:text-white dark:bg-[#00332D]/40'
                                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1f2937]'
                              )}
                            >
                              <ChildIcon className="h-4 w-4 shrink-0" />
                              <span className="truncate">{child.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer actions (sticky bottom) */}
      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className={clsx('flex items-center', collapsed ? 'justify-center gap-2' : 'justify-between gap-2')}>
          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={clsx(
              'flex items-center gap-2 rounded-md px-2 py-2 text-sm',
              'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1f2937]'
            )}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <SunMoon className="h-5 w-5" />
            {!collapsed && <span>Theme</span>}
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => onNav('/settings')}
            className={clsx(
              'flex items-center gap-2 rounded-md px-2 py-2 text-sm',
              'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#1f2937]'
            )}
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span>Settings</span>}
          </button>
        </div>
        <div className="h-2" />
      </div>
    </aside>
  );
}
