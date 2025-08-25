"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

export default function Dashboard() {
  const [currentApp, setCurrentApp] = useState("LeadPages");
  const apps = ["LeadPages", "Forms", "Automations", "Branding"];

  return (
    <div className="min-h-screen bg-white text-[#111827] p-6">
      {/* Top Bar */}
      <div className="flex items-center gap-4">
        {/* App Launcher */}
        <div className="relative group">
          <button className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200">
            <span className="font-medium">Apps</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {/* Dropdown */}
          <div className="absolute z-10 mt-2 hidden group-hover:block bg-white border border-gray-200 shadow-md rounded-md w-48">
            {apps.map((app) => (
              <div
                key={app}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setCurrentApp(app)}
              >
                {app}
              </div>
            ))}
          </div>
        </div>

        {/* Current App Display */}
        <div className="text-lg font-semibold">{currentApp}</div>
      </div>
    </div>
  );
}
