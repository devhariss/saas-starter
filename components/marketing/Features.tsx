"use client";

import { Zap } from "lucide-react";

/* ────────────────────────────────────────────────────
   Features — alternating rows, each with copy + visual
   Inspired by Linear / Stripe / Vercel feature pages
──────────────────────────────────────────────────── */

const S = {
  /* reusable inline-style snippets */
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
    background: `${accent.replace(")", " / 0.10)")}`,
    color: accent,
    border: `1px solid ${accent.replace(")", " / 0.25)")}`,
  }),
};

/* ─── Visual components (one per feature row) ─── */

function AuthVisual() {
  const providers = [
    { name: "Google",  bg: "#fff",         border: "#e2e2e2", icon: "🔵", label: "Continue with Google"  },
    { name: "GitHub",  bg: "#24292e",      border: "#444",    icon: "⚫",    label: "Continue with GitHub"  },
    { name: "Email",   bg: "var(--color-surface-offset)", border: "var(--color-border)", icon: "✉️",  label: "Continue with Email"   },
  ];
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 8px 32px oklch(0 0 0 / 0.10)",
      }}
    >
      <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text)", marginBottom: "4px" }}>Sign in to Acme</p>
      <p style={{ fontSize: "11px", color: "var(--color-text-faint)", marginBottom: "1.5rem" }}>Welcome back</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {providers.map((p) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 14px",
              borderRadius: "8px",
              background: p.bg,
              border: `1px solid ${p.border}`,
              fontSize: "12px",
              fontWeight: 500,
              color: p.name === "GitHub" ? "#fff" : "var(--color-text)",
            }}
          >
            <span style={{ fontSize: "14px" }}>{p.icon}</span>
            {p.label}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "1rem 0" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
        <span style={{ fontSize: "10px", color: "var(--color-text-faint)" }}>or</span>
        <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      </div>
      <div
        style={{
          padding: "9px 14px",
          borderRadius: "8px",
          background: "var(--color-text)",
          color: "var(--color-bg)",
          fontSize: "12px",
          fontWeight: 600,
          textAlign: "center" as const,
        }}
      >
        Create account →
      </div>
      {/* Session badge */}
      <div
        style={{
          marginTop: "1rem",
          padding: "8px 12px",
          borderRadius: "8px",
          background: "oklch(0.52 0.22 285 / 0.08)",
          border: "1px solid oklch(0.52 0.22 285 / 0.16)",
          fontSize: "10px",
          color: "var(--color-primary)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)", display: "block", flexShrink: 0 }} />
        Session stored · Prisma · strategy: database
      </div>
    </div>
  );
}

function BillingVisual() {
  const plan = { name: "Pro", price: "$49", period: "/mo", users: 5, storage: "50 GB" };
  const events = [
    { label: "checkout.session.completed", time: "just now",  dot: "oklch(0.60 0.16 145)" },
    { label: "invoice.payment_succeeded",  time: "2s ago",    dot: "oklch(0.62 0.20 285)" },
    { label: "customer.subscription.updated", time: "8s ago", dot: "oklch(0.68 0.18 75)"  },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
      {/* Plan card */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px",
          padding: "1.25rem 1.5rem",
          boxShadow: "0 4px 16px oklch(0 0 0 / 0.07)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: "11px", color: "var(--color-text-faint)", marginBottom: "4px" }}>Current plan</p>
            <p style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.02em" }}>
              {plan.price}<span style={{ fontSize: "12px", fontWeight: 400, color: "var(--color-text-muted)" }}>{plan.period}</span>
            </p>
          </div>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "9999px",
              background: "oklch(0.52 0.22 285 / 0.12)",
              color: "var(--color-primary)",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            {plan.name}
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
          {[{ label: "Seats", val: plan.users }, { label: "Storage", val: plan.storage }].map((m) => (
            <div key={m.label}>
              <p style={{ fontSize: "9px", color: "var(--color-text-faint)", marginBottom: "2px" }}>{m.label}</p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text)" }}>{m.val}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Webhook feed */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 4px 16px oklch(0 0 0 / 0.07)",
        }}
      >
        <p style={{ padding: "8px 14px", fontSize: "10px", fontWeight: 600, color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)" }}>Stripe webhooks</p>
        {events.map((e) => (
          <div key={e.label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderBottom: "1px solid var(--color-border)", fontSize: "10px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: e.dot, flexShrink: 0, display: "block" }} />
            <span style={{ flex: 1, color: "var(--color-text-muted)", fontFamily: "ui-monospace, monospace" }}>{e.label}</span>
            <span style={{ color: "var(--color-text-faint)" }}>{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailVisual() {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 32px oklch(0 0 0 / 0.10)",
      }}
    >
      {/* Email header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "oklch(0.52 0.22 285 / 0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px",
          }}
        >A</div>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text)", margin: 0 }}>Acme — Welcome!</p>
          <p style={{ fontSize: "10px", color: "var(--color-text-faint)", margin: 0 }}>hello@acme.com → you@email.com</p>
        </div>
      </div>
      {/* Email body */}
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text)", marginBottom: "8px" }}>Welcome to Acme 🚀</p>
        <p style={{ fontSize: "11px", lineHeight: 1.7, color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
          You’re all set. Your account is live and ready to use. Click below to get started.
        </p>
        <div
          style={{
            display: "inline-block",
            padding: "9px 20px",
            borderRadius: "7px",
            background: "var(--color-text)",
            color: "var(--color-bg)",
            fontSize: "11px",
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          Open dashboard →
        </div>
        {/* Code chip */}
        <div
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            background: "oklch(0.72 0.18 75 / 0.08)",
            border: "1px solid oklch(0.72 0.18 75 / 0.18)",
            fontSize: "10px",
            fontFamily: "ui-monospace, monospace",
            color: "oklch(0.60 0.18 75)",
          }}
        >
          Built with React Email + Resend · type-safe
        </div>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [42, 58, 50, 71, 65, 80, 74, 90, 86, 95, 88, 100];
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const kpis = [
    { label: "MRR",    value: "$12.4k", delta: "+8.2%",  up: true  },
    { label: "Users",  value: "1,847",  delta: "+12.4%", up: true  },
    { label: "Churn",  value: "2.1%",   delta: "-0.3%",  up: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{
              padding: "14px",
              borderRadius: "12px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px oklch(0 0 0 / 0.05)",
            }}
          >
            <p style={{ fontSize: "9px", color: "var(--color-text-faint)", marginBottom: "6px" }}>{k.label}</p>
            <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--color-text)", letterSpacing: "-0.02em", marginBottom: "4px", fontVariantNumeric: "tabular-nums" }}>{k.value}</p>
            <p style={{ fontSize: "9px", fontWeight: 600, color: k.up ? "oklch(0.58 0.15 145)" : "oklch(0.62 0.20 25)" }}>{k.delta}</p>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div
        style={{
          padding: "1.25rem",
          borderRadius: "12px",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px oklch(0 0 0 / 0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)" }}>Revenue · 2025</p>
          <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", background: "oklch(0.55 0.15 145 / 0.10)", color: "oklch(0.55 0.15 145)" }}>+34.2%</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "64px" }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "3px" }}>
              <div
                style={{
                  width: "100%",
                  height: `${h}%`,
                  borderRadius: "3px",
                  background: i === bars.length - 1
                    ? "oklch(0.52 0.22 285)"
                    : `oklch(0.52 0.22 285 / ${0.15 + i * 0.06})`,
                }}
              />
              <span style={{ fontSize: "7px", color: "var(--color-text-faint)" }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Feature row data ─── */

const rows = [
  {
    tag: "Authentication",
    accent: "oklch(0.62 0.20 285)",
    title: "Auth in 5 minutes,\nnot 5 days.",
    description:
      "NextAuth v5 pre-configured with Google, GitHub, and magic-link email. Prisma-backed sessions, middleware-protected routes, and role-based access — ready from your first \`git clone\`.",
    bullets: ["Google + GitHub + magic-link", "Prisma session strategy", "Middleware route protection", "Role-based access control"],
    visual: <AuthVisual />,
    flip: false,
  },
  {
    tag: "Billing",
    accent: "oklch(0.62 0.18 192)",
    title: "Stripe billing,\nfully wired up.",
    description:
      "Checkout, webhooks, the billing portal, Stripe Tax, and invoice emails — all connected. Subscription status lives in the session so every component knows the plan in real time.",
    bullets: ["Checkout + Stripe Tax", "Webhook → Prisma sync", "Billing portal redirect", "Invoice emails via Resend"],
    visual: <BillingVisual />,
    flip: true,
  },
  {
    tag: "Email",
    accent: "oklch(0.70 0.18 75)",
    title: "Beautiful emails\nout of the box.",
    description:
      "React Email components + Resend delivery. Fully typed, preview in the browser, and pixel-perfect across every client. Welcome, invoice, and password-reset templates included.",
    bullets: ["React Email components", "Resend API integration", "Browser preview dev mode", "Welcome + invoice templates"],
    visual: <EmailVisual />,
    flip: false,
  },
  {
    tag: "Analytics",
    accent: "oklch(0.60 0.16 145)",
    title: "KPIs you can\nact on instantly.",
    description:
      "Recharts dashboards with MRR, churn, and user metrics. Prisma Pulse streams real-time events so your charts update the moment something happens — no polling, no delay.",
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
      {/* Ambient top glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, oklch(0.52 0.22 285 / 0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section header */}
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
              color: "var(--color-text)",
              marginBottom: "1rem",
            }}
          >
            Everything wired up on day&nbsp;one
          </h2>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--color-text-muted)", maxWidth: "42ch" }}>
            Skip the boilerplate. Auth, billing, email, and analytics are
            production-ready from your very first commit.
          </p>
        </div>

        {/* Alternating rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {rows.map((row) => (
            <FeatureRow key={row.tag} row={row} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Row ─── */

function FeatureRow({ row }: { row: typeof rows[number] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        direction: row.flip ? "rtl" : "ltr",
      }}
    >
      {/* Copy side */}
      <div style={{ direction: "ltr" }}>
        <span style={S.tag(row.accent)}>{row.tag}</span>

        <h3
          style={{
            fontSize: "clamp(1.5rem, 1rem + 1.2vw, 2.1rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--color-text)",
            marginBottom: "1rem",
            whiteSpace: "pre-line",
          }}
        >
          {row.title}
        </h3>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--color-text-muted)",
            maxWidth: "42ch",
            marginBottom: "1.75rem",
          }}
        >
          {row.description}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {row.bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Accent dash — no circles */}
              <span
                style={{
                  width: "16px",
                  height: "1.5px",
                  background: row.accent,
                  flexShrink: 0,
                  display: "block",
                  borderRadius: "1px",
                }}
              />
              <span style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)" }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual side */}
      <div style={{ direction: "ltr", position: "relative" }}>
        {/* Subtle glow behind each visual */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-32px",
            borderRadius: "24px",
            background: `radial-gradient(ellipse at 50% 50%, ${row.accent.replace(")", " / 0.08)")}, transparent 65%)`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          {row.visual}
        </div>
      </div>
    </div>
  );
}
