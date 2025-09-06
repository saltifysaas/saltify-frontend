'use client';

import AutomationLoadingPage from '@/components/automation/AutomationLoadingPage';

export default function Loading() {
  return (
    <AutomationLoadingPage
      title="Loading contacts"
      subtitle="Fetching profiles, preferences & segments…"
      steps={['Bootstrapping', 'Validating schema', 'Fetching records', 'Indexing', 'Ready']}
      auto
    />
  );
}
