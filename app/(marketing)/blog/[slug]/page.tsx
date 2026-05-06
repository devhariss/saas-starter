import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;

const posts: Record<string, { title: string; content: string; date: string }> = {
  "nextjs-15-app-router-patterns": {
    title: "Next.js 15 App Router patterns every SaaS developer should know",
    date: "May 1, 2026",
    content: `Next.js 15 introduced significant improvements to the App Router that make building SaaS products more ergonomic. Here are the patterns you should understand before starting your next project.

## Server Components by default

Every component in the App Router is a Server Component by default. This means zero client-side JavaScript unless you explicitly opt in with \"use client\". For most SaaS pages — dashboards, analytics, billing — the majority of the component tree should be server-rendered.

## Parallel Routes for dashboard layouts

Parallel routes let you render multiple pages simultaneously in the same layout. This is perfect for dashboard sidebars, modals that need their own URL, or split-panel views.`,
  },
  "stripe-webhooks-nextjs": {
    title: "Stripe webhooks in Next.js: the complete guide",
    date: "April 20, 2026",
    content: `Stripe webhooks are the backbone of any subscription billing system. Here’s how to implement them correctly in a Next.js 15 App Router project.

## The webhook handler

Your webhook handler lives at \`/api/stripe/webhook\`. The most critical step is verifying the Stripe signature before processing any event.`,
  },
  "gdpr-saas-checklist-2026": {
    title: "The 2026 GDPR + CCPA compliance checklist for SaaS founders",
    date: "April 10, 2026",
    content: `Compliance doesn’t have to be overwhelming. Here’s the practical checklist for what you actually need to implement.

## Cookie consent

You need a cookie banner that blocks non-essential scripts before consent. The \"Accept All\" and \"Reject All\" buttons must be equally prominent — this is the dark pattern test regulators look for first.`,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return { title: "Not Found" };
  return { title: post.title };
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-24">
      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)", marginBottom: "var(--space-4)" }}>
        {post.date}
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          fontWeight: 700,
          marginBottom: "var(--space-8)",
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </h1>
      <div
        style={{
          color: "var(--color-text-muted)",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
        }}
      >
        {post.content}
      </div>
    </main>
  );
}
