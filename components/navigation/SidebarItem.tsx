'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  collapsed?: boolean;
}

export default function SidebarItem({ icon, label, href, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'group relative flex items-center gap-3 text-sm p-2 rounded-md transition-colors',
        isActive
          ? 'bg-[#E6F4F1] text-[#00332D] dark:bg-[#00332D] dark:text-white font-semibold'
          : 'text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
      {collapsed && (
        <span className="absolute left-full ml-3 px-2 py-1 text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
          {label}
        </span>
      )}
    </Link>
  );
}
