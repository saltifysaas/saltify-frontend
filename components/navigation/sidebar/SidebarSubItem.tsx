'use client';

import Link from 'next/link';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

/** A single clickable leaf under a sidebar group */
export type NavLeaf = { label: string; href: string; icon?: LucideIcon };

export interface SidebarSubItemProps extends NavLeaf {
  collapsed: boolean;
  className?: string;
}

/** Leaf impl; exported as default so existing imports keep working */
function SidebarLeafImpl({
  label,
  href,
  icon: Icon,
  collapsed,
  className,
}: SidebarSubItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-2 rounded-md border px-2 py-2 text-sm',
        'bg-white hover:bg-gray-50 dark:bg-[#1f1f1f] dark:hover:bg-[#2a2a2a] border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export default SidebarLeafImpl;

/** A small submenu that renders multiple leaf items */
export interface SidebarSubMenuProps {
  label: string;
  collapsed: boolean;
  items: NavLeaf[];
  className?: string;
}

export function SidebarSubMenu({ label, collapsed, items, className }: SidebarSubMenuProps) {
  return (
    <div className={clsx('space-y-1 pl-4 mt-1', className)}>
      {!collapsed && <div className="text-xs text-gray-500 mb-1">{label}</div>}
      {items.map((item) => (
        <SidebarLeafImpl key={item.href} {...item} collapsed={collapsed} />
      ))}
    </div>
  );
}
