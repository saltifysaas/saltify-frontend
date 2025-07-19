"use client";

import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#cbddd1] flex items-center justify-center">
      <div className="w-[500px] p-4 rounded-xl bg-[#0f2b22] text-white">
        {/* Brand Header */}
        <div className="flex justify-center mb-8">
          <Image
            src="/yuvraj/saltify-frontend/public/logo/saltify.png"
            alt="Saltify Logo"
            width={180}
            height={60}
            priority
          />
        </div>

        {children}
      </div>
    </main>
  );
}