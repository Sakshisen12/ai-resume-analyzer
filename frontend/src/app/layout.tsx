import { AuthProvider } from '@/context/AuthContext';
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import '@/app/globals.css';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata = {
  title: 'ResumeAI - Analyzer',
  description: 'AI-powered resume analysis and job matching',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} dark`}>
      <body className="bg-bg-primary text-text-primary min-h-screen font-body antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
