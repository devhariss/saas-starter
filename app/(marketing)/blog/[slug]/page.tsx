import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

const posts: Record<string, { title: string; content: string; date: string; readingTime: string; category: string }> = {
  'ship-saas-in-days': {
    title: 'Ship your SaaS in days with Next.js 15',
    date: '2026-04-15',
    readingTime: '8 min read',
    category: 'Engineering',
    content: `
      Next.js 15 with the App Router gives you everything you need to ship a production-ready SaaS application quickly.
      The combination of React Server Components, the new metadata API, and first-class TypeScript support means less boilerplate
      and more time spent on your product.

      Start by scaffolding your auth with NextAuth.js v5. The new Auth.js API is cleaner and works seamlessly with the App Router.
      Configure your OAuth providers (Google, GitHub) and add a Resend magic-link provider for passwordless sign-in.

      Next, wire up Stripe. The key insight is that you want to listen to webhook events to keep your local subscription state
      in sync with Stripe\'s source of truth. Set up your webhook handler early and handle: checkout.session.completed,
      customer.subscription.updated, and customer.subscription.deleted.

      For performance, embrace Server Components as the default. Push \'use client\' to the leaves of your component tree.
      Use dynamic imports for heavy client-side libraries like charts.

      The result? A full SaaS with auth, billing, and analytics that scores 100 on Lighthouse out of the box.
    `,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.content.slice(0, 150).trim(),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article
      style={{
        maxWidth: 'var(--content-narrow)',
        marginInline: 'auto',
        paddingInline: 'var(--space-6)',
        paddingBlock: 'var(--space-24)',
      }}
    >
      <header style={{ marginBottom: 'var(--space-10)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 500 }}>
            {post.category}
          </span>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {post.readingTime}
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}
        >
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>
      <div
        style={{
          color: 'var(--color-text)',
          fontSize: 'var(--text-base)',
          lineHeight: 1.8,
          whiteSpace: 'pre-line',
        }}
      >
        {post.content}
      </div>
    </article>
  );
}
