// src/app/profile/page.tsx
import AppShell from '@/components/layout/AppShell';
import ProfileScreen from '@/components/profile/ProfileScreen';

export const dynamic = 'force-static'; // optional; keeps SSR stable for this page

export default function ProfilePage() {
  return (
    <AppShell>
      {/* keep spacing inside the shell, not outside it */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-6 py-4 md:py-6">
        <ProfileScreen userId={null} />
      </div>
    </AppShell>
  );
}
