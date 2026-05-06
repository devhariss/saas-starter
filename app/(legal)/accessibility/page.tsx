import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'SaasStarter commitment to WCAG 2.2 Level AA accessibility.',
};

export default function AccessibilityPage() {
  return (
    <article
      style={{
        maxWidth: '720px',
        marginInline: 'auto',
        paddingInline: 'var(--space-6)',
        paddingBlock: 'var(--space-24)',
        color: 'var(--color-text)',
        fontSize: 'var(--text-base)',
        lineHeight: 1.8,
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          marginBottom: 'var(--space-2)',
        }}
      >
        Accessibility Statement
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-10)' }}>
        Last reviewed: 1 May 2026
      </p>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Conformance status</h2>
        <p>
          SaasStarter aims to conform to the{' '}
          <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
            Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
          </a>. We are currently <strong>partially conformant</strong> — most features meet AA criteria,
          and we are actively working to address the remaining gaps.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Compatible browsers and assistive technologies</h2>
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li>Google Chrome + NVDA (Windows)</li>
          <li>Mozilla Firefox + NVDA (Windows)</li>
          <li>Apple Safari + VoiceOver (macOS, iOS)</li>
          <li>Microsoft Edge + Narrator (Windows)</li>
          <li>Android Chrome + TalkBack (Android)</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Assessment approach</h2>
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li>Automated scanning with axe-core via Playwright in CI</li>
          <li>Manual keyboard navigation testing on every page</li>
          <li>Screen reader testing with VoiceOver and NVDA</li>
          <li>Lighthouse accessibility audit gate (must score 100)</li>
          <li>Colour contrast verified with both Figma and browser DevTools</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Known limitations</h2>
        <p>
          The Recharts library used for dashboard charts may not expose full ARIA descriptions for all data
          points. We are working on a tabular data fallback for screen reader users.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Feedback and contact</h2>
        <p>
          If you experience any accessibility issues, contact us at{' '}
          <a href="mailto:accessibility@saastarter.dev" style={{ color: 'var(--color-primary)' }}>accessibility@saastarter.dev</a>.
          We aim to acknowledge all reports within 5 business days and resolve them as quickly as possible.
        </p>
      </section>
    </article>
  );
}
