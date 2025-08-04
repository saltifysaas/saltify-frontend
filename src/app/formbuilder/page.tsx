'use client';

import FieldPalette from '@/components/forms/FieldPalette';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import TopNavigationBar from '@/components/navigation/TopNavigationBar';

export default function FormBuilderPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState<'drag' | 'code'>('drag'); // ✅ ADD THIS LINE

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={clsx(
      "min-h-screen flex flex-col font-sans",
      darkMode ? "bg-[#1F1F1F] text-white" : "bg-[#F9FAFB] text-[#00332D]"
    )}>
      <TopNavigationBar />

      {/* 🧩 Builder Body */}
      <div className="flex flex-1 gap-[1px] px-2 pb-2">
        {/* Left: Field Palette */}
        <div className={clsx(
          "w-[250px] rounded-md border overflow-y-auto",
          darkMode ? "bg-[#1A1A1A] border-gray-700" : "bg-white border-gray-200"
        )}>
          <FieldPalette />
        </div>

        {/* Center: Canvas or Code */}
        <div className={clsx(
          "flex-1 p-6 overflow-y-auto rounded-md border",
          darkMode ? "bg-[#1a1a1a] border-gray-700" : "bg-[#f3f4f6] border-gray-200"
        )}>
          {mode === 'drag' ? (
            <div className="h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Drag fields here to build your form
              </p>
            </div>
          ) : (
            <div className="h-full bg-black text-green-300 p-4 rounded-lg font-mono text-sm">
              <pre>
{`// SaltScript mode
export default function MyForm() {
  return (
    <form>
      {/* Your JSX + Tailwind form goes here */}
    </form>
  )
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Right: Inspector Panel */}
        <div className={clsx(
          "w-[280px] p-4 rounded-md border",
          darkMode ? "bg-[#1a1a1a] border-gray-700" : "bg-white border-gray-200"
        )}>
          <h2 className="font-semibold mb-2">⚙️ Inspector</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Edit selected field settings
          </p>
        </div>
      </div>

      {/* 🌙 Light/Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className={clsx(
          "fixed bottom-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all flex items-center gap-2",
          darkMode ? "bg-white text-[#00332D]" : "bg-[#00332D] text-white"
        )}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
