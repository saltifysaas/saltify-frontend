'use client';

import { useState } from 'react';
import { Mail, Phone, Edit, Trash2, MoreVertical, Tag, Building2, MapPin, CalendarDays, User } from 'lucide-react';
import clsx from 'clsx';

type Contact = {
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
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'notes'>('overview');

  // ... (keep the same UI code you already have)
  // no `params` usage here
  // no `export default async function` here
  return (
    <div className="flex flex-col gap-3">
      {/* your existing header, tabs, cards */}
    </div>
  );
}
