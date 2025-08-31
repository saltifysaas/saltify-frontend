'use client';
import { useEffect, useMemo, useState } from 'react';

function getSubdomainFromLocation() {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  return host.split('.')[0] || '';
}

export default function Onboarding() {
  const sub = useMemo(getSubdomainFromLocation, []);
  const [email, setEmail] = useState(''); // ask user (no session yet pre-verify)
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown]);

  async function resend() {
    if (!email) return alert('Enter your email to resend.');
    try {
      setSending(true);
      const res = await fetch('/api/auth/email/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subdomain: sub }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed to resend');
      setCooldown(60);
      alert('Verification email sent. Check your inbox.');
    } catch (e: any) {
      alert(e.message || 'Could not resend email');
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="max-w-lg mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Welcome to {sub}</h1>
      <p className="text-gray-600">
        We’ve sent a verification link to your email. Please verify to activate your workspace.
      </p>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">Your email</label>
        <input
          className="w-full p-3 rounded-md border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
        <button
          onClick={resend}
          disabled={sending || cooldown > 0}
          className={`inline-flex h-10 px-4 items-center justify-center rounded-md border ${
            sending || cooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend verification email'}
        </button>
      </div>
    </main>
  );
}
