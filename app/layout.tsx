import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { DemoBanner } from '@/components/shared/DemoBanner';

export const metadata: Metadata = {
  title: {
    default: 'SaasStarter — Ship your SaaS in days',
    template: '%s | SaasStarter',
  },
  description:
    'Production-ready Next.js 15 SaaS starter. Auth, billing, email, and analytics — all wired up from day one.',
  keywords: ['saas', 'nextjs', 'starter', 'boilerplate', 'stripe', 'prisma', 'auth'],
  authors: [{ name: 'Mohammed Hariss' }],
  creator: 'Mohammed Hariss',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SaasStarter',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@devhariss',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          {/* Demo-mode floating banner — preview branch only */}
          <DemoBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
