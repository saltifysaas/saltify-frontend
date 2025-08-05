'use client';

import { CheckCircle, Circle } from 'lucide-react';
import clsx from 'clsx';

interface WizardStep {
  label: string;
  key: string;
}

interface WizardProgressBarProps {
  steps: WizardStep[];
  currentStep: number; // index
}

export default function WizardProgressBar({ steps, currentStep }: WizardProgressBarProps) {
  return (
    <div className="w-full flex items-center justify-between border-b pb-4 mb-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={step.key} className="flex-1 flex items-center">
            {/* Step icon and label */}
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  'w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold',
                  isCompleted
                    ? 'bg-green-600 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                )}
              >
                {isCompleted ? <CheckCircle size={18} /> : index + 1}
              </div>
              <span
                className={clsx(
                  'text-sm font-medium',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : isCompleted
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-gray-400 dark:text-gray-500'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-gray-300 dark:bg-gray-600" />
            )}
          </div>
        );
      })}
    </div>
  );
}
