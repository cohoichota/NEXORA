import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nexora — Your Premium Marketplace',
    template: '%s | Nexora',
  },
  description:
    'Discover millions of products from trusted sellers. Fast shipping, secure payments, and an unbeatable shopping experience.',
  keywords: ['ecommerce', 'shopping', 'marketplace', 'online store', 'nexora'],
  authors: [{ name: 'Nexora Team' }],
  creator: 'Nexora',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexora.dev',
    siteName: 'Nexora',
    title: 'Nexora — Your Premium Marketplace',
    description: 'Discover millions of products from trusted sellers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexora — Your Premium Marketplace',
    creator: '@nexora',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
              style: { fontFamily: 'var(--font-inter)' },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
