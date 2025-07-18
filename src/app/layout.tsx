import "./globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Saltify",
  description: "AI Commerce SaaS Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} font-ubuntu bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
