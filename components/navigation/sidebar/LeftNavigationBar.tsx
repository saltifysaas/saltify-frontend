'use client';

import {
  LayoutDashboard,
  FileText,
  Bot,
  Database,
  Users,
  BarChart,
  LayoutTemplate,
  Settings as SettingsIcon, // kept to match your existing import list
  SunMoon,                 // kept to match your existing import list
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
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import Tooltip from '../../ui/Tooltip';
import { SidebarWrapper, SidebarGroup, SidebarItem, SidebarFooter } from './index';

type ChildItem = { label: string; icon: LucideIcon; href: string };
type NavItem = { label: string; icon: LucideIcon; href?: string; children?: ChildItem[] };

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Landing Pages', icon: LayoutTemplate, href: '/landingpages' },
  { label: 'Forms', icon: FileText, href: '/forms' },
  { label: 'AI Agents', icon: Bot, href: '/ai-agents' },
  {
    label: 'Contacts',
    icon: Users,
    children: [
      // ✅ route wired to your list page
      { label: 'All Contacts', icon: List, href: '/contact/home' },
      { label: 'Segmentation', icon: Filter, href: '/contacts/segmentation' },
      { label: 'Profiles', icon: UserIcon, href: '/contacts/profiles' },
    ],
  },
  {
    label: 'Data Extensions',
    icon: Database,
    children: [
      // ✅ align with your app’s routes (switch to /data-extensions if that’s what you actually use)
      { label: 'All Data Extensions', icon: List, href: '/dataextension' },
      { label: 'Data Tables', icon: Table, href: '/dataextension/tables' },
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

  // Auto-open the group that matches current route
  const activeParentLabel = useMemo(() => {
    for (const item of NAV_ITEMS) {
      if (!item.children) continue;
      if (item.children.some(ch => pathname === ch.href || pathname.startsWith(ch.href + '/'))) {
        return item.label;
      }
    }
    return null;
  }, [pathname]);

  const [openMenu, setOpenMenu] = useState<string | null>(activeParentLabel);
  useEffect(() => setOpenMenu(activeParentLabel), [activeParentLabel]);

  return (
    <SidebarWrapper style={style}>
      {/* 🍔 Collapse / Expand header */}
      <div className={clsx('mt-4', collapsed ? 'px-0' : 'px-3')}>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={clsx(
            'group w-full flex items-center rounded-md transition',
            collapsed ? 'justify-center' : 'justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
          )}
        >
          {!collapsed && <span className="text-lg text-gray-700 dark:text-gray-400 ">Menu</span>}
          {collapsed ? (
            <span
              className={clsx(
                'w-11 h-11 rounded-md grid place-items-center transition-all duration-200',
                'bg-white dark:bg-ui-navigationDark text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#242932]'
              )}
            >
              <Menu className="w-5 h-5" />
            </span>
          ) : (
            <Menu className="w-5 h-5 text-[#00332D] dark:text-gray-200 " />
          )}
        </button>
      </div>

      {/* 🧭 Nav list */}
      <div className={clsx('flex-1 flex flex-col gap-1 py-2', collapsed ? 'items-center px-0' : 'items-stretch px-2')}>
        {NAV_ITEMS.map(({ label, icon, href, children }) => {
          const active = !!href && (pathname === href || pathname.startsWith(href + '/'));
          const isOpen = openMenu === label;

          // Collapsed: icon with tooltip
          if (collapsed) {
            return (
              <Tooltip key={label} label={label}>
                <div className="w-full flex justify-center">
                  <SidebarItem
                    label={label}
                    icon={icon}
                    href={href}
                    active={active}
                    collapsed
                    onClick={
                      !href && children?.length
                        ? () => setOpenMenu(isOpen ? null : label)
                        : undefined
                    }
                  />
                </div>
              </Tooltip>
            );
          }

          // Expanded: group or single item
          if (children?.length) {
            return (
              <SidebarGroup
                key={label}
                label={label}
                icon={icon}
                href={href}
                childrenItems={children}
                collapsed={false}
                pathname={pathname}
                isOpen={isOpen}
                setOpen={setOpenMenu}
              />
            );
          }

          return (
            <SidebarItem
              key={label}
              label={label}
              icon={icon}
              href={href}
              active={active}
              collapsed={false}
            />
          );
        })}
      </div>

      {/* ⚙️ Footer actions (theme + settings + collapse) */}
      {/* The footer internally ensures no “active” highlight circle on click */}
      <SidebarFooter collapsed={collapsed} setCollapsed={setCollapsed} />
    </SidebarWrapper>
  );
}
