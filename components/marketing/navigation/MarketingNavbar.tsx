'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HelpCircle } from 'lucide-react';

import { AuthModalProvider } from '@/components/auth/AuthModal';
import MarketingNavItems from './MarketingNavItems';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

export default function MarketingNavbar() {
  return (
    <AuthModalProvider>
      <header className="w-full border-b bg-white dark:bg-[#111827] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center" aria-label="Saltify Home">
              <Image src="/logo/logo-green.svg" alt="SALTify Logo" width={120} height={30} className="block dark:hidden" priority />
              <Image src="/logo/logo-white.svg" alt="SALTify Logo" width={120} height={30} className="hidden dark:block" priority />
            </Link>
            <MarketingNavItems />
          </div>

          <div className="flex items-center gap-4">
            <HelpCircle className="w-5 h-5 text-textDark dark:text-gray-300 cursor-pointer transition-colors hover:text-ui-buttonSecondaryBorder" aria-label="Help" />
            <LoginButton />
            <RegisterButton />
          </div>
        </div>
      </header>
    </AuthModalProvider>
  );
}
