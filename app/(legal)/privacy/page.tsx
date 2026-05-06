import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How SaasStarter collects, uses, and protects your personal data.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-10)' }}>
        Version 1.0 &mdash; Effective date: 1 May 2026
      </p>

      <Section title="1. Who we are">
        <p>
          SaasStarter (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a software company providing a
          production-ready SaaS starter kit. Our registered address and Data Protection Officer (DPO) can be
          contacted at <a href="mailto:dpo@saastarter.dev" style={{ color: 'var(--color-primary)' }}>dpo@saastarter.dev</a>.
        </p>
      </Section>

      <Section title="2. Data we collect">
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li><strong>Account data:</strong> name, email address, profile image (from OAuth provider).</li>
          <li><strong>Usage data:</strong> pages visited, features used, session duration (analytics — only with consent).</li>
          <li><strong>Payment data:</strong> billing address, invoice history. Card numbers are processed exclusively by Stripe &mdash; we never store them.</li>
          <li><strong>Technical data:</strong> IP address, browser type, device type, referring URL.</li>
          <li><strong>Communication data:</strong> emails you send us and support tickets.</li>
        </ul>
      </Section>

      <Section title="3. Legal basis for processing (GDPR Art. 6)">
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li><strong>Contract (Art. 6(1)(b)):</strong> account data and payment data — necessary to provide the service.</li>
          <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> technical data for security and fraud prevention.</li>
          <li><strong>Consent (Art. 6(1)(a)):</strong> analytics and marketing cookies — only after you opt in via our cookie banner.</li>
          <li><strong>Legal obligation (Art. 6(1)(c)):</strong> invoices and tax records retained for statutory periods.</li>
        </ul>
      </Section>

      <Section title="4. How we use your data">
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li>Delivering and improving the service</li>
          <li>Processing payments and managing subscriptions (Stripe)</li>
          <li>Sending transactional emails: welcome, invoices, password reset (Resend)</li>
          <li>Security monitoring and fraud detection</li>
          <li>Analytics — only when you have consented</li>
        </ul>
      </Section>

      <Section title="5. Data sharing">
        <p style={{ marginBottom: 'var(--space-4)' }}>We share your data only with the following sub-processors:</p>
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li><strong>Stripe</strong> — payment processing. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>DPA</a></li>
          <li><strong>Resend</strong> — transactional email. <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Privacy policy</a></li>
          <li><strong>Vercel</strong> — hosting and edge functions. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>DPA</a></li>
          <li><strong>Neon</strong> — PostgreSQL database. <a href="https://neon.tech/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Privacy policy</a></li>
        </ul>
        <p style={{ marginTop: 'var(--space-4)' }}>We do not sell your personal data to any third party.</p>
      </Section>

      <Section title="6. Data retention">
        <p>
          Account data is retained for the duration of your contract and deleted within 90 days of your account
          deletion request. Audit logs are retained for 2 years for security purposes. Tax records are retained
          for the period required by applicable law (typically 7 years).
        </p>
      </Section>

      <Section title="7. Your rights (GDPR)">
        <p style={{ marginBottom: 'var(--space-3)' }}>Under GDPR you have the right to:</p>
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li><strong>Access</strong> — request a copy of your data</li>
          <li><strong>Rectification</strong> — correct inaccurate data</li>
          <li><strong>Erasure</strong> — &ldquo;right to be forgotten&rdquo;</li>
          <li><strong>Portability</strong> — receive your data in machine-readable format</li>
          <li><strong>Restriction</strong> — limit how we process your data</li>
          <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
          <li><strong>Automated decision-making</strong> — right not to be subject to solely automated decisions</li>
        </ul>
        <p style={{ marginTop: 'var(--space-4)' }}>
          Exercise these rights at <strong>Settings &rarr; Privacy</strong> in the app, or by emailing{' '}
          <a href="mailto:privacy@saastarter.dev" style={{ color: 'var(--color-primary)' }}>privacy@saastarter.dev</a>.
          We respond within 30 days.
        </p>
      </Section>

      <Section title="8. CCPA rights (California)">
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li>Right to know what personal information we collect</li>
          <li>Right to delete your personal information</li>
          <li>Right to opt-out of sale of personal information (<strong>we do not sell personal data</strong>)</li>
          <li>Right to non-discrimination for exercising your rights</li>
        </ul>
      </Section>

      <Section title="9. DPDPA 2023 (India)">
        <p>
          Under the Digital Personal Data Protection Act 2023, you may withdraw consent at any time via
          <strong> Settings &rarr; Privacy</strong>. Grievance Officer:{' '}
          <a href="mailto:grievance@saastarter.dev" style={{ color: 'var(--color-primary)' }}>grievance@saastarter.dev</a>.
          Complaints must be acknowledged within 48 hours and resolved within 30 days.
        </p>
      </Section>

      <Section title="10. Cookies">
        <p>
          We use essential cookies required for the service to function, and optional analytics and functional
          cookies with your consent. See our{' '}
          <a href="/cookies" style={{ color: 'var(--color-primary)' }}>Cookie Policy</a> for the full inventory.
        </p>
      </Section>

      <Section title="11. International data transfers">
        <p>
          Your data may be transferred to and processed in the United States. We rely on the EU-US Data Privacy
          Framework and Standard Contractual Clauses (SCCs) as the legal basis for such transfers. A copy of the
          SCCs is available on request.
        </p>
      </Section>

      <Section title="12. Changes to this policy">
        <p>
          We will notify you of material changes by email and by posting a notice in the app at least 30 days
          before the change takes effect. Continued use of the service after the effective date constitutes
          acceptance.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          Data Protection Officer:{' '}
          <a href="mailto:dpo@saastarter.dev" style={{ color: 'var(--color-primary)' }}>dpo@saastarter.dev</a>.<br />
          You also have the right to lodge a complaint with your local data protection authority.
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 'var(--space-10)' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
