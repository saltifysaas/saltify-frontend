// components/navigation/sidebar/SidebarGroup.tsx
'use client';

import { type ReactNode } from 'react';
import clsx from 'clsx';
import { type LucideIcon } from 'lucide-react';

export interface SidebarGroupProps {
  label: string;
  collapsed: boolean;
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
  onToggle?: () => void; // ✅ make toggle optional
}

export default function SidebarGroup({
  label,
  collapsed,
  icon: Icon,
  className,
  children,
  onToggle,
}: SidebarGroupProps) {
  return (
    <div className={clsx('w-full', className)}>
      <button
        type="button"
        onClick={onToggle}
        className={clsx(
          'w-full flex items-center gap-2 rounded-md border px-2 py-2',
          'bg-white hover:bg-gray-50 dark:bg-[#1f1f1f] dark:hover:bg-[#2a2a2a] border-gray-200 dark:border-gray-700',
          onToggle ? 'cursor-pointer' : 'cursor-default'
        )}
        aria-label={onToggle ? 'Toggle Sidebar' : label}
      >
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {!collapsed && <span className="text-sm">{label}</span>}
      </button>

      {!collapsed && children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}
