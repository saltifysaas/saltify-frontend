'use client';

import Link from 'next/link';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function MarketingNavbar() {
  return (
    <header className="w-full border-b bg-white dark:bg-[#111827] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-600">
            SALTify
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-800 dark:text-gray-200">
            {['Design', 'Business', 'Education', 'Pricing', 'Learn'].map((item) => (
              <button key={item} className="flex items-center gap-1 hover:text-blue-600 transition">
                {item}
                <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </nav>
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-4">
          <HelpCircle className="w-5 h-5 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-blue-600" />
          <Link href="/login" className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-[#2a2a2a]">
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 text-sm rounded-md bg-violet-600 text-white hover:bg-violet-700 transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
