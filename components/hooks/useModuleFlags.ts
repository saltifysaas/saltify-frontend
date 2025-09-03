'use client';

import { useEffect, useMemo, useState } from 'react';

export type EnabledMap = Record<string, boolean>;
export const ENABLED_STORAGE_KEY = 'enabledModules';

// Defaults: show all until user hides
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

export function readEnabledModules(): EnabledMap {
  try {
    const raw = localStorage.getItem(ENABLED_STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

/**
 * Write + broadcast (instant same-tab updates).
 * Use this in your Settings toggles instead of direct localStorage.setItem.
 */
export function writeEnabledModules(
  updates:
    | Partial<EnabledMap>
    | ((prev: EnabledMap) => Partial<EnabledMap>),
  opts?: { replace?: boolean }
): EnabledMap {
  const prev = readEnabledModules();
  const delta = typeof updates === 'function' ? updates(prev) : updates;
  const next = opts?.replace ? { ...DEFAULTS, ...delta } : { ...prev, ...delta };

  try {
    localStorage.setItem(ENABLED_STORAGE_KEY, JSON.stringify(next));
  } catch {}
  // same-tab instant notify
  window.dispatchEvent(new CustomEvent('enabledModules:change', { detail: next }));
  return next;
}

export function resetEnabledModules(): EnabledMap {
  return writeEnabledModules(DEFAULTS, { replace: true });
}

/**
 * Hook used by LeftNavigationBar (returns { map } for backward-compat).
 * It reacts to both the custom event and to cross-tab storage changes.
 */
export function useModuleFlags() {
  const [map, setMap] = useState<EnabledMap>(DEFAULTS);

  // initial load
  useEffect(() => {
    setMap(readEnabledModules());
  }, []);

  // subscribe to same-tab custom event + cross-tab storage
  useEffect(() => {
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail as EnabledMap | undefined;
      if (detail) setMap(detail);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === ENABLED_STORAGE_KEY && e.newValue) {
        try {
          setMap({ ...DEFAULTS, ...JSON.parse(e.newValue) });
        } catch {}
      }
    };
    window.addEventListener('enabledModules:change', onCustom as EventListener);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('enabledModules:change', onCustom as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Optional setters if you ever want them in UI
  const api = useMemo(
    () => ({
      map,
      setOne: (key: string, value: boolean) =>
        setMap(writeEnabledModules({ [key]: value })),
      setMany: (updates: Partial<EnabledMap>) =>
        setMap(writeEnabledModules(updates)),
      reset: () => setMap(resetEnabledModules()),
    }),
    [map]
  );

  return api;
}
