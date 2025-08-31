"use client";

import BuilderCanvas from "@/components/canvas/BuilderCanvas";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function CanvasPage() {
  return (
    <main className="min-h-screen w-full bg-lightBase text-textLight dark:bg-darkBase dark:text-textDark relative">
      <BuilderCanvas />

      {/* 🌗 Dark Mode Toggle — fixed bottom-right */}
      <div className="fixed bottom-4 right-4 z-50">
        <DarkModeToggle />
      </div>
    </main>
  );
}
