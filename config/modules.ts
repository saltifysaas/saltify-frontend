import {
  LayoutDashboard,
  LayoutTemplate,
  FileText,
  Bot,
  Users,
  BarChart,
  Table as TableIcon,
  Filter as FilterIcon,
  List,
  Database,
  User as UserIcon,
  type LucideIcon,
} from 'lucide-react';

export type ChildItem = { label: string; icon: LucideIcon; href: string };
export type ModuleItem = {
  id: string;                 // unique key
  label: string;
  icon: LucideIcon;
  href?: string;              // leaf route
  children?: ChildItem[];     // group routes
  defaultEnabled?: boolean;   // default ON/OFF
};

// No “Data Extensions” anywhere.
export const MODULES: ModuleItem[] = [
  { id: 'dashboard',    label: 'Dashboard',     icon: LayoutDashboard, href: '/dashboard',    defaultEnabled: true },
  { id: 'landingpages', label: 'Landing Pages', icon: LayoutTemplate,  href: '/landingpages', defaultEnabled: true },
  { id: 'forms',        label: 'Forms',         icon: FileText,        href: '/forms',        defaultEnabled: true },
  { id: 'ai-agents',    label: 'AI Agents',     icon: Bot,             href: '/ai-agents',    defaultEnabled: true },

  {
    id: 'contacts',
    label: 'Contacts',
    icon: Users,
    defaultEnabled: true,
    children: [
      { label: 'All Contacts', icon: List,        href: '/contact/home' },
      { label: 'Segmentation', icon: FilterIcon,  href: '/contacts/segmentation' },
      { label: 'Profiles',     icon: UserIcon,    href: '/contacts/profiles' },
    ],
  },

  // Data Tables uses the Database (DB) icon; parent is clickable
  {
    id: 'data-tables',
    label: 'Data Tables',
    icon: Database,
    href: '/data-tables',
    defaultEnabled: true,
  },

  // Global Segments (independent of Contacts)
  { id: 'segments', label: 'Segments', icon: FilterIcon, href: '/segments', defaultEnabled: true },

  { id: 'reports',  label: 'Reports',  icon: BarChart,   href: '/reports',  defaultEnabled: true },
];

export function enabledModules(enabledMap: Record<string, boolean> | null) {
  return MODULES.filter((m) => (enabledMap?.[m.id] ?? m.defaultEnabled ?? true));
}
