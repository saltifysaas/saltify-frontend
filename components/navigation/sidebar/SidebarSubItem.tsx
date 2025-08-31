'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function SidebarSubItem({
  label,
  icon: Icon,
  href,
  active,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className={clsx(
        'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-[#1b1f25]',
        active ? 'bg-[#eaf0ff] text-[#00332D]' : 'text-[#00332D] dark:text-gray-200'
      )}
      aria-current={active ? 'page' : undefined}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
