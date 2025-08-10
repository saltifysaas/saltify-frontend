// components/navigation/sidebar/Sidebar.tsx
'use client';

import type { CSSProperties } from 'react';
import { Menu } from 'lucide-react';

import SidebarWrapper from '@/components/navigation/sidebar/SidebarWrapper';
import SidebarGroup from '@/components/navigation/sidebar/SidebarGroup';

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean | ((c: boolean) => boolean)) => void;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export default function Sidebar({ collapsed, setCollapsed, style, children }: Props) {
  // SidebarWrapper expects (val: boolean) => void
  const setCollapsedBool = (val: boolean) => setCollapsed(val);

  return (
    <SidebarWrapper collapsed={collapsed} setCollapsed={setCollapsedBool} style={style}>
      <SidebarGroup
        label="Menu"
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        icon={Menu}
        className="mt-4 mx-3"
      />
      {children}
    </SidebarWrapper>
  );
}
