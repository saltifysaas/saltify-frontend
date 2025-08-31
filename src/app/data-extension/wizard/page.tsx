'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import AppShell from '@/components/layout/AppShell';
import WizardLayout from '@/components/wizard/WizardLayout';

const wizardSteps = [
  { key: 'name', label: 'Name' },
  { key: 'attributes', label: 'Attributes' },
  { key: 'review', label: 'Review & Save' },
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Data Extensions', href: '/data-extension' },
  { label: 'Create', href: '/data-extension/wizard' },
];

export default function DataExtensionWizardPage() {
  const [deName, setDeName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const router = useRouter();

  const handleNext = () => {
    if (!deName.trim()) return alert('Please enter a name');
    // TODO: Save name/description/tag to store
    router.push('/data-extension/wizard/attributes');
  };

  return (
    <AppShell breadcrumbs={breadcrumbItems}>
      <WizardLayout
        title="Create a Data Extension"
        steps={wizardSteps}
        currentStep={0}
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Data Extension Name
            </label>
            <input
              type="text"
              value={deName}
              onChange={(e) => setDeName(e.target.value)}
              placeholder="e.g. Lead Form Responses"
              className="w-full px-4 py-2 border rounded-md dark:bg-[#1f1f1f] dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this Data Extension is used for"
              rows={3}
              className="w-full px-4 py-2 border rounded-md dark:bg-[#1f1f1f] dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Tag */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tag <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. onboarding, sales, preference"
              className="w-full px-4 py-2 border rounded-md dark:bg-[#1f1f1f] dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-[#00332D] text-white rounded-md flex items-center gap-2 hover:bg-[#005f4b]"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </WizardLayout>
    </AppShell>
  );
}
