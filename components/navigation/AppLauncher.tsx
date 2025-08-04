// file: components/navigation/AppLauncher.tsx
"use client";

import {
  Plus,
} from "lucide-react";
import { useState } from "react";

export default function AppLauncher() {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["Create Page", "Responses"]);
  const recent = [
    "Create Page",
    "Responses",
    "Branding",
    "LeadPages",
    "Automations",
    "Settings",
    "Forms",
    "Editor",
    "Overview",
  ];

  const toggleFavorite = (item: string) => {
    setFavorites((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="relative text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 grid place-content-center border border-[#00332d] dark:border-white rounded-md bg-white hover:bg-gray-100 dark:bg-[#1f1f1f]"
      >
        <div className="grid grid-cols-3 grid-rows-3 gap-[2px]">
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#1f1f1f] dark:bg-white"
            />
          ))}
        </div>
      </button>

      {open && (
        <div className="absolute top-12 right-0 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#2c4b41] rounded-md shadow-md z-50 w-48">
          {recent.map((app) => (
            <div
              key={app}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#345a4f] text-[#1f1f1f] dark:text-white cursor-pointer flex justify-between items-center"
              onClick={() => {
                window.location.href = `/${app.toLowerCase().replace(/\s+/g, "-")}`;
                setOpen(false);
              }}
            >
              {app}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(app);
                }}
                className="text-blue-500"
              >
                {favorites.includes(app) ? <span className="text-sm">×</span> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
