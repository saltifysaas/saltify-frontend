'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function SidebarItem({
  label,
  icon: Icon,
  href,
  active,
  collapsed,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  const router = useRouter();

  const go = () => {
    if (onClick) return onClick();
    if (href) router.push(href);
  };

  return collapsed ? (
    <button
      onClick={go}
      className="group w-full flex justify-center"
      title={label}
      aria-current={active ? 'page' : undefined}
    >
      <span
        className={clsx(
          'w-11 h-11 rounded-md grid place-items-center transition-all duration-200',
          active
            ? 'bg-[#00332D] text-white'
            : 'bg-white dark:bg-ui-navigationDark text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#242932]'
        )}
      >
        <Icon className="w-5 h-5" />
      </span>
    </button>
  ) : (
    <button
      onClick={go}
      className={clsx(
        'relative w-full rounded-md transition-colors flex items-center gap-3 px-3 py-2',
        active ? 'bg-[#eaf0ff]' : 'hover:bg-gray-50 dark:hover:bg-[#1b1f25]'
      )}
      aria-current={active ? 'page' : undefined}
    >
      {active && (
        <span className="absolute left-0 top-0 h-full w-[2px] bg-[#00332D] rounded-l-md" />
      )}
      <Icon className={clsx('w-5 h-5', active ? 'text-[#00332D]' : 'text-[#00332D] dark:text-gray-200')} />
      <span className={clsx('text-sm', active ? 'text-[#00332D] dark:text-white font-semibold' : 'text-[#00332D] dark:text-gray-200')}>
        {label}
      </span>
    </button>
  );
}
