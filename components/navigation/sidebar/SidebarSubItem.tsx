'use client';

import SidebarSubItem from './SidebarSubItem';

interface SidebarSubMenuProps {
  items: { label: string; href: string }[];
  collapsed: boolean;
}

export default function SidebarSubMenu({ items, collapsed }: SidebarSubMenuProps) {
  return (
    <div className="space-y-1 pl-4 mt-1">
      {items.map((item) => (
        <SidebarSubItem key={item.href} {...item} collapsed={collapsed} />
      ))}
    </div>
  );
}
