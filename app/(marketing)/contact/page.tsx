import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the SaasStarter team.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          fontWeight: 700,
          marginBottom: "var(--space-4)",
        }}
      >
        Contact us
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-8)" }}>
        Have a question or need help? Reach out and we’ll get back to you within
        one business day.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          padding: "var(--space-6)",
          background: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div>
          <span style={{ fontWeight: 600 }}>General: </span>
          <a href="mailto:hello@saas-starter.dev" style={{ color: "var(--color-primary)" }}>
            hello@saas-starter.dev
          </a>
        </div>
        <div>
          <span style={{ fontWeight: 600 }}>Support: </span>
          <a href="mailto:support@saas-starter.dev" style={{ color: "var(--color-primary)" }}>
            support@saas-starter.dev
          </a>
        </div>
        <div>
          <span style={{ fontWeight: 600 }}>Privacy: </span>
          <a href="mailto:privacy@saas-starter.dev" style={{ color: "var(--color-primary)" }}>
            privacy@saas-starter.dev
          </a>
        </div>
      </div>
    </main>
  );
}
