'use client';

import AppShell from '@/components/layout/AppShell';

export default function AppShellTestPage() {
  return (
    <AppShell>
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold text-[#00332D] dark:text-white">
          🧪 Testing AppShell
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          If you see the top nav and left nav, your AppShell is rendering correctly.
        </p>
      </div>
    </AppShell>
  );
}
