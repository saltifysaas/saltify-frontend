'use client';

import Link from 'next/link';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Image from 'next/image';

export default function MarketingNavbar() {
  return (
    <header className="w-full border-b bg-white dark:bg-[#111827] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center" aria-label="Saltify Home">
            {/* Light Mode Logo */}
            <Image
              src="/logo/logo-green.svg"
              alt="SALTify Logo"
              width={120}
              height={30}
              className="block dark:hidden"
              priority
            />
            {/* Dark Mode Logo */}
            <Image
              src="/logo/logo-white.svg"
              alt="SALTify Logo"
              width={120}
              height={30}
              className="hidden dark:block"
              priority
            />
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-800 dark:text-gray-200">
            {['Design', 'Business', 'Education', 'Pricing', 'Learn'].map((item) => (
              <button
                key={item}
                className="flex items-center gap-1 transition-colors hover:text-ui-buttonSecondaryBorder focus:outline-none focus-visible:ring"
                aria-haspopup="menu"
              >
                {item}
                <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </nav>
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-4">
          <HelpCircle
            className="w-5 h-5 text-textDark dark:text-gray-300 cursor-pointer transition-colors hover:text-ui-buttonSecondaryBorder"
            aria-label="Help"
          />

          {/* Secondary (outline) — uses your tokens */}
          <Link
            href="/login"
            className="
              px-4 py-1.5 text-sm rounded-md border transition-colors
              bg-ui-buttonSecondaryBg text-ui-buttonSecondaryText border-ui-buttonSecondaryBorder
              hover:bg-ui-buttonSecondaryHover
              focus:outline-none focus:ring-2 focus:ring-ui-buttonSecondaryBorder
            "
          >
            Log in
          </Link>

          {/* Primary (filled) — uses your tokens */}
          <Link
            href="/register"
            className="
              px-4 py-1.5 text-sm rounded-md transition-colors
              bg-ui-buttonPrimaryBg text-ui-buttonPrimaryText border border-ui-buttonPrimaryBorder
              hover:bg-ui-buttonPrimaryHover
              focus:outline-none focus:ring-2 focus:ring-ui-buttonPrimaryBorder
            "
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
