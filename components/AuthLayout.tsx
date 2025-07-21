import Link from "next/link";

import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#cbddd1] flex items-center justify-center">
      <div className="w-[450px] p-8 rounded-md bg-[#ffffff] text-[#00380e]">
        {/* Brand Header */}
        <div className="flex justify-center mb-2">
          <Image
            src="/logo/logo-green.svg"
            alt="Saltify Logo"
            width={180}
            height={45.778}
            priority
          />
        </div>

        {children}
      </div>
    </main>
  );
}