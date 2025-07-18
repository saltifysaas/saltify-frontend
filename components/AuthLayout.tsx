import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cbddd1]">
      <div className="w-[400px] p-6 bg-[#0f2b22] text-[#F9FAFB]">
        {children}
      </div>
    </div>
  );
}
