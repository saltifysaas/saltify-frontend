'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useState } from 'react';

import LeftNavigationBar from '@/components/navigation/sidebar/LeftNavigationBar';
import TopNavigationBar from '@/components/navigation/topnavigation/TopNavigationBar';
import {
  SIDEBAR_EXPANDED,
  SIDEBAR_COLLAPSED,
  HEADER_HEIGHT,
  GRID_GAP,
} from '@/lib/ui/constants';
// import useCollapsed from '@/components/hooks/useCollapsed'; // ⛔️ remove the hook to avoid hidden auto-expands

type Crumb = { label: string; href: string };

const PERSIST_KEY = 'saltify-stick-collapsed';

export default function AppShell({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  /** Optional page-provided breadcrumbs */
  breadcrumbs?: Crumb[];
}) {
  // ✅ Authoritative, persistent state (no hidden effects)
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(PERSIST_KEY) === '1';
    } catch {
      return false;
    }
  });

  const pathname = usePathname();

  // Keep localStorage in sync with the user's explicit choice (hamburger)
  useEffect(() => {
    try {
      if (collapsed) localStorage.setItem(PERSIST_KEY, '1');
      else localStorage.removeItem(PERSIST_KEY);
    } catch {}
  }, [collapsed]);

  // Enforce the persisted preference BEFORE paint on mount (prevents any flicker)
  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(PERSIST_KEY) === '1') {
        setCollapsed(true);
      }
    } catch {}
  }, []);

  // Also re-enforce on every route change (in case anything tries to flip it)
  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(PERSIST_KEY) === '1') {
        setCollapsed(true);
      }
    } catch {}
  }, [pathname]);

  // ✅ safe constants (avoid NaN)
  const safeHeader =
    typeof HEADER_HEIGHT === 'number' ? `${HEADER_HEIGHT}px` : HEADER_HEIGHT || '64px';

  const safeGap = typeof GRID_GAP === 'number' ? `${GRID_GAP}px` : GRID_GAP || '8px';

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;
  const safeSidebar =
    typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth || '220px';

  // 🔗 Breadcrumbs (use prop if provided, else derive from pathname)
  const derivedBreadcrumbs: Crumb[] = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + arr.slice(0, index + 1).join('/'),
    }));

  const crumbs = breadcrumbs ?? derivedBreadcrumbs;

  return (
    <div className="h-screen bg-gray-200 dark:bg-ui-appBgDark p-2">
      <div
        className="grid h-full"
        style={{
          gridTemplateColumns: `${safeSidebar} 1fr`,
          gridTemplateRows: `${safeHeader} minmax(0, 1fr)`,
          gap: safeGap,
          transition: 'grid-template-columns .2s ease',
        }}
      >
        {/* Logo (row 1, col 1) */}
        <div
          className={clsx(
            'rounded-md bg-[#00332D] flex items-center justify-center]',
            'overflow-hidden transition-[height] duration-200',
            'grid place-items-center'
          )}
          style={{ height: safeHeader, willChange: 'height' }}
          aria-label="Brand"
          title={collapsed ? 'Saltify (collapsed)' : 'Saltify'}
        >
          <Image
            src={collapsed ? '/logo/saltify-icon-trans/2.svg' : '/logo/logo-white.svg'}
            alt="Saltify"
            width={collapsed ? 28 : 120}
            height={28}
            className="object-contain"
            priority
          />
        </div>

        {/* Top nav (row 1, col 2) */}
        <div className="rounded-md mt-[1.5px] ml-[1.5px] overflow-hidden">
          <TopNavigationBar />
        </div>

        {/* Sidebar (row 2, col 1) */}
        <div className="rounded-md mt-[1px] overflow-hidden h-full">
          <LeftNavigationBar
            collapsed={collapsed}
            setCollapsed={setCollapsed} // ✅ hamburger is the ONLY way to toggle this
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Content (row 2, col 2) */}
        <main
          className={clsx(
            'bg-white dark:bg-ui-pageDark rounded-md mt-[1.5px] ml-[1.5px] p-4 h-full min-h-0',
            'shadow-sm overflow-auto'
          )}
        >
          <div className="mb-4">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="list-none p-0 m-0 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
                    Home
                  </Link>
                </li>
                {crumbs.map((item, idx) => {
                  const last = idx === crumbs.length - 1;
                  return (
                    <li key={item.href} className="flex items-center gap-2">
                      <span className="opacity-50">/</span>
                      {last ? (
                        <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
                      ) : (
                        <Link
                          href={item.href}
                          className="hover:text-gray-900 dark:hover:text-white"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
