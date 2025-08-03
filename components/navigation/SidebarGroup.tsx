'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface SidebarGroupProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  collapsed?: boolean;
}

export default function SidebarGroup({
  icon,
  label,
  children,
  collapsed = false,
}: SidebarGroupProps) {
  const [hovered, setHovered] = useState(false);

  const isDataExtension = label === 'Data Extension';

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main Item */}
      <button
        className={clsx(
          'flex items-center gap-3 text-sm p-2 w-full text-left rounded-md transition-colors',
          'text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
        )}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </button>

      {/* Hover Pop-out Submenu */}
      {isDataExtension && hovered && !collapsed && (
        <div
          className={clsx(
            'absolute left-full top-0 ml-2 z-10 w-56 bg-white dark:bg-[#1a1a1a] shadow-lg rounded-md p-2',
            'flex flex-col gap-1 text-sm text-[#00332D] dark:text-white'
          )}
        >
          <SidebarItem label="All Data Extensions" />
          <SidebarItem label="My Data Extensions" />
          <SidebarItem label="All Contacts" />
          <SidebarItem label="Analyze Data" />
          <SidebarItem label="Data Extension" />
        </div>
      )}
    </div>
  );
}

function SidebarItem({ label }: { label: string }) {
  return (
    <div
      className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a] cursor-pointer"
    >
      {label}
    </div>
  );
}
