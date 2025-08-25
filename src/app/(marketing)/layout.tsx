'use client';

import { AuthModalProvider } from '@/components/auth/AuthModal';
import MarketingNavbar from '@/components/marketing/navigation/MarketingNavbar';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <MarketingNavbar />
      {children}
    </AuthModalProvider>
  );
}
