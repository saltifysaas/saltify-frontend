'use client';

import type { CSSProperties } from 'react';
import { Menu } from 'lucide-react';

import SidebarWrapper from './SidebarWrapper';
import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';
import SidebarFooter from './SidebarFooter';

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean | ((c: boolean) => boolean)) => void;
  style?: CSSProperties;
};

export default function Sidebar({ collapsed, setCollapsed, style }: Props) {
  return (
    <SidebarWrapper collapsed={collapsed} style={style}>
      {/* Header group (uses icon prop) */}
      <SidebarGroup
        label="Menu"
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        icon={Menu}
        className="mt-4 mx-3"
      />

      {/* TODO: render your actual items here, or keep whatever you already have */}
      {/* <SidebarItem ... /> */}
      {/* <SidebarSubItem ... /> */}

      <SidebarFooter collapsed={collapsed} setCollapsed={setCollapsed} />
    </SidebarWrapper>
  );
}
