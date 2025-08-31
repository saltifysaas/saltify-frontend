'use client';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export default function MarketingNavItems({
  items = ['Design', 'Business', 'Education', 'Pricing', 'Learn'],
  className,
}: {
  items?: string[];
  className?: string;
}) {
  return (
    <nav className={clsx('hidden md:flex items-center gap-6 text-sm text-gray-800 dark:text-gray-200', className)}>
      {items.map((item) => (
        <button
          key={item}
          className="flex items-center gap-1 transition-colors hover:text-ui-buttonSecondaryBorder focus:outline-none focus-visible:ring"
          aria-haspopup="menu"
          aria-label={`${item} menu`}
        >
          {item}
          <ChevronDown className="w-4 h-4" />
        </button>
      ))}
    </nav>
  );
}
