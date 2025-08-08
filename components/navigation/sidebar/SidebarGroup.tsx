'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface SidebarGroupProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  children?: React.ReactNode;
  collapsed: boolean;
  active?: boolean;
}

export default function SidebarGroup({
  icon: Icon,
  label,
  href,
  children,
  collapsed,
  active = false,
}: SidebarGroupProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
    else setOpen((prev) => !prev);
  };

  return (
    <div
      onMouseEnter={() => collapsed && setOpen(true)}
      onMouseLeave={() => collapsed && setOpen(false)}
      className={clsx(
        'group',
        collapsed && 'relative hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-md'
      )}
    >
      <button
        onClick={handleClick}
        className={clsx(
          'flex items-center gap-3 text-sm p-2 w-full rounded-md transition-colors',
          active
            ? 'bg-gray-100 dark:bg-[#2a2a2a] text-primary font-medium'
            : 'text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
        )}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {!collapsed && <span>{label}</span>}
      </button>

      {/* 🔽 Children */}
      {!collapsed && open && children}
      {collapsed && open && (
        <div className="absolute left-full top-0 ml-1 bg-white dark:bg-[#111827] rounded shadow-md z-10 w-48">
          {children}
        </div>
      )}
    </div>
  );
}
