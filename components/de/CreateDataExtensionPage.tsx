'use client';

import {
  CalendarClock,
  Contact2,
  SlidersHorizontal,
  Briefcase,
  MessageCircle,
  Newspaper,
  Plus,
  Upload,
} from 'lucide-react';

interface TemplateCardProps {
  name: string;
  icon: React.ElementType;
  description: string;
}

const templates: TemplateCardProps[] = [
  {
    name: 'Event Invitation Data',
    icon: CalendarClock,
    description: 'Predefined attributes for common use cases.',
  },
  {
    name: 'Lead Generation Data',
    icon: Contact2,
    description: 'Predefined attributes for common use cases.',
  },
  {
    name: 'Preference Management',
    icon: SlidersHorizontal,
    description: 'Predefined attributes for common use cases.',
  },
  {
    name: 'Job Application Data',
    icon: Briefcase,
    description: 'Predefined attributes for common use cases.',
  },
  {
    name: 'Feedback Collection',
    icon: MessageCircle,
    description: 'Predefined attributes for common use cases.',
  },
  {
    name: 'Newsletter Signup',
    icon: Newspaper,
    description: 'Predefined attributes for common use cases.',
  },
];

function TemplateCard({ name, icon: Icon, description }: TemplateCardProps) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-lg p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer w-full">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 text-green-800 p-2 rounded-full">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-[#00332D] dark:text-white">
          {name}
        </h3>
      </div>
      <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default function CreateDataExtensionPage() {
  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-[#111827] rounded-2xl shadow-md border p-6 space-y-6 mt-6">
      {/* Action Buttons aligned to right */}
      <div className="flex justify-end">
        <div className="flex gap-3">
          <button className="bg-transparent border border-[#00332D] text-[#00332D] px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white dark:border-white">
            <Plus className="w-4 h-4" /> Create
          </button>
          <button className="bg-transparent border border-[#00332D] text-[#00332D] px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:text-white dark:border-white">
            <Upload className="w-4 h-4" /> Import
          </button>
        </div>
      </div>

      {/* Template Section */}
      <h2 className="text-lg font-semibold text-[#00332D] dark:text-white">
        Pick from Template
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template.name} {...template} />
        ))}
      </div>
    </div>
  );
}
