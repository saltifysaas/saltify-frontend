'use client';

import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarSubItemProps {
  label: string;
  href: string;
  collapsed: boolean;
}

export default function SidebarSubItem({
  label,
  href,
  collapsed,
}: SidebarSubItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <button
      onClick={() => router.push(href)}
      className={clsx(
        'w-full text-left text-sm px-4 py-1.5 rounded-md transition-colors',
        isActive
          ? 'bg-gray-100 dark:bg-[#2a2a2a] text-primary font-medium'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
      )}
    >
      {collapsed ? (
        <span className="block px-2 py-1 text-xs">{label}</span>
      ) : (
        label
      )}
    </button>
  );
}
