'use client';

import { useState } from 'react';
import SidebarLogo from './SidebarLogo';
import LeftNavigationBar from '@/components/navigation/sidebar/LeftNavigationBar';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col items-start">
      {/* Logo lives outside the sidebar */}
      <SidebarLogo collapsed={collapsed} />

      {/* Gap between logo and nav */}
      <div className="h-3" />

      {/* Sidebar nav */}
      <div className="flex-1 w-full">
        <LeftNavigationBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </div>
  );
}
