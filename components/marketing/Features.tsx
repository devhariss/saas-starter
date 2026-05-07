"use client";

import React from "react";
import { Zap, Chrome, Github, Mail, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";

/* ─── Shared style tokens ─── */

const S = {
  pill: {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "9999px",
    background: "oklch(0.52 0.22 285 / 0.09)",
    border: "1px solid oklch(0.52 0.22 285 / 0.20)",
    color: "var(--color-primary)",
    fontSize: "10px",
    fontWeight: 700 as const,
    letterSpacing: "0.10em",
    textTransform: "uppercase" as const,
    marginBottom: "1.25rem",
  },
  tag: (accent: string) => ({
    display: "inline-block" as const,
    padding: "3px 10px",
    borderRadius: "9999px",
    fontSize: "10px",
    fontWeight: 700 as const,
    letterSpacing: "0.10em",
    textTransform: "uppercase" as const,
    marginBottom: "1rem",
    background: `${accent.replace(")", " / 0.12)")}`,
    color: accent,
    border: `1px solid ${accent.replace(")", " / 0.28)")}`,
  }),
  card: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "14px",
    boxShadow: "0 4px 20px oklch(0 0 0 / 0.10)",
  } as React.CSSProperties,
  muted: { color: "var(--color-text-muted)" } as React.CSSProperties,
  faint: { color: "var(--color-text-faint)" } as React.CSSProperties,
  text:  { color: "var(--color-text)"       } as React.CSSProperties,
};

/* ─── Dot-grid bg pattern (light & dark) ─── */

const BG_PATTERN       = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff' fill-opacity='0.035'/%3E%3C/svg%3E")`;
const BG_PATTERN_LIGHT = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23000000' fill-opacity='0.04'/%3E%3C/svg%3E")`;

/* ─── AuthVisual ─── */

function AuthVisual() {
  const providers = [
    { name: "Google", Icon: Chrome, bg: "var(--color-surface-2, var(--color-surface))",        label: "Continue with Google", light: false },
    { name: "GitHub", Icon: Github, bg: "oklch(0.18 0.01 285)",                                label: "Continue with GitHub", light: true  },
    { name: "Email",  Icon: Mail,   bg: "var(--color-surface-offset, var(--color-surface))",   label: "Continue with Email",  light: false },
  ];
  return (
    <div style={{ ...S.card, padding: "1.75rem" }}>
      <p style={{ fontSize: "13px", fontWeight: 700, marginBottom: "3px", ...S.text }}>Sign in to Acme</p>
      <p style={{ fontSize: "11px", marginBottom: "1.5rem", ...S.faint }}>Welcome back</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {providers.map((p) => (
          <div
            key={p.name}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 14px", borderRadius: "8px",
              background: p.bg,
              border: "1px solid var(--color-border)",
              fontSize: "12px", fontWeight: 500,
              color: p.light ? "#f1f1f1" : "var(--color-text)",
            }}
          >
            <p.Icon size={14} aria-hidden="true" />
            {p.label}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "1rem 0" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
        <span style={{ fontSize: "10px", ...S.faint }}>or</span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>

      <div style={{
        padding: "9px 14px", borderRadius: "8px",
        background: "var(--color-text)", color: "var(--color-bg)",
        fontSize: "12px", fontWeight: 600, textAlign: "center" as const,
      }}>Create account &rarr;</div>

      <div style={{
        marginTop: "1rem", padding: "8px 12px", borderRadius: "8px",
        background: "oklch(0.52 0.22 285 / 0.10)",
        border: "1px solid oklch(0.52 0.22 285 / 0.20)",
        fontSize: "10px", color: "var(--color-primary)",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <CheckCircle2 size={11} aria-hidden="true" />
        Session stored &middot; Prisma &middot; strategy: database
      </div>
    </div>
  );
}

/* ─── BillingVisual ─── */

function BillingVisual() {
  const events = [
    { label: "checkout.session.completed",    time: "just now", dot: "oklch(0.62 0.16 145)" },
    { label: "invoice.payment_succeeded",      time: "2s ago",   dot: "oklch(0.62 0.20 285)" },
    { label: "customer.subscription.updated", time: "8s ago",   dot: "oklch(0.72 0.18 75)"  },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ ...S.card, padding: "1.25rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: "11px", marginBottom: "4px", ...S.faint }}>Current plan</p>
            <p style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", ...S.text }}>
              $49<span style={{ fontSize: "12px", fontWeight: 400, ...S.muted }}>/mo</span>
            </p>
          </div>
          <span style={{
            padding: "3px 10px", borderRadius: "9999px",
            background: "oklch(0.52 0.22 285 / 0.12)",
            color: "var(--color-primary)",
            fontSize: "10px", fontWeight: 700,
          }}>Pro</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
          {[{ label: "Seats", val: "5" }, { label: "Storage", val: "50 GB" }].map((m) => (
            <div key={m.label}>
              <p style={{ fontSize: "9px", marginBottom: "2px", ...S.faint }}>{m.label}</p>
              <p style={{ fontSize: "13px", fontWeight: 600, ...S.text }}>{m.val}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...S.card, overflow: "hidden" as const }}>
        <p style={{ padding: "8px 14px", fontSize: "10px", fontWeight: 600, borderBottom: "1px solid var(--color-border)", ...S.muted }}>
          Stripe webhooks
        </p>
        {events.map((e) => (
          <div key={e.label} style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "9px 14px", borderBottom: "1px solid var(--color-border)",
            fontSize: "10px",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: e.dot, flexShrink: 0, display: "block" }} />
            <span style={{ flex: 1, fontFamily: "ui-monospace, monospace", ...S.muted }}>{e.label}</span>
            <span style={{ ...S.faint }}>{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── EmailVisual ─── */

function EmailVisual() {
  return (
    <div style={{ ...S.card, overflow: "hidden" as const }}>
      <div style={{
        padding: "12px 16px", borderBottom: "1px solid var(--color-border)",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "oklch(0.52 0.22 285 / 0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", fontWeight: 700,
          color: "var(--color-primary)",
        }}>A</div>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, margin: 0, ...S.text }}>Acme &mdash; Welcome!</p>
          <p style={{ fontSize: "10px", margin: 0, ...S.faint }}>hello@acme.com &rarr; you@email.com</p>
        </div>
      </div>
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <p style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px", ...S.text }}>Welcome to Acme</p>
        <p style={{ fontSize: "11px", lineHeight: 1.75, marginBottom: "1.25rem", ...S.muted }}>
          You&rsquo;re all set. Your account is live and ready. Click below to get started.
        </p>
        <div style={{
          display: "inline-block", padding: "9px 20px", borderRadius: "7px",
          background: "var(--color-text)", color: "var(--color-bg)",
          fontSize: "11px", fontWeight: 600, marginBottom: "1rem",
        }}>Open dashboard &rarr;</div>
        <div style={{
          padding: "8px 12px", borderRadius: "8px",
          background: "oklch(0.72 0.18 75 / 0.10)",
          border: "1px solid oklch(0.72 0.18 75 / 0.22)",
          fontSize: "10px", fontFamily: "ui-monospace, monospace",
          color: "oklch(0.68 0.16 75)",
        }}>React Email + Resend &middot; type-safe</div>
      </div>
    </div>
  );
}

/* ─── AnalyticsVisual ─── */

function AnalyticsVisual() {
  const bars   = [42, 58, 50, 71, 65, 80, 74, 90, 86, 95, 88, 100];
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const kpis = [
    { label: "MRR",   value: "$12.4k", delta: "+8.2%",  up: true  },
    { label: "Users", value: "1,847",  delta: "+12.4%", up: true  },
    { label: "Churn", value: "2.1%",   delta: "-0.3%",  up: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ ...S.card, padding: "14px" }}>
            <p style={{ fontSize: "9px", marginBottom: "6px", ...S.faint }}>{k.label}</p>
            <p style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "4px", fontVariantNumeric: "tabular-nums", ...S.text }}>{k.value}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              {k.up
                ? <TrendingUp   size={10} style={{ color: "oklch(0.62 0.16 145)" }} aria-hidden="true" />
                : <TrendingDown size={10} style={{ color: "oklch(0.62 0.18 25)"  }} aria-hidden="true" />
              }
              <p style={{ fontSize: "9px", fontWeight: 600, color: k.up ? "oklch(0.62 0.16 145)" : "oklch(0.62 0.18 25)" }}>{k.delta}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...S.card, padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, ...S.muted }}>Revenue &middot; 2025</p>
          <span style={{
            fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px",
            background: "oklch(0.58 0.15 145 / 0.12)", color: "oklch(0.62 0.15 145)",
          }}>+34.2%</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "64px" }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "3px" }}>
              <div style={{
                width: "100%",
                height: `${h}%`,
                borderRadius: "3px",
                background: i === bars.length - 1
                  ? "oklch(0.52 0.22 285)"
                  : `oklch(0.52 0.22 285 / ${0.15 + i * 0.06})`,
              }} />
              <span style={{ fontSize: "7px", ...S.faint }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Row data ─── */

const rows = [
  {
    tag: "Authentication",
    accent: "oklch(0.65 0.20 285)",
    title: "Auth in 5 minutes,\nnot 5 days.",
    description: "NextAuth v5 pre-configured with Google, GitHub, and magic-link email. Prisma-backed sessions, middleware-protected routes, and role-based access \u2014 ready from your first git clone.",
    bullets: ["Google + GitHub + magic-link", "Prisma session strategy", "Middleware route protection", "Role-based access control"],
    visual: <AuthVisual />,
    flip: false,
  },
  {
    tag: "Billing",
    accent: "oklch(0.65 0.18 192)",
    title: "Stripe billing,\nfully wired up.",
    description: "Checkout, webhooks, billing portal, Stripe Tax, and invoice emails \u2014 all connected. Subscription status lives in the session so every component knows the plan in real time.",
    bullets: ["Checkout + Stripe Tax", "Webhook to Prisma sync", "Billing portal redirect", "Invoice emails via Resend"],
    visual: <BillingVisual />,
    flip: true,
  },
  {
    tag: "Email",
    accent: "oklch(0.72 0.18 75)",
    title: "Beautiful emails\nout of the box.",
    description: "React Email components + Resend delivery. Fully typed, preview in the browser, and pixel-perfect across every client. Welcome, invoice, and password-reset templates included.",
    bullets: ["React Email components", "Resend API integration", "Browser preview dev mode", "Welcome + invoice templates"],
    visual: <EmailVisual />,
    flip: false,
  },
  {
    tag: "Analytics",
    accent: "oklch(0.65 0.16 145)",
    title: "KPIs you can\nact on instantly.",
    description: "Recharts dashboards with MRR, churn, and user metrics. Prisma Pulse streams real-time events so your charts update the moment something happens \u2014 no polling, no delay.",
    bullets: ["MRR, churn, NPS tracking", "Prisma Pulse real-time sync", "Recharts + custom tooltips", "Exportable CSV data"],
    visual: <AnalyticsVisual />,
    flip: true,
  },
];

/* ─── Section ─── */

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        position: "relative",
        padding: "7rem 0 5rem",
        background: "var(--color-bg)",
        overflow: "hidden",
      }}
    >
      {/* Dot-grid bg pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: BG_PATTERN,
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Light-mode pattern override via CSS */}
      <style>{`
        @media (prefers-color-scheme: light) {
          .features-pattern { background-image: ${BG_PATTERN_LIGHT} !important; }
        }
        [data-theme="light"] .features-pattern { background-image: ${BG_PATTERN_LIGHT} !important; }
      `}</style>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background: "radial-gradient(ellipse, oklch(0.52 0.22 285 / 0.10) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div style={{ maxWidth: "560px", marginBottom: "5rem" }}>
          <div style={S.pill}>
            <Zap size={10} aria-hidden="true" />
            Built for speed
          </div>
          <h2
            id="features-heading"
            style={{
              fontSize: "clamp(1.75rem, 1rem + 1.75vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: "1rem",
              ...S.text,
            }}
          >
            Everything wired up on day&nbsp;one
          </h2>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "42ch", ...S.muted }}>
            Skip the boilerplate. Auth, billing, email, and analytics are
            production-ready from your very first commit.
          </p>
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {rows.map((row) => (
            <FeatureRow key={row.tag} row={row} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── FeatureRow ─── */

function FeatureRow({ row }: { row: typeof rows[number] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      alignItems: "center",
      direction: row.flip ? "rtl" : "ltr",
    }}>
      {/* Copy */}
      <div style={{ direction: "ltr" }}>
        <span style={S.tag(row.accent)}>{row.tag}</span>
        <h3 style={{
          fontSize: "clamp(1.5rem, 1rem + 1.2vw, 2.1rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          marginBottom: "1rem",
          whiteSpace: "pre-line",
          ...S.text,
        }}>
          {row.title}
        </h3>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, maxWidth: "42ch", marginBottom: "1.75rem", ...S.muted }}>
          {row.description}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {row.bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "14px", height: "1.5px", background: row.accent, flexShrink: 0, display: "block", borderRadius: "1px" }} />
              <span style={{ fontSize: "0.9375rem", ...S.muted }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <div style={{ direction: "ltr", position: "relative" }}>
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: "-40px",
          borderRadius: "24px",
          background: `radial-gradient(ellipse at 50% 50%, ${row.accent.replace(")", " / 0.10)")}, transparent 65%)`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>{row.visual}</div>
      </div>
    </div>
  );
}
