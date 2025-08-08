// components/navigation/nav.config.ts
import {
  LayoutTemplate,
  FileText,
  Bot,
  Database,
  Users,
  BarChart,
  LayoutDashboard,
} from 'lucide-react';

export type NavItem = {
  label: string;
  icon: any;
  href?: string;
  children?: Array<{ label: string; href: string; icon?: any }>;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Landing Pages', icon: LayoutTemplate, href: '/landingpages' },
  { label: 'Forms', icon: FileText, href: '/forms' },
  { label: 'AI Agents', icon: Bot, href: '/aiagents' },
  {
    label: 'Data Extensions',
    icon: Database,
    href: '/dataextension',
    children: [
      { label: 'All Data Extensions', href: '/dataextension' },
      { label: 'Data Tables', href: '/dataextension/tables' },
    ],
  },
  {
    label: 'Contacts',
    icon: Users,
    href: '/contacts',
    children: [
      { label: 'All Contacts', href: '/contacts' },
      { label: 'Segmentation', href: '/contacts/segmentation' },
      { label: 'Profiles', href: '/contacts/profiles' },
    ],
  },
  { label: 'Reports', icon: BarChart, href: '/reports' },
  { label: 'Dashboards', icon: LayoutDashboard, href: '/dashboards' },
];
