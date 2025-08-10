// components/de/CreateDataExtensionPage.tsx
'use client';

import React from 'react';
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
import { useRouter } from 'next/navigation';

interface TemplateCardProps {
  name: string;
  icon: React.ElementType;
  description: string;
}

const templates: TemplateCardProps[] = [
  { name: 'Event Invitation Data', icon: CalendarClock, description: 'Predefined attributes for common use cases.' },
  { name: 'Lead Generation Data', icon: Contact2, description: 'Predefined attributes for common use cases.' },
  { name: 'Preference Management', icon: SlidersHorizontal, description: 'Predefined attributes for common use cases.' },
  { name: 'Job Application Data', icon: Briefcase, description: 'Predefined attributes for common use cases.' },
  { name: 'Feedback Collection', icon: MessageCircle, description: 'Predefined attributes for common use cases.' },
  { name: 'Newsletter Signup', icon: Newspaper, description: 'Predefined attributes for common use cases.' },
];

function TemplateCard({ name, icon: Icon, description }: TemplateCardProps) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-md p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer w-full">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 text-green-800 p-2 rounded-md">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5F4]">{name}</h3>
      </div>
      <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">{description}</p>
    </div>
  );
}

export type CreateDataExtensionPageProps = {
  onClose?: () => void;
};

const CreateDataExtensionPage: React.FC<CreateDataExtensionPageProps> = ({ onClose }) => {
  const router = useRouter();

  const handleCreate = () => {
    router.push('/wizard');
    onClose?.();
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      {/* 📦 White Card Box */}
      <div className="bg-white dark:bg-[#111827] rounded-md shadow-md border p-6 space-y-6">
        {/* 🔘 Top-right Action Buttons */}
        <div className="flex justify-end w-full mb-2">
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              className="bg-[#009966] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#24A77B] transition"
            >
              <Plus className="w-4 h-4" /> Create
            </button>
            <button
              className="bg-white text-[#009966] border border-[#009966] px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#f5f5f5] dark:bg-[#1a1a1a] dark:hover:bg-[#2a2a2a] dark:text-white dark:border-white transition"
            >
              <Upload className="w-4 h-4" /> Import
            </button>
          </div>
        </div>

        {/* 🧱 Template Section */}
        <h2 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5F4]">Pick from Template</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard key={template.name} {...template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateDataExtensionPage;
