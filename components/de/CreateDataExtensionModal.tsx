'use client';

import { Dialog } from '@headlessui/react'; // or your own modal component
import CreateDataExtensionPage from './CreateDataExtensionPage';

export default function CreateDataExtensionModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl rounded-lg shadow-lg bg-white dark:bg-[#1f1f1f]">
          <CreateDataExtensionPage onClose={onClose} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
