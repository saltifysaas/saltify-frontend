'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ModuleKey =
  | 'dashboard'
  | 'landingpages'
  | 'forms'
  | 'ai-agents'
  | 'contacts'
  | 'data-tables'
  | 'segments'
  | 'reports';

type EnabledMap = Record<ModuleKey, boolean>;

const STORAGE_KEY = 'enabledModules';

const DEFAULTS: EnabledMap = {
  dashboard: true,
  landingpages: true,
  forms: true,
  'ai-agents': true,
  contacts: true,
  'data-tables': true,
  segments: true,
  reports: true,
};

type Ctx = {
  enabled: EnabledMap;
  setEnabledFor: (key: ModuleKey, value: boolean) => void;
  setMany: (updates: Partial<EnabledMap>) => void;
  reset: () => void;
};

const C = createContext<Ctx | null>(null);

export function ModuleVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState<EnabledMap>(DEFAULTS);

  // Load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEnabled({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const persist = (next: EnabledMap) => {
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    // notify other open components
    window.dispatchEvent(new CustomEvent('enabledModules:change', { detail: next }));
  };

  // Cross-tab + in-page custom event sync
  useEffect(() => {
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail as EnabledMap | undefined;
      if (detail) setEnabled(detail);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setEnabled({ ...DEFAULTS, ...JSON.parse(e.newValue) });
      }
    };
    window.addEventListener('enabledModules:change', onCustom as EventListener);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('enabledModules:change', onCustom as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const api = useMemo<Ctx>(
    () => ({
      enabled,
      setEnabledFor: (key, value) => persist({ ...enabled, [key]: value }),
      setMany: (updates) => persist({ ...enabled, ...updates }),
      reset: () => persist(DEFAULTS),
    }),
    [enabled]
  );

  return <C.Provider value={api}>{children}</C.Provider>;
}

export function useModuleVisibility() {
  const ctx = useContext(C);
  if (!ctx) throw new Error('useModuleVisibility must be used within ModuleVisibilityProvider');
  return ctx;
}
