'use client';

import {
  LayoutDashboard,
  FileText,
  Bot,
  Database,
  Users,
  BarChart,
  LayoutTemplate,
  Menu,
  List,
  Table,
  User as UserIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  type CSSProperties,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Tooltip from '../../ui/Tooltip';
import { SidebarWrapper } from './index';

type ChildItem = { label: string; icon: LucideIcon; href: string };
type NavItem = { label: string; icon: LucideIcon; href?: string; children?: ChildItem[] };

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Landing Pages', icon: LayoutTemplate, href: '/landingpages' },
  { label: 'Forms', icon: FileText, href: '/forms' },
  { label: 'AI Agents', icon: Bot, href: '/ai-agents' },
  {
    label: 'Contacts',
    icon: Users,
    children: [
      { label: 'All Contacts', icon: List, href: '/contact/home' },
      { label: 'Segmentation', icon: Filter, href: '/contacts/segmentation' },
      { label: 'Profiles', icon: UserIcon, href: '/contacts/profiles' },
    ],
  },
  {
    label: 'Data Extensions',
    icon: Database,
    children: [
      { label: 'All Data Extensions', icon: List, href: '/data-extension' },
      { label: 'Data Tables', icon: Table, href: '/dataextension/tables' },
    ],
  },
  { label: 'Reports', icon: BarChart, href: '/reports' },
];

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean | ((c: boolean) => boolean)) => void;
  style?: CSSProperties;
};

const BRAND_BG = '#00332D';

function useMounted() {
  const [mounted, set] = useState(false);
  useEffect(() => set(true), []);
  return mounted;
}

/** Typed CSS var helper (no `any` casts) */
type BrandVarStyle = React.CSSProperties & { ['--brand-bg']?: string };
const brandBg = (active: boolean): BrandVarStyle | undefined =>
  active ? { ['--brand-bg']: BRAND_BG } : undefined;

/* ------------------ Collapsed submenu (portal) ------------------ */
function CollapsedSubmenu({
  anchorEl,
  parentLabel,
  items,
  onRequestClose,
  onNavigate,
  scheduleClose,
  cancelClose,
  setEdgeSuppressed,
}: {
  anchorEl: HTMLElement;
  parentLabel: string;
  items: ChildItem[];
  onRequestClose: () => void;
  onNavigate: (href: string) => void;
  scheduleClose: (delay?: number) => void;
  cancelClose: () => void;
  setEdgeSuppressed: (b: boolean) => void;
}) {
  const mounted = useMounted();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; placement: 'right' | 'left' }>({
    top: -9999,
    left: -9999,
    placement: 'right',
  });

  const compute = useCallback(() => {
    if (!menuRef.current) return;
    if (!document.body.contains(anchorEl)) {
      onRequestClose();
      return;
    }
    const menuRect = menuRef.current.getBoundingClientRect();
    const r = anchorEl.getBoundingClientRect();

    const gap = 0;
    let placement: 'right' | 'left' = 'right';
    let left = r.right + gap;
    if (left + menuRect.width > window.innerWidth - 8) {
      placement = 'left';
      left = r.left - menuRect.width - gap;
    }

    const maxTop = window.innerHeight - menuRect.height - 8; // correct height usage
    const top = Math.max(8, Math.min(r.top, maxTop));
    setPos({ top, left, placement });
    setReady(true);
  }, [anchorEl, onRequestClose]);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(compute);
    return () => cancelAnimationFrame(raf);
  }, [compute]);

  useEffect(() => {
    let rAf: number | null = null;
    const onChange = () => {
      if (rAf !== null) cancelAnimationFrame(rAf);
      rAf = requestAnimationFrame(compute);
    };
    window.addEventListener('resize', onChange);
    window.addEventListener('scroll', onChange, true);
    return () => {
      window.removeEventListener('resize', onChange);
      window.removeEventListener('scroll', onChange, true);
      if (rAf !== null) cancelAnimationFrame(rAf);
    };
  }, [compute]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onRequestClose();
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current && (t === menuRef.current || menuRef.current.contains(t))) return;
      if (anchorEl && (t === anchorEl || anchorEl.contains(t))) return;
      onRequestClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [onRequestClose, anchorEl]);

  // Hide edge chevron while submenu is engaged
  useEffect(() => {
    setEdgeSuppressed(true);
    return () => setEdgeSuppressed(false);
  }, [setEdgeSuppressed]);

  if (!mounted) return null;

  const aRect = anchorEl.getBoundingClientRect();
  const bridgeStyle: React.CSSProperties =
    pos.placement === 'right'
      ? {
          position: 'fixed',
          top: aRect.top,
          left: aRect.right,
          width: Math.max(1, pos.left - aRect.right),
          height: aRect.height,
          zIndex: 999,
        }
      : {
          position: 'fixed',
          top: aRect.top,
          left: pos.left + (menuRef.current?.offsetWidth ?? 0),
          width: Math.max(1, aRect.left - (pos.left + (menuRef.current?.offsetWidth ?? 0))),
          height: aRect.height,
          zIndex: 999,
        };

  return createPortal(
    <>
      {ready && (
        <div
          style={bridgeStyle}
          onMouseEnter={() => {
            cancelClose();
            setEdgeSuppressed(true);
          }}
          onMouseLeave={() => {
            scheduleClose(120);
            setEdgeSuppressed(false);
          }}
        />
      )}
      <div
        ref={menuRef}
        role="menu"
        aria-label={parentLabel}
        className={clsx(
          'fixed z-[1000] min-w-[220px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] shadow-2xl overflow-hidden transition-opacity',
          ready ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ top: pos.top, left: pos.left }}
        onMouseEnter={() => {
          cancelClose();
          setEdgeSuppressed(true);
        }}
        onMouseLeave={() => {
          scheduleClose(120);
          setEdgeSuppressed(false);
        }}
      >
        <div className="px-3 py-2 text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-700">
          {parentLabel}
        </div>
        <ul className="py-1">
          {items.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <button
                role="menuitem"
                onClick={() => onNavigate(href)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-[15px] font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>,
    document.body
  );
}

/* ------------------ Edge Handle (stable & suppressible) ------------------ */
type DivRef =
  | React.RefObject<HTMLDivElement | null>
  | React.MutableRefObject<HTMLDivElement | null>;

function EdgeHandlePortal({
  anchorRef,
  collapsed,
  toggle,
  suppress,
}: {
  anchorRef: DivRef;
  collapsed: boolean;
  toggle: () => void;
  suppress: boolean;
}) {
  const mounted = useMounted();
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [visible, setVisible] = useState(false);
  const [posY, setPosY] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const node = anchorRef.current;
    if (!node) return;

    const update = () => setRect(node.getBoundingClientRect());
    update();

    const ro = new ResizeObserver(update);
    ro.observe(node);

    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [anchorRef]);

  if (!mounted || !rect) return null;

  const BTN = 32;
  const half = BTN / 2;
  const hoverWidth = 6; // very thin inner strip so it doesn't block item hovers
  const containerLeft = rect.right - hoverWidth; // half in / half out
  const containerWidth = hoverWidth;

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));
  const top =
    posY == null
      ? rect.top + rect.height / 2 - half
      : clamp(posY - half, rect.top, rect.bottom - BTN);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const y = e.clientY;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPosY(y));
  };

  const show = () => {
    if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    setVisible(true);
  };
  const hide = () => {
    if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setVisible(false), 120);
  };

  const containerStyle: React.CSSProperties = suppress
    ? { pointerEvents: 'none', opacity: 0 }
    : {};

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: rect.top,
        left: containerLeft,
        width: containerWidth,
        height: rect.height,
        zIndex: 1110,
        ...containerStyle,
      }}
      onMouseEnter={show}
      onMouseMove={onMove}
      onMouseLeave={hide}
    >
      <button
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={toggle}
        style={{
          position: 'absolute',
          top: top - rect.top,
          left: -half, // button straddles the border
          width: BTN,
          height: BTN,
          transform: visible ? 'translateX(0)' : 'translateX(8px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity .12s ease, transform .12s ease',
        }}
        className={clsx(
          'rounded-full shadow-sm',
          'bg-white dark:bg-[#0f172a]',
          'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/60'
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 mx-auto text-emerald-900 dark:text-emerald-100" />
        ) : (
          <ChevronLeft className="w-4 h-4 mx-auto text-emerald-900 dark:text-emerald-100" />
        )}
      </button>
    </div>,
    document.body
  );
}

/* ------------------ main component ------------------ */
export default function LeftNavigationBar({ collapsed, setCollapsed, style }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const anchorRef = useRef<HTMLDivElement | null>(null); // ref for the sidebar container

  // Auto-open the group that matches current route
  const activeParentLabel = useMemo(() => {
    for (const item of NAV_ITEMS) {
      if (!item.children) continue;
      if (item.children.some((ch) => pathname === ch.href || pathname.startsWith(ch.href + '/'))) {
        return item.label;
      }
    }
    return null;
  }, [pathname]);

  const [openMenu, setOpenMenu] = useState<string | null>(activeParentLabel);
  useEffect(() => setOpenMenu(activeParentLabel), [activeParentLabel]);

  // Collapsed-mode popover state
  const [popover, setPopover] = useState<{
    parentLabel: string;
    items: ChildItem[];
    anchorEl: HTMLElement;
  } | null>(null);
  const [edgeSuppressed, setEdgeSuppressed] = useState(false);

  // Shared close timer for stable hover transitions
  const closeTimer = useRef<number | null>(null);
  const scheduleClose = (delay = 120) => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPopover(null), delay);
  };
  const cancelClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  };

  /* Theme state (instant icon/text swap) */
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      const el = document.documentElement;
      const initial =
        el.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark' ||
        (localStorage.getItem('theme') == null &&
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      el.classList.toggle('dark', initial);
      setDark(initial);
    } catch {}
  }, []);
  const toggleTheme = () => {
    try {
      const el = document.documentElement;
      const next = !dark;
      el.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      setDark(next);
    } catch {}
  };

  const go = (href?: string) => href && router.push(href);

  return (
    <>
      <div ref={anchorRef} className="relative h-full" style={style}>
        <SidebarWrapper className="h-full">
          {/* Header */}
          <div className={clsx('mt-4', collapsed ? 'px-0' : 'px-3')}>
            <button
              onClick={() => setCollapsed((c) => !c)}
              className={clsx(
                'group w-full flex items-center rounded-md transition',
                collapsed ? 'justify-center' : 'justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
              )}
            >
              {!collapsed && <span className="text-lg text-gray-700 dark:text-gray-400 ">Menu</span>}
              {collapsed ? (
                <span
                  className={clsx(
                    'w-11 h-11 rounded-md grid place-items-center transition-all duration-200',
                    'bg-white dark:bg-ui-navigationDark text-[#00332D] dark:text-white hover:bg-gray-100 dark:hover:bg-[#242932]'
                  )}
                >
                  <Menu className="w-5 h-5" />
                </span>
              ) : (
                <Menu className="w-5 h-5 text-[#00332D] dark:text-gray-200 " />
              )}
            </button>
          </div>

          {/* Nav list */}
          <div className={clsx('flex-1 flex flex-col gap-1 py-2', collapsed ? 'items-center px-0' : 'items-stretch px-2')}>
            {NAV_ITEMS.map(({ label, icon: Icon, href, children }) => {
              const childActive = !!children?.some(
                (ch) => pathname === ch.href || pathname.startsWith(ch.href + '/')
              );
              const leafActive = !!href && (pathname === href || pathname.startsWith(href + '/'));

              /* -------- Collapsed -------- */
              if (collapsed) {
                if (children?.length) {
                  return (
                    <Tooltip key={label} label={label}>
                      <div
                        className="w-full flex justify-center"
                        onMouseEnter={(e) => {
                          cancelClose();
                          setPopover({
                            parentLabel: label,
                            items: children,
                            anchorEl: e.currentTarget as HTMLElement,
                          });
                        }}
                        onMouseLeave={() => scheduleClose(160)}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (href) go(href);
                        }}
                      >
                        <button
                          className={clsx(
                            'w-11 h-11 rounded-md grid place-items-center',
                            (childActive || leafActive)
                              ? 'bg-[var(--brand-bg,#00332D)] text-white'
                              : 'text-[#00332D] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                          )}
                          style={brandBg(childActive || leafActive)}
                          aria-label={label}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      </div>
                    </Tooltip>
                  );
                }

                return (
                  <Tooltip key={label} label={label}>
                    <div className="w-full flex justify-center">
                      <button
                        onClick={() => go(href)}
                        className={clsx(
                          'w-11 h-11 rounded-md grid place-items-center',
                          leafActive
                            ? 'bg-[var(--brand-bg,#00332D)] text-white'
                            : 'text-[#00332D] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                        )}
                        style={brandBg(leafActive)}
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    </div>
                  </Tooltip>
                );
              }

              /* -------- Expanded -------- */
              if (children?.length) {
                const isOpen = openMenu === label;
                const parentActive = childActive || leafActive;

                return (
                  <div key={label} className="w-full">
                    <button
                      onClick={() => setOpenMenu((cur) => (cur === label ? null : label))}
                      className={clsx(
                        'w-full flex items-center justify-between rounded-md px-3 py-2',
                        parentActive
                          ? 'bg-[var(--brand-bg,#00332D)] text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-gray-100'
                      )}
                      style={brandBg(parentActive)}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <Icon className={clsx('w-5 h-5', parentActive && 'text-white')} />
                        <span className={clsx('text-[15px] font-medium truncate', parentActive && 'text-white')}>
                          {label}
                        </span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className={clsx('w-4 h-4 shrink-0', parentActive && 'text-white')} />
                      ) : (
                        <ChevronDown className={clsx('w-4 h-4 shrink-0', parentActive && 'text-white')} />
                      )}
                    </button>

                    {isOpen && (
                      <div className="mt-1 pl-8 pr-2 flex flex-col gap-1">
                        {children.map(({ label: clabel, icon: CIcon, href: chref }) => {
                          const active =
                            pathname === chref || pathname.startsWith(chref + '/');
                          return (
                            <button
                              key={chref}
                              onClick={() => go(chref)}
                              className={clsx(
                                'w-full flex items-center gap-3 rounded-md px-3 py-2 text-left',
                                active
                                  ? 'bg-[var(--brand-bg,#00332D)] text-white'
                                  : 'hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-gray-100'
                              )}
                              style={brandBg(active)}
                            >
                              <CIcon className={clsx('w-5 h-5 shrink-0', active && 'text-white')} />
                              <span className={clsx('text-[15px] font-medium truncate', active && 'text-white')}>
                                {clabel}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const active = leafActive;
              return (
                <button
                  key={label}
                  onClick={() => go(href)}
                  className={clsx(
                    'w-full flex items-center gap-3 rounded-md px-3 py-2 text-left',
                    active
                      ? 'bg-[var(--brand-bg,#00332D)] text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-gray-100'
                  )}
                  style={brandBg(active)}
                >
                  <Icon className={clsx('w-5 h-5', active && 'text-white')} />
                  <span className={clsx('text-[15px] font-medium truncate', active && 'text-white')}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer — collapsed: icons; expanded: labeled rows */}
          {collapsed ? (
            <div className="mt-auto px-2 pb-2 pt-2">
              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-11 h-11 rounded-md grid place-items-center hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-[#00332D] dark:text-gray-100 focus:outline-none"
                  aria-label="Toggle theme"
                  title="Toggle theme"
                >
                  {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/settings')}
                  className="w-11 h-11 rounded-md grid place-items-center hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-[#00332D] dark:text-gray-100 focus:outline-none"
                  aria-label="Settings"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-auto px-2 pb-2 pt-2">
              <div className="flex flex-col items-stretch gap-1">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="h-10 px-3 rounded-md inline-flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 focus:outline-none"
                  aria-label="Toggle theme"
                  title="Toggle theme"
                >
                  {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="text-sm">{dark ? 'Light' : 'Dark'} Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/settings')}
                  className="h-10 px-3 rounded-md inline-flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 focus:outline-none"
                  aria-label="Settings"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* Collapsed submenu (portal) */}
          {collapsed && popover && (
            <CollapsedSubmenu
              anchorEl={popover.anchorEl}
              parentLabel={popover.parentLabel}
              items={popover.items}
              onRequestClose={() => setPopover(null)}
              onNavigate={(href) => {
                setPopover(null);
                router.push(href);
              }}
              scheduleClose={scheduleClose}
              cancelClose={cancelClose}
              setEdgeSuppressed={setEdgeSuppressed}
            />
          )}
        </SidebarWrapper>
      </div>

      {/* Edge handle (thin hover strip; hidden while submenu active) */}
      <EdgeHandlePortal
        anchorRef={anchorRef}
        collapsed={collapsed}
        toggle={() => setCollapsed((c) => !c)}
        suppress={edgeSuppressed}
      />
    </>
  );
}
