'use client';

import {
  Plus,
  CalendarClock,
  Contact2,
  SlidersHorizontal,
  Briefcase,
  MessageCircle,
  Newspaper,
  Search,
  X as XIcon
} from 'lucide-react';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TopNavigationBar from '@/components/navigation/TopNavigationBar';
import LeftNavigationBar from '@/components/navigation/LeftNavigationBar';
import ThemeToggle from '@/components/ui/ThemeToggle';
import CreateDataExtensionModal from '@/components/de/CreateDataExtensionModal';

const templates = [
  { name: 'Event Invitation Data', icon: CalendarClock },
  { name: 'Lead Generation Data', icon: Contact2 },
  { name: 'Preference Management', icon: SlidersHorizontal },
  { name: 'Job Application Data', icon: Briefcase },
  { name: 'Feedback Collection', icon: MessageCircle },
  { name: 'Newsletter Signup', icon: Newspaper }
];

export default function DataExtensionBuilder() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  // Split path and format
  const pathSegments = pathname
    .split('/')
    .filter(Boolean)
    .map(segment => segment.replace(/-/g, ' '))
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f]">
      <TopNavigationBar />

      <div className="flex justify-between gap-[1px] px-2 pb-2">
        <LeftNavigationBar onCreateData={() => setShowModal(true)} />

        <main className="mx-auto w-full max-w-6xl p-6">
          {/* Breadcrumb Title */}
          <h2 className="text-sm font-normal mb-6 text-left text-blue-600 text-[#00332D] dark:text-white">
            {pathSegments.join(' › ')}
          </h2>

          {/* Search + +Data Extension Row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            {/* Search Input with Icons */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for Data Extension"
                className="w-full h-[40px] p-4 pl-14 pr-12 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#1f1f1f] text-black dark:text-white text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-300" />
              <XIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>

            {/* + Data Extension Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-3 px-10 h-[40px] py-4 bg-[#00332D] text-white rounded-md hover:bg-[#004d40] min-w-[240px] justify-center text-base font-medium"
            >
              <Plus className="w-6 h-6" />
              <span>Data Extension</span>
            </button>
          </div>

          {/* Template Picker */}
          <div className="mt-10 pb-16">
            <h3 className="text-xl font-semibold mb-4 text-[#00332D] dark:text-white">
              Or Pick from Template
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.name}
                    className="p-5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] hover:shadow-md hover:ring-2 hover:ring-[#00332D] cursor-pointer transition"
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

      {/* Modal */}
      {showModal && <CreateDataExtensionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
