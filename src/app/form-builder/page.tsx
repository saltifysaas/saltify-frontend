// src/app/form-builder/page.tsx
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';

export const metadata = { title: 'Form Builder — Saltify' };

export default function FormBuilderPage() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Form Builder
          </h1>

          <div className="flex items-center gap-2">
            <Link
              href="/forms/create"
              className="rounded-xl px-3.5 py-2 text-sm font-medium bg-[#3B82F6] text-white hover:opacity-90"
            >
              Create Form
            </Link>
            <Link
              href="/forms/import"
              className="rounded-xl px-3.5 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#0f1220]"
            >
              Import
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Palette */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] p-3 md:p-4">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Field Palette</div>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>Text</li>
              <li>Email</li>
              <li>Phone</li>
              <li>Button</li>
              <li>Image</li>
            </ul>
          </aside>

          {/* Canvas */}
          <main className="col-span-12 md:col-span-6 lg:col-span-7 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f1220] h-[72vh] flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Drop fields here
          </main>

          {/* Inspector */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] p-3 md:p-4">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Properties</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Select a field to edit.</div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
