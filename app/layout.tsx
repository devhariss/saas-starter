import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/compliance/CookieBanner";
import { SkipLink } from "@/components/shared/SkipLink";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "SaasStarter — Ship faster",
    template: "%s | SaasStarter",
  },
  description:
    "Production-ready Next.js 15 SaaS starter with auth, billing, and analytics. Ship in days, not months.",
  keywords: ["saas", "nextjs", "typescript", "tailwind", "starter"],
  authors: [{ name: "SaasStarter" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "SaasStarter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SaasStarter dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@saas_starter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="https://api.fontshare.com/v2/css?f[]=cal-sans@1&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cal-sans@1&display=swap"
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          {children}
          <CookieBanner />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
