'use client';

import React from "react";

export default function HelpPanel({
  summary,
  tabsBarHeight = 58,
}: {
  summary: { title: string; bullets: string[] } | undefined;
  tabsBarHeight?: number;
}) {
  return (
    <div className="h-full min-h-0 flex flex-col">
      {/* Top band (title only, CAPS, muted) */}
      <div
        className="px-4 pt-1 flex flex-col justify-center"
        style={{ height: tabsBarHeight }}
      >
        <h3 className="text-[15px] text-muted-foreground uppercase tracking-wide -mt-1">
          {summary?.title ?? "SETTINGS"}
        </h3>
      </div>

      {/* Body: leave whitespace at bottom so the chat pill never hides content */}
      <div
        className="flex-1 min-h-0 overflow-auto px-4 pt-3 pb-28" // 👈 extra bottom space
        style={{ scrollPaddingBottom: "120px" }}                  // 👈 when jumping to end
      >
        <ul className="list-disc pl-5 space-y-2 text-sm">
          {(summary?.bullets ?? []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {/* Optional spacer for super safety (kept tiny; remove if not needed) */}
        <div aria-hidden className="h-2" />
      </div>
    </div>
  );
}
