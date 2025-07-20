import "./globals.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Register - Saltify",
  description: "Register for Saltify",
  icons: {
    icon: "/favicon.ico", // change to .png/.svg if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
