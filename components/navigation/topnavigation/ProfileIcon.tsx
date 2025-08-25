'use client';

import { User } from 'lucide-react';
import clsx from 'clsx';

type Props = { className?: string };

export default function ProfileIcon({ className }: Props) {
  return (
    <div className="relative grid place-items-center">
      <User
        className={clsx(
          'w-6 h-6 text-[#00332D] dark:text-white',
          // swivel wiggle on hover (parent must have .group)
          'origin-center group-hover:animate-profile-swivel',
          className
        )}
        strokeWidth={2.2} // keep slightly bolder for optical balance
      />
    </div>
  );
}
