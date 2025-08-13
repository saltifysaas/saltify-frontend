'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo } from 'react';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';

type Child = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

export default function SidebarGroup({
  label,
  icon,
  href,
  childrenItems,
  collapsed,
  pathname,
  isOpen,
  setOpen,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  childrenItems?: Child[];
  collapsed: boolean;
  pathname: string;
  isOpen: boolean;
  setOpen: (label: string | null) => void;
}) {
  const hasChildren = !!childrenItems?.length;

  const activeParent = !!href && (pathname === href || pathname.startsWith(href + '/'));
  const someChildActive = useMemo(() => {
    if (!childrenItems?.length) return false;
    return childrenItems.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + '/')
    );
  }, [childrenItems, pathname]);

  const active = activeParent || someChildActive;

  return (
    <div>
      <div className="flex items-center">
        <SidebarItem
          label={label}
          icon={icon}
          href={href}
          active={active}
          collapsed={collapsed}
          onClick={
            !href && hasChildren
              ? () => setOpen(isOpen ? null : label)
              : undefined
          }
        />
        {!collapsed && hasChildren && (
          <button
            onClick={() => setOpen(isOpen ? null : label)}
            className="ml-auto mr-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {!collapsed && isOpen && hasChildren && (
        <div className="ml-8 mt-1 flex flex-col gap-1">
          {childrenItems!.map((child) => {
            const childActive =
              pathname === child.href || pathname.startsWith(child.href + '/');
            return (
              <SidebarSubItem
                key={child.label}
                label={child.label}
                icon={child.icon}
                href={child.href}
                active={childActive}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
