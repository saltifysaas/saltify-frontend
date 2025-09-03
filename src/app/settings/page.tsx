'use client';

import React from 'react';
import SettingsShell from '@/components/layout/SettingsShell';
import SettingsClient from '@/components/settings/SettingsClient';

export default function SettingsPage() {
  const [summary, setSummary] = React.useState<{ title: string; bullets: string[] }>();
  const [tabsH, setTabsH] = React.useState(48); // measured from SettingsClient

  return (
    <SettingsShell summary={summary} tabsBarHeight={tabsH}>
      <SettingsClient
        onSummaryChange={setSummary}
        onTabsBarHeightChange={setTabsH}
      />
    </SettingsShell>
  );
}
