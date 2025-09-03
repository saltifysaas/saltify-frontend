'use client';

import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { LayoutDashboard, Palette, PanelsLeftRight, Badge } from "lucide-react";

type TabKey = "workspace" | "appearance" | "sidebar" | "branding";

const WorkspaceTab     = dynamic(() => import("./tabs/WorkspaceTab"), { ssr: false });
const AppearanceTab    = dynamic(() => import("./tabs/AppearanceTab"), { ssr: false });
const SidebarModuleTab = dynamic(() => import("./tabs/SidebarModuleTab"), { ssr: false });
const BrandingTab      = dynamic(() => import("./tabs/BrandingTab"), { ssr: false });

const TABS: { key: TabKey; label: string; Icon: React.ComponentType<any> }[] = [
  { key: "workspace", label: "Workspace",       Icon: LayoutDashboard },
  { key: "appearance", label: "Appearance",     Icon: Palette },
  { key: "sidebar",    label: "Sidebar", Icon: PanelsLeftRight },
  { key: "branding",   label: "Branding",       Icon: Badge },
];

export default function SettingsClient({
  onSummaryChange,
  onTabsBarHeightChange,
}: {
  onSummaryChange?: (s: { title: string; bullets: string[] }) => void;
  onTabsBarHeightChange?: (px: number) => void;
}) {
  const [active, setActive] = useState<TabKey>("workspace");
  const tabsBarRef = useRef<HTMLDivElement>(null);

  // Supply the right-rail with contextual help content
  const summary = useMemo(() => {
    switch (active) {
      case "workspace":
        return {
          title: "Workspace",
          bullets: [
            "Set workspace name, region & default locale",
            "Invite members and assign roles",
            "Configure tenant domains/subdomains",
            "Best practices for naming conventions",
            "Manage multiple regions and compliance",
            "Connect workspace to integrations",
            "Set default timezones and local formats",
            "Troubleshoot login/domain mapping issues",
            "Billing & subscription settings",
            "Manage API keys securely",
            "Onboard team members quickly",
            "Advanced role hierarchies",
            "Archive or deactivate workspaces",
            "Link to GitBook docs",
            "FAQ: common errors & fixes",
             "Troubleshoot login/domain mapping issues",
            "Billing & subscription settings",
            "Manage API keys securely",
            "Onboard team members quickly",
            "Advanced role hierarchies",
            "Archive or deactivate workspaces",
            "Link to GitBook docs",
            "FAQ: common errors & fixes",
          ],
        };
      case "appearance":
        return {
          title: "Appearance",
          bullets: ["Toggle themes", "Choose tokens", "Preview density & spacing"],
        };
      case "sidebar":
        return {
          title: "Sidebar",
          bullets: ["Reorder modules", "Collapse behaviour", "Role-based visibility"],
        };
      case "branding":
        return {
          title: "Branding",
          bullets: ["Upload logos/icons", "Brand colors & font", "Header/Footer blocks"],
        };
    }
  }, [active]);

  useEffect(() => {
    if (summary && onSummaryChange) onSummaryChange(summary);
  }, [summary, onSummaryChange]);

  // Measure sticky tabs bar height so the rail partition aligns exactly
  useLayoutEffect(() => {
    if (!tabsBarRef.current || !onTabsBarHeightChange) return;
    const el = tabsBarRef.current;
    const push = () => onTabsBarHeightChange(Math.ceil(el.getBoundingClientRect().height));
    push();
    const ro = new ResizeObserver(() => push());
    ro.observe(el);
    return () => ro.disconnect();
  }, [onTabsBarHeightChange]);

  return (
    <div className="flex flex-col min-w-0">
      {/* Sticky tabs bar with bottom divider */}
      <div
        ref={tabsBarRef}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
      >
        <div className="flex items-center gap-2 px-4 h-12">
          {TABS.map(({ key, label, Icon }) => {
            const selected = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={clsx(
                  "relative inline-flex items-center gap-2 px-4 py-2 text-sm transition",
                  selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={selected ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4">
        <Suspense fallback={<div className="text-sm text-muted-foreground p-4">Loading…</div>}>
          {active === "workspace" && <WorkspaceTab />}
          {active === "appearance" && <AppearanceTab />}
          {active === "sidebar" && <SidebarModuleTab />}
          {active === "branding" && <BrandingTab />}
        </Suspense>
      </div>
    </div>
  );
}
