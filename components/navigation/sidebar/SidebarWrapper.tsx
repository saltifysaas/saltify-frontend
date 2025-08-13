'use client';

import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

export default function SidebarWrapper({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <aside
      style={style}
      className={clsx(
        'flex flex-col justify-between border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-ui-navigationDark transition-all duration-300 rounded-md mt-[2px] h-full',
        className
      )}
    >
      {children}
    </aside>
  );
}
