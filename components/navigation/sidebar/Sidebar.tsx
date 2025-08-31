'use client';

import LeftNavigationBar from './LeftNavigationBar';

export default function Sidebar(props: React.ComponentProps<typeof LeftNavigationBar>) {
  return <LeftNavigationBar {...props} />;
}
