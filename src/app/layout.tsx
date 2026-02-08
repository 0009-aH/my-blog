import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'My Tech Blog',
    template: '%s | My Tech Blog',
  },
  description: 'A personal technical blog built with Next.js and MDX. Sharing thoughts on web development, design, and technology.',
  openGraph: {
    title: 'My Tech Blog',
    description: 'A personal technical blog built with Next.js and MDX.',
    url: 'https://my-tech-blog.com',
    siteName: 'My Tech Blog',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Tech Blog',
    description: 'A personal technical blog built with Next.js and MDX.',
    creator: '@my-tech-blog', // Replace with actual handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
