import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind SaasStarter and why we built it.',
};

export default function AboutPage() {
  return (
    <section
      style={{
        maxWidth: '720px',
        marginInline: 'auto',
        paddingInline: 'var(--space-6)',
        paddingBlock: 'var(--space-24)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-8)',
        }}
      >
        About SaasStarter
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          color: 'var(--color-text)',
          fontSize: 'var(--text-base)',
          lineHeight: 1.8,
        }}
      >
        <p>
          SaasStarter was built because we were tired of spending the first two weeks of every new project
          re-wiring the same infrastructure: auth, billing, email, legal pages, CI pipelines.
          These aren&apos;t differentiators — they&apos;re table stakes.
        </p>
        <p>
          We built the starter we wished existed: a production-ready Next.js 15 codebase with every boring
          thing already done correctly. NextAuth v5 for auth, Stripe for billing, Resend for transactional
          email, Prisma for the database, and a design system that doesn&apos;t look like every other SaaS template.
        </p>
        <p>
          The goal isn&apos;t to be a framework on top of a framework. It&apos;s a starting point you actually
          delete code from, not add to.
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginTop: 'var(--space-4)',
          }}
        >
          Our principles
        </h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingLeft: 'var(--space-6)' }}>
          <li>Production-quality code only. No TODOs, no stubs, no placeholder comments.</li>
          <li>Performance by default. Lighthouse 100 on day one.</li>
          <li>Compliance baked in. GDPR, CCPA, DPDPA, EAA — all handled.</li>
          <li>Delete what you don&apos;t need. The code is yours.</li>
        </ul>
      </div>
    </section>
  );
}
