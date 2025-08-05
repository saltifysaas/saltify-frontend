'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

export default function CreateContactPage({
  onSave,
  onCancel
}: {
  onSave?: (contact: Contact) => void;
  onCancel?: () => void;
}) {
  const [contact, setContact] = useState<Contact>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });

  const handleChange = (key: keyof Contact, value: string) => {
    setContact((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!contact.firstName || !contact.email) {
      alert('First name and email are required');
      return;
    }
    onSave?.(contact);
    onCancel?.();
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold text-[#00332D] dark:text-white">Create New Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="First Name" value={contact.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
        <Input placeholder="Last Name" value={contact.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
        <Input placeholder="Email" value={contact.email} onChange={(e) => handleChange('email', e.target.value)} />
        <Input placeholder="Phone" value={contact.phone} onChange={(e) => handleChange('phone', e.target.value)} />
        <Input placeholder="Company" value={contact.company} onChange={(e) => handleChange('company', e.target.value)} />
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button onClick={handleSubmit}>Create Contact</Button>
      </div>
    </div>
  );
}
