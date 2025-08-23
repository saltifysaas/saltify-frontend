import AppShell from '@/components/layout/AppShell';
import ContactHomeClient from '@/components/contact/ContactHomeClient';

// Server Component
export default async function ContactHomePage() {
  // Example: Server-side data fetching (replace with Supabase/DB call)
  // const contacts = await getContactsFromDB();

  const contacts = [
    { name: 'John Doe', email: 'john@example.com', company: 'Acme Inc.' },
    { name: 'Jane Smith', email: 'jane@example.com', company: 'Globex Corp.' },
  ];

  return (
    <AppShell>
      <ContactHomeClient data={contacts} />
    </AppShell>
  );
}