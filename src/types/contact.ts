// src/types/contact.ts
export type ContactId = string;

export interface Contact {
  id?: ContactId;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  tags?: string[];
  notes?: string;
  createdAt?: string; // ISO
  updatedAt?: string; // ISO
}

// Useful when creating a new contact from a form
export type NewContact = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;
