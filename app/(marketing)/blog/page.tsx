import type { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on building SaaS products, Next.js, TypeScript, and indie hacking.',
};

const posts = [
  {
    slug: 'ship-saas-in-days',
    title: 'Ship your SaaS in days with Next.js 15',
    excerpt:
      'A step-by-step guide to scaffolding a production-ready SaaS with auth, billing, and analytics in under a week.',
    date: '2026-04-15',
    readingTime: '8 min read',
    category: 'Engineering',
  },
  {
    slug: 'stripe-webhooks-nextjs',
    title: 'Stripe webhooks in Next.js App Router — the right way',
    excerpt:
      'How to handle Stripe webhook events reliably, avoid duplicate processing, and keep your subscription state in sync.',
    date: '2026-03-28',
    readingTime: '6 min read',
    category: 'Billing',
  },
  {
    slug: 'lighthouse-100-nextjs',
    title: 'Getting a 100/100 Lighthouse score in Next.js 15',
    excerpt:
      'Performance, accessibility, best practices, SEO — all four categories maxed out. Here\'s exactly what it takes.',
    date: '2026-03-10',
    readingTime: '12 min read',
    category: 'Performance',
  },
  {
    slug: 'gdpr-saas-checklist',
    title: 'The GDPR/CCPA/DPDPA compliance checklist for SaaS founders',
    excerpt:
      'Legal compliance doesn\'t have to be scary. A practical checklist of what you actually need to implement.',
    date: '2026-02-20',
    readingTime: '10 min read',
    category: 'Compliance',
  },
];

export default function BlogPage() {
  return (
    <section
      style={{
        maxWidth: '960px',
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
        Blog
      </h1>
      <p
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-base)',
          marginBottom: 'var(--space-12)',
        }}
      >
        Insights on building SaaS products, Next.js, TypeScript, and indie hacking.
      </p>
      <div
        style={{
          display: 'grid',
          gap: 'var(--space-6)',
        }}
      >
        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              transition: 'box-shadow var(--transition-interactive)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-3)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                }}
              >
                {post.category}
              </span>
              <span style={{ color: 'var(--color-text-faint)', fontSize: 'var(--text-xs)' }}>·</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                {post.readingTime}
              </span>
              <span style={{ color: 'var(--color-text-faint)', fontSize: 'var(--text-xs)' }}>·</span>
              <time
                dateTime={post.date}
                style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-2)',
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {post.title}
              </Link>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
