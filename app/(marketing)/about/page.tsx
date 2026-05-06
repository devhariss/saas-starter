import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the team behind SaasStarter.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          fontWeight: 700,
          marginBottom: "var(--space-6)",
        }}
      >
        About SaasStarter
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          color: "var(--color-text-muted)",
          lineHeight: 1.8,
        }}
      >
        <p>
          SaasStarter was built by developers who were tired of spending the first
          two weeks of every new SaaS project wiring up auth, billing, and
          compliance from scratch.
        </p>
        <p>
          We believe the interesting work starts after the boilerplate is done.
          SaasStarter gives you a production-ready foundation so you can focus on
          what makes your product unique.
        </p>
        <p>
          Built with Next.js 15, TypeScript, Tailwind CSS, NextAuth v5, Prisma,
          and Stripe — the stack that powers the best SaaS products in 2026.
        </p>
      </div>
    </main>
  );
}
