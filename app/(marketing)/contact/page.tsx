import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the SaasStarter team.',
};

export default function ContactPage() {
  return (
    <section
      style={{
        maxWidth: '640px',
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
          marginBottom: 'var(--space-4)',
        }}
      >
        Contact
      </h1>
      <p
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-base)',
          marginBottom: 'var(--space-10)',
        }}
      >
        We reply to every email within one business day.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        {[
          { label: 'General enquiries', email: 'hello@saastarter.dev' },
          { label: 'Privacy / GDPR', email: 'privacy@saastarter.dev' },
          { label: 'Data Protection Officer', email: 'dpo@saastarter.dev' },
          { label: 'Accessibility', email: 'accessibility@saastarter.dev' },
          { label: 'Security', email: 'security@saastarter.dev' },
        ].map(({ label, email }) => (
          <div
            key={email}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-4) var(--space-6)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{label}</span>
            <a
              href={`mailto:${email}`}
              style={{
                color: 'var(--color-primary)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {email}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
