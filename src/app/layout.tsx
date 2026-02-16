import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import SearchProvider from '@/components/SearchProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://my-tech-blog.com'), // Replace with your production URL
  title: {
    default: 'Peng Ji\'s Blog',
    template: '%s | Peng Ji\'s Blog',
  },
  description: 'The personal blog of Peng Ji (0009-aH), sharing thoughts on web development, design, and technology.',
  openGraph: {
    title: 'Peng Ji\'s Blog',
    description: 'The personal blog of Peng Ji (0009-aH).',
    url: 'https://my-tech-blog.com',
    siteName: 'Peng Ji\'s Blog',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peng Ji\'s Blog',
    description: 'The personal blog of Peng Ji (0009-aH).',
    creator: '@0009-aH',
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

import { sanityFetch } from '@/sanity/lib/fetch';
import { SEARCH_POSTS_QUERY } from '@/sanity/lib/queries';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await sanityFetch<any[]>({
    query: SEARCH_POSTS_QUERY,
    tags: ['post'],
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SearchProvider posts={posts}>
            <Header />
            <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
              {children}
            </main>
            <Footer />
          </SearchProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
