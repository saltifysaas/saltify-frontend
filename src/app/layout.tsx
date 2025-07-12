import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SALTify",
  description: "AI Commerce SaaS Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-background text-foreground">
        <nav className="p-4 bg-background border-b flex gap-6">
          <Link href="/account-management/register" className="hover:underline">
            Register
          </Link>
          <Link href="/account-management/login" className="hover:underline">
            Login
          </Link>
          <Link href="/account-management/reset-passcode" className="hover:underline">
            Reset Passcode
          </Link>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
