'use client';

import React from "react";

export default function AppearanceTab() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-3">Theme</h4>
        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50">Dark</button>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50">Light</button>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50">System</button>
        </div>
      </section>

      <section className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-3">Accent & Density</h4>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            <div className="mb-1 text-muted-foreground">Accent</div>
            <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="#3B82F6" />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-muted-foreground">Density</div>
            <select className="w-full rounded-md border bg-background px-3 py-2 text-sm">
              <option>Comfortable</option>
              <option>Compact</option>
              <option>Spacious</option>
            </select>
          </label>
        </div>
      </section>
    </div>
  );
}
