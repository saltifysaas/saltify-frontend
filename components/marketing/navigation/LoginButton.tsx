'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useAuthModal } from '@/components/auth/AuthModal';

export default function LoginButton({
  href = '/auth/login',
  children = 'Log in',
  className,
  openAsModal = true,
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  openAsModal?: boolean;
}) {
  const { open } = useAuthModal();

  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!openAsModal) return;
    // open modal only for simple left-click without modifiers
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      open('login');
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'px-4 py-1.5 text-sm rounded-md border transition-colors',
        'bg-ui-buttonSecondaryBg text-ui-buttonSecondaryText border-ui-buttonSecondaryBorder',
        'hover:bg-gray-100 dark:hover:bg-[#2a2a2a]',
        'focus:outline-none focus:ring-2 focus:ring-ui-buttonSecondaryBorder',
        className
      )}
      aria-label="Log in"
    >
      {children}
    </Link>
  );
}
