'use client';

import { useEffect, useRef, useState } from 'react';
import { Filter, Plus, Upload, MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import SearchBox from '@/components/navigation/topnavigation/SearchBox';

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
  tools?: ToolItem[];
  toolsButtonAriaLabel?: string;

  // Search
  showSearch?: boolean;
  searchWidthClass?: string;
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

  // --- Base style shared by buttons (1pt stroke everywhere) ---
  const baseBtn =
    'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(0,153,102,0.4)] ' +
    'disabled:opacity-50 disabled:pointer-events-none border-pt1';

  // Primary — uses white border in light, #4A4A4A in dark
  const primaryBtn = clsx(
    baseBtn,
    'bg-ui-buttonPrimaryBg text-ui-buttonPrimaryText border-ui-buttonPrimaryBorder hover:bg-ui-buttonPrimaryHover',
    'dark:bg-ui-darkButtonPrimaryBg dark:text-ui-darkButtonPrimaryText dark:border-ui-darkButtonPrimaryBorder dark:hover:bg-ui-darkButtonPrimaryHover'
  );

  // Secondary — uses green border in light, white in dark
  const secondaryBtn = clsx(
    baseBtn,
    'bg-ui-buttonSecondaryBg text-ui-buttonSecondaryText border-ui-buttonSecondaryBorder hover:bg-ui-buttonSecondaryHover',
    'dark:bg-ui-darkButtonSecondaryBg dark:text-ui-darkButtonSecondaryText dark:border-ui-darkButtonSecondaryBorder dark:hover:bg-ui-darkButtonSecondaryHover'
  );

  // Ghost (Filter, Tools) → neutral hover surfaces
  const ghostIconBtn = clsx(
    'p-2 rounded-lg transition-colors border border-transparent',
    'hover:bg-ui-hoverBG dark:hover:bg-ui-hoverBGDark',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(0,153,102,0.4)]',
    'disabled:opacity-50 disabled:pointer-events-none'
  );

  const headerWrap = clsx(
    'flex items-center justify-between rounded-md gap-4 border-b px-4 py-3',
    'border-[color:var(--border-color)]',
    'bg-ui-appBgLight dark:bg-ui-navigationDark'
  );

  return (
    <div className={clsx(headerWrap, className)}>
      {/* Left: Filter */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onFilter}
          disabled={!onFilter}
          className={ghostIconBtn}
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
        {/* Create (Primary) */}
        <button
          type="button"
          onClick={onCreate}
          disabled={!onCreate}
          className={primaryBtn}
        >
          <Plus size={16} />
          Create
        </button>

        {/* Import (Secondary) */}
        <button
          type="button"
          onClick={onImport}
          disabled={!onImport}
          className={secondaryBtn}
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
            className={ghostIconBtn}
          >
            <MoreVertical size={18} />
          </button>

          {open && (
            <div
              role="menu"
              className={clsx(
                'absolute right-0 mt-2 min-w-[180px] z-20 overflow-hidden rounded-lg border',
                'border-[color:var(--border-color)]',
                'bg-popover text-popover-foreground shadow-lg'
              )}
            >
              {tools.length === 0 ? (
                <div className="px-3 py-2 text-sm opacity-70">No tools</div>
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
                          className={clsx(
                            'w-full flex items-center gap-2 px-3 py-2 text-left text-sm',
                            'hover:bg-ui-hoverBG dark:hover:bg-ui-hoverBGDark'
                          )}
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
