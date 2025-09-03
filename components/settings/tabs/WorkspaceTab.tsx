'use client';

import React, { useMemo, useState } from 'react';
import clsx from 'clsx';

type Region = 'US' | 'EU' | 'MEA' | 'APAC';
type Locale = 'en-US' | 'en-GB' | 'fr-FR' | 'de-DE' | 'es-ES' | 'hi-IN';

type WorkspaceForm = {
  name: string;
  region: Region;
  locale: Locale;
  primaryDomain: string;
  subdomains: string[];
};

const REGIONS: Region[] = ['US', 'EU', 'MEA', 'APAC'];
const LOCALES: Locale[] = ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES', 'hi-IN'];

/** simple domain check (not exhaustive) */
const isDomain = (v: string) =>
  /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(v.trim());

export default function WorkspaceTab() {
  // Pretend we fetched current settings
  const initial: WorkspaceForm = useMemo(
    () => ({
      name: 'Acme HQ',
      region: 'EU',
      locale: 'en-GB',
      primaryDomain: 'acme.com',
      subdomains: ['app.acme.com', 'forms.acme.com'],
    }),
    []
  );

  const [form, setForm] = useState<WorkspaceForm>(initial);
  const [newSub, setNewSub] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(initial), [form, initial]);

  function set<K extends keyof WorkspaceForm>(key: K, v: WorkspaceForm[K]) {
    setForm((f) => ({ ...f, [key]: v }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Workspace name is required.';
    if (!form.region) e.region = 'Region is required.';
    if (!form.locale) e.locale = 'Default locale is required.';

    if (!form.primaryDomain.trim()) e.primaryDomain = 'Primary domain is required.';
    else if (!isDomain(form.primaryDomain)) e.primaryDomain = 'Enter a valid domain (e.g., acme.com).';

    for (const d of form.subdomains) {
      if (!isDomain(d)) {
        e.subdomains = 'One or more subdomains are invalid.';
        break;
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setIsSaving(true);
    // Fake save – replace with a real API call
    // await fetch('/api/settings/workspace', { method:'POST', body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 600));
    setIsSaving(false);
    setSavedAt(Date.now());
  }

  function handleReset() {
    setForm(initial);
    setErrors({});
    setNewSub('');
  }

  function addSub() {
    const v = newSub.trim();
    if (!v) return;
    if (!isDomain(v)) {
      setErrors((e) => ({ ...e, subdomains: 'Enter a valid subdomain (e.g., app.acme.com).' }));
      return;
    }
    if (form.subdomains.includes(v)) {
      setErrors((e) => ({ ...e, subdomains: 'This subdomain already exists.' }));
      return;
    }
    setForm((f) => ({ ...f, subdomains: [...f.subdomains, v] }));
    setNewSub('');
    setErrors((e) => ({ ...e, subdomains: '' }));
  }

  function removeSub(idx: number) {
    setForm((f) => ({ ...f, subdomains: f.subdomains.filter((_, i) => i !== idx) }));
  }

  return (
    <div className="space-y-6 min-w-0">
      {/* GENERAL */}
      <section className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-3">General</h4>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Workspace Name */}
          <label className="text-sm">
            <div className="mb-1 text-muted-foreground">Workspace Name</div>
            <input
              className={clsx(
                'w-full rounded-md border bg-background px-3 py-2 text-sm',
                errors.name && 'border-red-400 focus-visible:outline-red-400'
              )}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Acme HQ"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </label>

          {/* Region */}
          <label className="text-sm">
            <div className="mb-1 text-muted-foreground">Region</div>
            <select
              className={clsx(
                'w-full rounded-md border bg-background px-3 py-2 text-sm',
                errors.region && 'border-red-400 focus-visible:outline-red-400'
              )}
              value={form.region}
              onChange={(e) => set('region', e.target.value as Region)}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.region && <p className="mt-1 text-xs text-red-500">{errors.region}</p>}
          </label>

          {/* Default Locale */}
          <label className="text-sm">
            <div className="mb-1 text-muted-foreground">Default Locale</div>
            <select
              className={clsx(
                'w-full rounded-md border bg-background px-3 py-2 text-sm',
                errors.locale && 'border-red-400 focus-visible:outline-red-400'
              )}
              value={form.locale}
              onChange={(e) => set('locale', e.target.value as Locale)}
            >
              {LOCALES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.locale && <p className="mt-1 text-xs text-red-500">{errors.locale}</p>}
          </label>

          {/* Primary Domain */}
          <label className="text-sm">
            <div className="mb-1 text-muted-foreground">Primary Domain</div>
            <input
              className={clsx(
                'w-full rounded-md border bg-background px-3 py-2 text-sm',
                errors.primaryDomain && 'border-red-400 focus-visible:outline-red-400'
              )}
              value={form.primaryDomain}
              onChange={(e) => set('primaryDomain', e.target.value)}
              placeholder="acme.com"
            />
            {errors.primaryDomain && (
              <p className="mt-1 text-xs text-red-500">{errors.primaryDomain}</p>
            )}
          </label>
        </div>
      </section>

      {/* DOMAINS / SUBDOMAINS */}
      <section className="rounded-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Tenant Domains / Subdomains</h4>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            className={clsx(
              'w-full rounded-md border bg-background px-3 py-2 text-sm',
              errors.subdomains && 'border-red-400 focus-visible:outline-red-400'
            )}
            placeholder="app.acme.com"
            value={newSub}
            onChange={(e) => setNewSub(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSub();
              }
            }}
          />
          <button
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50"
            onClick={addSub}
          >
            Add Subdomain
          </button>
        </div>
        {errors.subdomains && <p className="mt-2 text-xs text-red-500">{errors.subdomains}</p>}

        {form.subdomains.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {form.subdomains.map((d, i) => (
              <li
                key={d + i}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm bg-background"
              >
                <span className="truncate">{d}</span>
                <button
                  onClick={() => removeSub(i)}
                  className="ml-3 rounded-md border px-2 py-1 text-xs hover:bg-muted/50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">No subdomains added yet.</p>
        )}
      </section>

      {/* MEMBERS */}
      <section className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-3">Members & Roles</h4>
        <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50">
          Invite Member
        </button>
      </section>

      {/* STICKY ACTIONS */}
      <div className="sticky bottom-0 left-0 right-0">
        <div className="pointer-events-none relative">
          <div className="pointer-events-auto mx-0 md:mx-1 my-4 flex items-center gap-2 justify-end">
            {savedAt && (
              <span className="text-xs text-muted-foreground mr-auto pl-1">
                Saved {new Date(savedAt).toLocaleTimeString()}
              </span>
            )}

            <button
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50 disabled:opacity-50"
              onClick={handleReset}
              disabled={!dirty || isSaving}
            >
              Reset
            </button>
            <button
              className={clsx(
                'rounded-md border px-3 py-2 text-sm',
                dirty
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-700'
                  : 'hover:bg-muted/50'
              )}
              onClick={handleSave}
              disabled={!dirty || isSaving}
            >
              {isSaving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
