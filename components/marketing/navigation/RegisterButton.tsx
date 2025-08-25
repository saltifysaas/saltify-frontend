'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useAuthModal } from '@/components/auth/AuthModal';

export default function RegisterButton({
  href = '/auth/register',
  children = 'Sign up',
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
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      open('register');
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'px-4 py-1.5 text-sm rounded-md transition-colors',
        'bg-ui-buttonPrimaryBg text-ui-buttonPrimaryText border border-ui-buttonPrimaryBorder',
        'hover:bg-ui-buttonPrimaryHover',
        'focus:outline-none focus:ring-2 focus:ring-ui-buttonPrimaryBorder',
        className
      )}
      aria-label="Sign up"
    >
      {children}
    </Link>
  );
}
