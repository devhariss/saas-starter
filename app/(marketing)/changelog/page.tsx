import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'What\'s new in SaasStarter. Feature releases, bug fixes, and improvements.',
};

const entries = [
  {
    version: 'v1.0.0',
    date: '2026-05-01',
    type: 'release' as const,
    changes: [
      { type: 'new', text: 'Initial public release with Next.js 15, Auth.js v5, Stripe billing' },
      { type: 'new', text: 'GDPR/CCPA/DPDPA/EAA compliance baked in' },
      { type: 'new', text: 'Lighthouse 100 score out of the box' },
      { type: 'new', text: 'Dark-first design system with OKLCH color tokens' },
      { type: 'new', text: 'Prisma ORM + PostgreSQL schema with seed data' },
      { type: 'new', text: 'GitHub Actions CI with Lighthouse gate' },
    ],
  },
];

const typeLabel = { new: 'New', fix: 'Fix', improved: 'Improved', breaking: 'Breaking' };
const typeColor = {
  new: 'var(--color-success)',
  fix: 'var(--color-error)',
  improved: 'var(--color-primary)',
  breaking: 'var(--color-warning)',
};

export default function ChangelogPage() {
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
          marginBottom: 'var(--space-4)',
        }}
      >
        Changelog
      </h1>
      <p
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-base)',
          marginBottom: 'var(--space-12)',
        }}
      >
        Every release, documented.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        {entries.map((entry) => (
          <div key={entry.version}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                }}
              >
                {entry.version}
              </h2>
              <time
                dateTime={entry.date}
                style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}
              >
                {new Date(entry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', listStyle: 'none', padding: 0 }}>
              {entry.changes.map((change, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: typeColor[change.type as keyof typeof typeColor],
                      minWidth: '64px',
                      paddingTop: '2px',
                    }}
                  >
                    {typeLabel[change.type as keyof typeof typeLabel]}
                  </span>
                  <span>{change.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
