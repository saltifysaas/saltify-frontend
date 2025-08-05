'use client';

import { Dialog } from '@headlessui/react';
import CreateContactPage from './CreateContactPage';

export default function CreateContactModal({
  onClose,
  onSave
}: {
  onClose: () => void;
  onSave?: (contact: any) => void;
}) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl rounded-lg bg-white dark:bg-[#1f1f1f] shadow-xl p-6">
          <CreateContactPage onCancel={onClose} onSave={onSave} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
