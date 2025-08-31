'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import WizardProgressBar from './WizardProgressBar';

interface WizardStep {
  label: string;
  key: string;
}

interface WizardLayoutProps {
  title: string;
  onCancel?: () => void;
  children: React.ReactNode;
  className?: string;
  steps: WizardStep[];
  currentStep: number;
  breadcrumbs?: React.ReactNode;
}

export default function WizardLayout({
  title,
  onCancel,
  children,
  className,
  steps,
  currentStep,
  breadcrumbs,
}: WizardLayoutProps) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f] px-4 pt-4">
      <div className="flex gap-[1px]">
        {/* Left Nav */}
        <div className="hidden md:block">
          {/* TODO: Replace with actual LeftNavigationBar */}
        </div>

        <main className="w-full max-w-6xl mx-auto">
          {/* Top Navigation */}
          <div className="mb-1">
            {/* TODO: Replace with actual TopNavigationBar */}
          </div>

          {/* Breadcrumb */}
          {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}

          {/* Main Wizard Box */}
          <div
            className={clsx(
              'bg-white dark:bg-[#111827] rounded-2xl shadow-md border p-6 space-y-4',
              className
            )}
          >
            {/* Header + Cancel */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-[#00332D] dark:text-white">
                {title}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-red-600"
                aria-label="Cancel Wizard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <WizardProgressBar steps={steps} currentStep={currentStep} />

            {/* Step Content */}
            <div>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
