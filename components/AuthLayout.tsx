import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Saltify",
  description: "Multi-tenant CRM SaaS",
  icons: {
    icon: "/favicon.svg", // <<== use your SVG favicon here
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
