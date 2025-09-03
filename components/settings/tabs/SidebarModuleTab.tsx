'use client';

import React from "react";

export default function SidebarModuleTab() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-3">Modules</h4>
        <div className="text-sm text-muted-foreground">
          Reorder modules, toggle visibility, and configure role access.
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Dashboard", "Contacts", "Data Extensions", "Forms", "AI Agents"].map((m) => (
            <div key={m} className="rounded-md border px-3 py-2 text-sm">{m}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
