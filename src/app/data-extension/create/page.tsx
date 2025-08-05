'use client';

import AppShell from '@/components/layout/AppShell';
import CreateDataExtensionPage from '@/components/de/CreateDataExtensionPage';

const breadcrumbItems = [
  { label: 'Data Extensions', href: '/dataextension' },
  { label: 'Create', href: '/dataextension/create' },
];

export default function CreateDataExtensionPageWrapper() {
  return (
    <AppShell breadcrumbs={breadcrumbItems}>
      <CreateDataExtensionPage />
    </AppShell>
  );
}
