import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Saltify",
  description: "AI Commerce SaaS Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#111827] text-[#F9FAFB]">
        {children}
      </body>
    </html>
  );
}
