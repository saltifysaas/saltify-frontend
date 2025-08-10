// components/forms/FieldPalette.tsx
'use client';

import { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import {
  ImageIcon,
  Maximize2,
  Minimize2,
  Expand,
  Trash2,
  Share,
  Download,
  CheckCircle,
  X
} from 'lucide-react';
import { useFormBuilderStore } from './useFormBuilderStore';

export default function FieldPalette() {
  const [uploadedLogos, setUploadedLogos] = useState<File[]>([]);
  const [uploadedIcons, setUploadedIcons] = useState<File[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [iconExpanded, setIconExpanded] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const { selectedDE, setSelectedDE, clearSelectedDE } = useFormBuilderStore();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedLogos(prev => [...prev, ...fileArray]);
    }
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedIcons(prev => [...prev, ...fileArray]);
    }
  };

  const handleDelete = (url: string) => {
    setUploadedLogos(prev => prev.filter(f => URL.createObjectURL(f) !== url));
    setUploadedIcons(prev => prev.filter(f => URL.createObjectURL(f) !== url));
    setPreviewLogo(null);
  };

  return (
    <div className="transition-all overflow-hidden z-20 w-[250px] p-2 rounded-md bg-white dark:bg-[#1A1A1A]">

      {/* 📁 Data Extension Selector */}
      <div className="mb-4 p-3 rounded-md border border-[#00332D] bg-white dark:bg-[#111827]">
        {selectedDE ? (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Selected Data Extension</p>
              <p className="text-sm font-medium text-[#00332D] dark:text-white">{selectedDE.name}</p>
            </div>
            <button
              onClick={() => clearSelectedDE()}
              className="text-xs text-[#00332D] dark:text-blue-300 hover:underline"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">No Data Extension selected</p>
            <button
              onClick={() => {
                setSelectedDE({
                  id: 'mock-de-1',
                  name: 'Lead Capture DE',
                  attributes: [
                    { id: '1', name: 'first_name', type: 'text' },
                    { id: '2', name: 'email', type: 'email' },
                  ],
                });
              }}
              className="text-xs px-2 py-1 bg-[#00332D] text-white rounded hover:bg-[#004d40]"
            >
              Select
            </button>
          </div>
        )}
      </div>

      {/* 📦 Brand Center */}
      <section className="space-y-2">
        <h2 className="text-lg font-bold flex items-center gap-2 text-[#00332D] dark:text-white">
          <ImageIcon className="w-5 h-5" />
          Brand Center
        </h2>

        {/* My Logos */}
        <div className="relative border rounded-md pt-3 pb-3 px-3 border-[#00332D] dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-[#00332D] dark:text-white">My Logos</p>
            <button
              onClick={() => {
                if (uploadedLogos.length >= 8) setExpanded(!expanded);
              }}
            >
              {expanded ? (
                <Minimize2 className="w-4 h-4 text-black dark:text-white" />
              ) : (
                <Maximize2 className="w-4 h-4 text-black dark:text-white" />
              )}
            </button>
          </div>

          <div
            className={clsx(
              "grid grid-cols-4 gap-x-2 gap-y-2 overflow-y-auto pr-1 transition-all",
              expanded ? "gap-y-2 max-h-[500px] h-auto" : "gap-y-2 h-[100px]"
            )}
          >
            <label className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-md border border-[#00332D] text-[#00332D] text-md font-medium hover:bg-gray-100 dark:hover:bg-[#1F1F1F] dark:border-[#f1f1f1] dark:text-white transition-all">
              +add
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleLogoUpload}
              />
            </label>

            {uploadedLogos.map((logo, index) => {
              const logoUrl = URL.createObjectURL(logo);
              return (
                <div
                  key={index}
                  className="relative w-12 h-12 p-2 rounded-md overflow-visible bg-white flex items-center justify-center border border-gray-300 dark:border-gray-600 group hover:ring-2 hover:ring-blue-500"
                >
                  <img
                    src={logoUrl}
                    alt={`Logo ${index + 1}`}
                    className="w-full h-full object-contain"
                    onClick={() => setPreviewLogo(logoUrl)}
                  />

                  <button
                    className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setPreviewLogo(logoUrl)}
                  >
                    <Expand className="w-4 h-4 text-gray-700 dark:text-white" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* My Icons */}
        <div className="relative border rounded-md pt-3 pb-3 px-3 border-[#00332D] dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-[#00332D] dark:text-white">My Icons</p>
            <button
              onClick={() => {
                if (uploadedIcons.length >= 8) setIconExpanded(!iconExpanded);
              }}
            >
              {iconExpanded ? (
                <Minimize2 className="w-4 h-4 text-black dark:text-white" />
              ) : (
                <Maximize2 className="w-4 h-4 text-black dark:text-white" />
              )}
            </button>
          </div>

          <div
            className={clsx(
              "grid grid-cols-4 gap-x-2 gap-y-2 overflow-y-auto pr-1 transition-all",
              iconExpanded ? "gap-y-2 max-h-[500px] h-auto" : "gap-y-2 h-[100px]"
            )}
          >
            <label className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-md border border-[#00332D] text-[#00332D] text-md font-medium hover:bg-gray-100 dark:hover:bg-[#1F1F1F] dark:border-[#f1f1f1] dark:text-white transition-all">
              +add
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleIconUpload}
              />
            </label>

            {uploadedIcons.map((icon, index) => {
              const iconUrl = URL.createObjectURL(icon);
              return (
                <div
                  key={index}
                  className="relative w-12 h-12 p-2 rounded-md overflow-visible bg-white flex items-center justify-center border border-gray-300 dark:border-gray-600 group hover:ring-2 hover:ring-blue-500"
                >
                  <img
                    src={iconUrl}
                    alt={`Icon ${index + 1}`}
                    className="w-full h-full object-contain"
                    onClick={() => setPreviewLogo(iconUrl)}
                  />

                  <button
                    className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setPreviewLogo(iconUrl)}
                  >
                    <Expand className="w-4 h-4 text-gray-700 dark:text-white" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🧩 Form Elements (Draggable) */}
      <section className="mt-6 space-y-2">
        <h2 className="text-lg font-bold text-[#00332D] dark:text-white">Form Elements</h2>

        {[
          { id: 'text', label: 'Text Input' },
          { id: 'email', label: 'Email Field' },
          { id: 'phone', label: 'Phone Number' },
        ].map((field) => (
          <DraggableField key={field.id} field={field} />
        ))}
      </section>

      {/* 🔍 Preview Modal */}
      {previewLogo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-6">
          <div className="relative bg-white dark:bg-[#1A1A1A] p-6 rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto text-center">
            <button
              className="absolute top-2 right-2 text-gray-700 dark:text-white hover:text-red-600"
              onClick={() => setPreviewLogo(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <img src={previewLogo} alt="Preview" className="mx-auto mb-4 max-h-[60vh]" />
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  alert('Logo selected for use!');
                  setPreviewLogo(null);
                }}
              >
                <CheckCircle className="w-4 h-4" />
                Use
              </button>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(previewLogo)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={() => navigator.clipboard.writeText(previewLogo)}
              >
                <Share className="w-4 h-4" />
                Share
              </button>
              <a
                href={previewLogo}
                download
                className="flex items-center gap-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 🧲 Draggable Field Component
function DraggableField({ field }: { field: { id: string; label: string } }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { type: field.id, label: field.label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // ✅ react-dnd ref fix
  const dragRef = useRef<HTMLDivElement | null>(null);
  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className={clsx(
        'cursor-move p-2 rounded-md border text-sm transition-all',
        isDragging ? 'opacity-40' : 'opacity-100',
        'bg-[#f9fafb] dark:bg-[#2a2a2a] border-gray-300 dark:border-gray-700'
      )}
    >
      {field.label}
    </div>
  );
}
