// components/de/CreateDataExtensionModal.tsx
'use client';

import { useState } from 'react';
import { Plus, X, Save, User } from 'lucide-react';

interface Attribute {
  id: string;
  name: string;
  type: string;
  required: boolean;
  unique: boolean;
  contactAttribute: string;
}

export default function CreateDataExtensionModal({ onClose }: { onClose: () => void }) {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [deName, setDeName] = useState('');
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [customContactName, setCustomContactName] = useState('');
  const [contactAttributes, setContactAttributes] = useState<string[]>([
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Company',
    'Custom...'
  ]);

  const addAttribute = () => {
    setAttributes((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: '',
        type: 'text',
        required: false,
        unique: false,
        contactAttribute: ''
      }
    ]);
  };

  const updateAttribute = (id: string, key: keyof Attribute, value: any) => {
    setAttributes((prev) =>
      prev.map((attr) => (attr.id === id ? { ...attr, [key]: value } : attr))
    );
  };

  const handleSaveCustomContact = () => {
    if (customContactName.trim()) {
      const newAttribute = customContactName.trim();
      setContactAttributes((prev) => [
        ...prev.slice(0, -1),
        newAttribute,
        'Custom...'
      ]);
      setShowContactPopup(false);
      setCustomContactName('');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-[#1f1f1f] rounded-xl p-6 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        <h2 className="text-2xl font-semibold text-[#00332D] dark:text-white mb-4">
          Create Data Extension
        </h2>

        <input
          type="text"
          placeholder="Data Extension Name"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#111827] text-black dark:text-white mb-6"
          value={deName}
          onChange={(e) => setDeName(e.target.value)}
        />

        <div className="space-y-4">
          {attributes.map((attr) => (
            <div
              key={attr.id}
              className="p-3 border rounded-md flex flex-col md:flex-row gap-4 md:items-center dark:border-gray-700"
            >
              <input
                type="text"
                placeholder="Attribute Name"
                className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#111827] text-black dark:text-white"
                value={attr.name}
                onChange={(e) => updateAttribute(attr.id, 'name', e.target.value)}
              />

              <select
                className="p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#111827] text-black dark:text-white"
                value={attr.type}
                onChange={(e) => updateAttribute(attr.id, 'type', e.target.value)}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>

              <select
                className="p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#111827] text-black dark:text-white"
                value={attr.contactAttribute}
                onChange={(e) => {
                  const selected = e.target.value;
                  if (selected === 'Custom...') {
                    setShowContactPopup(true);
                  } else {
                    updateAttribute(attr.id, 'contactAttribute', selected);
                  }
                }}
              >
                <option value="">Map to Contact Attribute</option>
                {contactAttributes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-1 text-sm text-[#00332D] dark:text-white">
                <input
                  type="checkbox"
                  checked={attr.required}
                  onChange={(e) => updateAttribute(attr.id, 'required', e.target.checked)}
                />
                Required
              </label>

              <label className="flex items-center gap-1 text-sm text-[#00332D] dark:text-white">
                <input
                  type="checkbox"
                  checked={attr.unique}
                  onChange={(e) => updateAttribute(attr.id, 'unique', e.target.checked)}
                />
                Unique
              </label>
            </div>
          ))}
        </div>

        {showContactPopup && (
          <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white dark:bg-[#111827] rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-3 text-[#00332D] dark:text-white">
                Add Contact Attribute
              </h3>
              <input
                type="text"
                placeholder="Contact Attribute Name"
                value={customContactName}
                onChange={(e) => setCustomContactName(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#1f1f1f] text-black dark:text-white mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                  onClick={() => setShowContactPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-[#00332D] text-white hover:bg-[#004d40]"
                  onClick={handleSaveCustomContact}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={addAttribute}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white"
          >
            <Plus className="w-4 h-4" /> Add Attribute
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[#00332D] text-[#00332D] dark:text-white rounded hover:bg-[#f0f0f0] dark:hover:bg-[#2a2a2a]"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}