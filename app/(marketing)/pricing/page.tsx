import type { Metadata } from 'next';
import { Pricing } from '@/components/marketing/Pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing. Start for free. Upgrade when you need more.',
};

export default function PricingPage() {
  return (
    <section
      style={{
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          marginInline: 'auto',
          paddingInline: 'var(--space-6)',
          textAlign: 'center',
          marginBottom: 'var(--space-16)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Simple, transparent pricing
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-muted)',
            maxWidth: '520px',
            marginInline: 'auto',
          }}
        >
          Start for free. Upgrade when you need more power. Cancel any time, no questions asked.
        </p>
      </div>
      <Pricing />
    </section>
  );
}
