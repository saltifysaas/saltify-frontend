'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );

  const pathLinks = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/').toLowerCase().replace(/\s+/g, '-');
    return { label: seg, href };
  });

  return (
    <nav className="text-sm text-blue-600 font-normal mb-6">
      {pathLinks.map((segment, idx) => (
        <span key={idx} className="inline">
          {idx < pathLinks.length - 1 ? (
            <>
              <Link href={segment.href} className="hover:underline">
                {segment.label}
              </Link>{' '}
              ›{' '}
            </>
          ) : (
            <span className="text-[#00332D] dark:text-white">{segment.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
