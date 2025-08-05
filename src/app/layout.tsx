import './globals.css';
import { Ubuntu } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import LayoutClient from './LayoutClient';

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Register - Saltify',
  description: 'Register for Saltify',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ubuntu.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LayoutClient>{children}</LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
