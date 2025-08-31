// src/app/contact/[id]/page.tsx
import AppShell from '@/components/layout/AppShell';
import ContactDetailClient from '@/components/contact/ContactDetailClient';
// import { notFound } from 'next/navigation'; // optional

// Replace with real DB/Supabase fetch
async function getContact(id: string) {
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-0101',
    company: 'Acme Inc.',
    title: 'Senior Manager',
    location: 'New York, USA',
    createdAt: '2024-12-01T10:30:00.000Z',
    updatedAt: '2025-02-20T08:12:00.000Z',
    tags: ['Prospect', 'Newsletter'],
  };
}

// Server Component by default
export default async function ContactRecordPage({
  params,
}: {
  // NOTE: params is a Promise in your generated types
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;           // ✅ await params
  const contact = await getContact(id);

  // if (!contact) return notFound();

  return (
    <AppShell>
      <ContactDetailClient contact={contact} />
    </AppShell>
  );
}
