'use client';

import { useState } from 'react';
import {
  Search,
  CalendarClock,
  Contact2,
  SlidersHorizontal,
  Briefcase,
  MessageCircle,
  Newspaper
} from 'lucide-react';

import TopNavigationBar from '@/components/navigation/TopNavigationBar';
import LeftNavigationBar from '@/components/navigation/LeftNavigationBar';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function DataExtensionBuilder() {
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    { name: 'Event Invitation Data', icon: CalendarClock },
    { name: 'Lead Generation Data', icon: Contact2 },
    { name: 'Preference Management', icon: SlidersHorizontal },
    { name: 'Job Application Data', icon: Briefcase },
    { name: 'Feedback Collection', icon: MessageCircle },
    { name: 'Newsletter Signup', icon: Newspaper }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d0d0d]">
      <TopNavigationBar />

      <div className="flex justify-between gap-[1px] px-2 pb-2">
        <LeftNavigationBar />

        <main className="mx-auto w-full max-w-6xl p-6">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-6 text-center text-[#00332D] dark:text-white">
            Create Data Extension
          </h2>

          {/* Search Input */}
          <div className="relative w-full max-w-md mx-auto mb-6">
            <input
              type="text"
              placeholder="Search for Data Extension"
              className="w-full p-3 pl-10 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#111827] text-black dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-500 dark:text-gray-300" />
          </div>

          {/* Template Picker */}
          <div className="pb-16">
            <h3 className="text-xl font-semibold mb-4 text-[#00332D] dark:text-white">
              Or Pick from Template
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.name}
                    className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] hover:shadow-md hover:ring-2 hover:ring-[#00332D] cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-50 dark:bg-[#00332D] p-2 rounded-full">
                        <Icon className="w-5 h-5 text-green-700 dark:text-white" />
                      </div>
                      <h4 className="font-semibold text-[#00332D] dark:text-white">
                        {template.name}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Predefined attributes for common use cases.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Theme Toggle */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
