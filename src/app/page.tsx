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
                className="flex items-center gap-1 transition-colors hover:text-[#006699] focus:outline-none focus-visible:ring"
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
            className="w-5 h-5 text-[#00332D] dark:text-gray-300 cursor-pointer transition-colors hover:text-[#006699]"
            aria-label="Help"
          />

          {/* Outline secondary: #006699, fills on hover */}
          <Link
            href="/auth/login"
            className="px-4 py-1.5 border rounded-md text-sm transition-colors
                       border-[#006699] text-[#006699]
                       hover:bg-[#006699] hover:text-white
                       dark:border-[#006699] dark:text-[#66B2CC] dark:hover:bg-[#006699] dark:hover:text-white"
          >
            Log in
          </Link>

          {/* Primary filled: #009966 */}
          <Link
            href="/auth/register"
            className="px-4 py-1.5 text-sm rounded-md transition
                       bg-[#009966] text-white hover:brightness-95
                       dark:bg-[#009966] dark:text-white dark:hover:brightness-95"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
