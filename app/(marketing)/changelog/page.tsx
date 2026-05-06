import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What’s new in SaasStarter.",
};

const entries = [
  {
    version: "v1.0.0",
    date: "May 2026",
    highlights: [
      "Initial public release",
      "NextAuth v5 with Google, GitHub, and magic link",
      "Stripe subscriptions + billing portal",
      "GDPR / CCPA / DPDPA compliant cookie consent",
      "Lighthouse 100 target configuration",
      "Full Prisma schema with seed data",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          fontWeight: 700,
          marginBottom: "var(--space-12)",
        }}
      >
        Changelog
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
        {entries.map((entry) => (
          <div key={entry.version}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 700,
                }}
              >
                {entry.version}
              </span>
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-faint)",
                }}
              >
                {entry.date}
              </span>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {entry.highlights.map((h) => (
                <li
                  key={h}
                  style={{
                    color: "var(--color-text-muted)",
                    paddingLeft: "var(--space-4)",
                    position: "relative",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--color-primary)",
                    }}
                  >
                    •
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
