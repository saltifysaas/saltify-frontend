import Link from "next/link";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  variant?: "login" | "register";
};

export default function AuthLayout({ children, variant = "register" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-light font-sans px-4">
      <div className={`w-full ${variant === "login" ? "max-w-md" : "max-w-lg"} p-8 bg-accent rounded-xl shadow-lg space-y-6`}>
        <div className="flex justify-center mb-4">
          <Link
            href="/"
            className="text-3xl font-extrabold text-highlight tracking-wide"
          >
            SALTify
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
