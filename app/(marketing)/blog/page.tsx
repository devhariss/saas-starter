import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on building SaaS products with Next.js, TypeScript, and modern tooling.",
};

export const revalidate = 86400;

const posts = [
  {
    slug: "nextjs-15-app-router-patterns",
    title: "Next.js 15 App Router patterns every SaaS developer should know",
    excerpt: "Server components, parallel routes, intercepting routes, and how to use them in a real SaaS product.",
    date: "May 1, 2026",
    readTime: "8 min read",
  },
  {
    slug: "stripe-webhooks-nextjs",
    title: "Stripe webhooks in Next.js: the complete guide",
    excerpt: "Handle every Stripe event correctly, avoid duplicate processing, and keep your subscription state in sync.",
    date: "April 20, 2026",
    readTime: "10 min read",
  },
  {
    slug: "gdpr-saas-checklist-2026",
    title: "The 2026 GDPR + CCPA compliance checklist for SaaS founders",
    excerpt: "What you actually need to implement to be compliant — without a $10k legal bill.",
    date: "April 10, 2026",
    readTime: "12 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          fontWeight: 700,
          marginBottom: "var(--space-12)",
        }}
      >
        Blog
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              paddingBottom: "var(--space-8)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 600,
                  marginBottom: "var(--space-2)",
                  color: "var(--color-text)",
                  transition: "color var(--transition-interactive)",
                }}
              >
                {post.title}
              </h2>
            </Link>
            <p
              style={{
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-3)",
                fontSize: "var(--text-sm)",
              }}
            >
              {post.excerpt}
            </p>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
              {post.date} · {post.readTime}
            </span>
          </article>
        ))}
      </div>
    </main>
  );
}
