'use client';

export type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
};

export default function ContactDetailClient({ contact }: { contact: Contact }) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">{contact.name}</h1>
        {contact.title || contact.company ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {[contact.title, contact.company].filter(Boolean).join(' • ')}
          </p>
        ) : null}
      </header>

      {/* Meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <dl className="grid grid-cols-3 gap-y-2 text-sm">
            <dt className="text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="col-span-2">{contact.email ?? '—'}</dd>

            <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
            <dd className="col-span-2">{contact.phone ?? '—'}</dd>

            <dt className="text-gray-500 dark:text-gray-400">Location</dt>
            <dd className="col-span-2">{contact.location ?? '—'}</dd>

            <dt className="text-gray-500 dark:text-gray-400">Created</dt>
            <dd className="col-span-2">
              {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : '—'}
            </dd>

            <dt className="text-gray-500 dark:text-gray-400">Updated</dt>
            <dd className="col-span-2">
              {contact.updatedAt ? new Date(contact.updatedAt).toLocaleString() : '—'}
            </dd>
          </dl>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <div className="text-sm font-medium mb-2">Tags</div>
          <div className="flex flex-wrap gap-2">
            {(contact.tags?.length ? contact.tags : ['—']).map((t, i) => (
              <span
                key={`${String(t)}-${i}`}
                className="px-2 py-0.5 text-xs rounded-full border border-gray-200 dark:border-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
