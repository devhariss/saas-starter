import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of SaasStarter.',
};

export default function TermsPage() {
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
        Terms of Service
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-10)' }}>
        Version 1.0 &mdash; Effective date: 1 May 2026
      </p>

      <Section title="1. Acceptance of Terms">
        <p>
          By creating an account or using SaasStarter (&ldquo;the Service&rdquo;), you agree to be bound by
          these Terms of Service. If you do not agree, do not use the Service.
        </p>
      </Section>

      <Section title="2. Account Registration">
        <p>
          You must provide accurate information when creating an account. You are responsible for maintaining
          the security of your credentials and all activity under your account. Notify us immediately at{' '}
          <a href="mailto:security@saastarter.dev" style={{ color: 'var(--color-primary)' }}>security@saastarter.dev</a>{' '}
          of any unauthorised access.
        </p>
      </Section>

      <Section title="3. Acceptable Use">
        <p style={{ marginBottom: 'var(--space-3)' }}>You may not use the Service to:</p>
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li>Violate any applicable law or regulation</li>
          <li>Infringe the intellectual property rights of others</li>
          <li>Transmit malicious code, spam, or phishing content</li>
          <li>Attempt to gain unauthorised access to any system</li>
          <li>Reverse-engineer or resell the Service in an unauthorised manner</li>
        </ul>
      </Section>

      <Section title="4. Subscription and Billing">
        <p>
          Subscriptions are billed in advance on a monthly or annual basis via Stripe. By providing payment
          information, you authorise us to charge the applicable fees. Prices are exclusive of taxes; applicable
          taxes (including GST/VAT) are added at checkout via Stripe Tax.
        </p>
      </Section>

      <Section title="5. Free Trial">
        <p>
          New accounts receive a 14-day free trial of the Pro plan. No credit card is required during the trial.
          At the end of the trial, you will be downgraded to the Free plan unless you subscribe.
        </p>
      </Section>

      <Section title="6. Refund Policy">
        <p>
          If you are not satisfied within the first 30 days of a paid subscription, contact{' '}
          <a href="mailto:hello@saastarter.dev" style={{ color: 'var(--color-primary)' }}>hello@saastarter.dev</a>{' '}
          for a full refund, no questions asked. Refunds after 30 days are at our discretion.
        </p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>
          The Service, including its design, code, and content, is owned by SaasStarter and protected by
          applicable intellectual property laws. You retain ownership of any content you create using the Service.
        </p>
      </Section>

      <Section title="8. User Content Licence">
        <p>
          By submitting content to the Service, you grant SaasStarter a non-exclusive, worldwide, royalty-free
          licence to host and display that content solely for the purpose of providing the Service.
        </p>
      </Section>

      <Section title="9. Disclaimer of Warranties">
        <p>
          THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES,
          EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </Section>

      <Section title="10. Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAASTARTER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, OR CONSEQUENTIAL DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE
          12 MONTHS PRECEDING THE CLAIM.
        </p>
      </Section>

      <Section title="11. Termination">
        <p>
          Either party may terminate the agreement at any time. Upon termination, your access to the Service
          will cease. We will retain your data for 90 days to allow export, then delete it.
        </p>
      </Section>

      <Section title="12. Governing Law and Dispute Resolution">
        <p>
          These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of law
          principles. Any dispute shall first be submitted to mediation. If unresolved, disputes shall be settled
          by binding arbitration under the AAA rules, except that either party may seek injunctive relief in court.
        </p>
      </Section>

      <Section title="13. Entire Agreement">
        <p>
          These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement
          between you and SaasStarter. If any provision is found unenforceable, the remainder shall continue
          in full force.
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
