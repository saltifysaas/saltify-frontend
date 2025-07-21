import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
 return (
  <main className="min-h-screen flex items-center justify-center bg-[#111827] text-[#F9FAFB] font-sans">
    <div className="w-full max-w-md p-8 bg-[#1F2937] rounded-xl shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <Link href="/" className="text-2xl font-bold text-[#3B82F6]">Saltify</Link>
      </div>

      {children}
    </div>
  </main>
);
}