'use client';

import { useState, useRef } from 'react';
import {
  LayoutTemplate,
  FileText,
  Bot,
  Database,
  Users,
  BarChart2,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  PlusSquare,
  FolderClosed,
  Layers2,
  BarChart,
  UsersRound
} from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  children?: NavItem[];
}

interface LeftNavigationBarProps {
  onCreateData?: () => void;
}

const navItems: NavItem[] = [
  { label: 'Landing Pages', icon: LayoutTemplate, href: '/landing-pages' },
  { label: 'Forms', icon: FileText, href: '/forms' },
  { label: 'AI Agents', icon: Bot, href: '/ai-agents' },
  {
    label: 'Data Extensions',
    icon: Database,
    href: '/data-extensions',
    children: [
      { label: 'Create Data', icon: PlusSquare, href: '/data-extensions/create' },
      { label: 'My Data Extensions', icon: FolderClosed, href: '/data-extensions/mine' },
      { label: 'All Data Extensions', icon: Layers2, href: '/data-extensions/all' },
      { label: 'Analyze Data', icon: BarChart, href: '/data-extensions/analyze' },
      { label: 'All Contacts', icon: UsersRound, href: '/contacts' }
    ]
  },
  { label: 'Contacts', icon: Users, href: '/contacts' },
  { label: 'Reports', icon: BarChart2, href: '/reports' },
  { label: 'Dashboards', icon: LayoutDashboard, href: '/dashboards' }
];

export default function LeftNavigationBar({ onCreateData }: LeftNavigationBarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoverMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoverMenu(null);
    }, 200);
  };

  const handleChildClick = (childLabel: string) => {
    if (childLabel === 'Create Data' && onCreateData) {
      onCreateData();
    }
  };

  return (
    <div
      className={clsx(
        'h-screen flex flex-col shadow-sm transition-all duration-300 rounded-md border z-50 relative',
        collapsed ? 'w-[60px]' : 'w-[220px]',
        'bg-white dark:bg-[#1f1f1f] border-gray-200 dark:border-gray-700'
      )}
    >
      {/* Top Section: Nav Items */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-3 pl-2">
        {navItems.map(({ label, icon: Icon, href, children }) => {
          const isActive = pathname === href || (children && children.some(child => pathname.startsWith(child.href)));
          const isOpen = openMenu === label;
          const isHovering = hoverMenu === label;

          return (
            <div key={label} className="group relative" onMouseLeave={handleMouseLeave}>
              <button
                onClick={() => setOpenMenu(prev => (prev === label ? null : label))}
                onMouseEnter={() => handleMouseEnter(label)}
                className={clsx(
                  'flex items-center gap-3 text-sm w-full p-2 rounded-md transition-colors',
                  isActive
                    ? 'bg-[#E6F4F1] text-[#00332D] dark:bg-[#00332D] dark:text-white font-semibold'
                    : 'text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                )}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{label}</span>}
              </button>

              {/* Expanded Submenu (Indented) */}
              {children && !collapsed && isOpen && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  {children.map(({ label: childLabel, icon: ChildIcon, href: childHref }) => (
                    <a
                      key={childLabel}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChildClick(childLabel);
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

              {/* Collapsed Submenu (Flyout) */}
              {children && collapsed && isHovering && (
                <div
                  onMouseEnter={() => handleMouseEnter(label)}
                  onMouseLeave={handleMouseLeave}
                  className="fixed left-[60px] top-auto mt-[-40px] bg-white dark:bg-[#111827] border rounded shadow-lg z-[999] w-56"
                >
                  {children.map(({ label: childLabel, icon: ChildIcon, href: childHref }) => (
                    <a
                      key={childLabel}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChildClick(childLabel);
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

      {/* Bottom controls (Sticky with no shrink) */}
      <div className="sticky bottom-0 bg-white dark:bg-[#1f1f1f] border-t border-gray-200 dark:border-gray-700 z-10">
        <div
          className={clsx(
            'flex items-center justify-between',
            collapsed ? 'p-3 justify-center' : 'px-4 py-3'
          )}
        >
          <button className="flex items-center gap-2 text-sm text-[#00332D] dark:text-white hover:scale-105 transition-transform">
            <Settings className="w-5 h-5" />
            {!collapsed && <span>Settings</span>}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:scale-110 transition-transform"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-300" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
