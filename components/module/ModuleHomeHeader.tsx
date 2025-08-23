'use client';

import { useEffect, useRef, useState } from 'react';
import { Filter, Plus, Upload, MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import SearchBox from '@/components/navigation/SearchBox';

type ToolItem = {
  label: string;
  onClick: () => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
};

interface ModuleHomeHeaderProps {
  className?: string;

  // Actions
  onFilter?: () => void;
  onCreate?: () => void;
  onImport?: () => void;

  // Tools dropdown
  tools?: ToolItem[]; // if omitted, shows menu button but empty list
  toolsButtonAriaLabel?: string;

  // Search
  showSearch?: boolean;
  searchWidthClass?: string; // e.g. "w-[400px]" (defaults provided)
}

export default function ModuleHomeHeader({
  className,
  onFilter,
  onCreate,
  onImport,
  tools = [],
  toolsButtonAriaLabel = 'Open tools menu',
  showSearch = true,
  searchWidthClass = 'w-[400px]',
}: ModuleHomeHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // click outside to close tools menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-md gap-4 border-b border-gray-200 dark:border-gray-700 bg-ui-appBgLight dark:bg-ui-navigationDark px-4 py-3',
        className
      )}
    >
      {/* Left: Filter */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onFilter}
          className={clsx(
            'p-2 rounded-lg',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            !onFilter && 'opacity-50 cursor-default'
          )}
          aria-label="Filter"
        >
          <Filter size={18} />
        </button>
      </div>

      {/* Center: Search */}
      {showSearch ? (
        <div className="flex-1 flex justify-center">
          <SearchBox className={searchWidthClass} />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Create */}
        <button
          type="button"
          onClick={onCreate}
          className={clsx(
            'flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm',
            !onCreate && 'opacity-100 cursor-default'
          )}
        >
          <Plus size={16} />
          Create
        </button>

        {/* Import */}
        <button
          type="button"
          onClick={onImport}
          className={clsx(
            'flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm',
            !onImport && 'opacity-100 cursor-default'
          )}
        >
          <Upload size={16} />
          Import
        </button>

        {/* Tools Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={toolsButtonAriaLabel}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MoreVertical size={18} />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 min-w-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] shadow-lg overflow-hidden z-20"
            >
              {tools.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No tools
                </div>
              ) : (
                <ul className="py-1">
                  {tools.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li key={idx}>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setOpen(false);
                            item.onClick();
                          }}
                          className="w-full flex items-center  gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100"
                        >
                          {Icon ? <Icon size={16} className="shrink-0" /> : null}
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
