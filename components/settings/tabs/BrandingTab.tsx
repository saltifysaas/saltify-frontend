'use client';

import React from "react";

export default function BrandingTab() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-3">Logos & Icons</h4>
        <button className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50">Upload Logo</button>
      </section>

      <section className="rounded-lg border p-4">
        <h4 className="text-sm font-medium mb-3">Brand Colors</h4>
        <div className="grid gap-3 md:grid-cols-3">
          <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Primary (#00332D)" />
          <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Accent (#3B82F6)" />
          <input className="rounded-md border bg-background px-3 py-2 text-sm" placeholder="Text (#F9FAFB)" />
        </div>
      </section>
    </div>
  );
}
