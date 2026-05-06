import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { SocialProof } from '@/components/marketing/SocialProof';
import { Pricing } from '@/components/marketing/Pricing';
import { FAQ } from '@/components/marketing/FAQ';
import { CTA } from '@/components/marketing/CTA';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'SaasStarter — Ship your SaaS in days, not months',
  description:
    'A production-ready Next.js 15 starter with auth, billing, and analytics wired up. Delete what you don\'t need.',
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'SaasStarter',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description:
            'Production-ready Next.js 15 SaaS starter with auth, billing, Lighthouse 100, GDPR compliant.',
        }}
      />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
