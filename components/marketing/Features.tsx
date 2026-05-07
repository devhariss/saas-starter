"use client";

import { Shield, CreditCard, Mail, Globe, BarChart3, Zap, Check, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

/* ─── Types ──────────────────────────── */

interface Feature {
  icon: LucideIcon;
  label: string;
  accent: string;          /* oklch color string */
  title: string;
  description: string;
  code?: string;
  items?: string[];
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

/* ─── Data ───────────────────────────── */

const features: Feature[] = [
  {
    icon: Shield,
    label: "Authentication",
    accent: "oklch(0.62 0.20 285)",
    title: "Auth in 5 minutes",
    description:
      "NextAuth v5 with Google, GitHub, and magic links. Prisma-backed sessions. Zero JWT juggling.",
    code: `export const { auth, handlers, signIn, signOut } =
  NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub, Resend],
    session: { strategy: "database" },
  });`,
    colSpan: 2,
  },
  {
    icon: CreditCard,
    label: "Billing",
    accent: "oklch(0.62 0.18 192)",
    title: "Stripe, done.",
    description: "Subscriptions, webhooks, billing portal, and Stripe Tax — all hooked up.",
    items: [
      "Checkout sessions with tax",
      "Webhook sync to Prisma",
      "Billing portal redirect",
      "Invoice emails via Resend",
      "Subscription status in session",
    ],
    rowSpan: 2,
  },
  {
    icon: Mail,
    label: "Email",
    accent: "oklch(0.72 0.18 75)",
    title: "Transactional email",
    description:
      "React Email + Resend. Beautiful, type-safe email templates that just work.",
  },
  {
    icon: Globe,
    label: "Compliance",
    accent: "oklch(0.60 0.16 145)",
    title: "GDPR & CCPA ready",
    description:
      "Cookie consent with GPC detection, data export, and deletion — out of the box.",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    accent: "oklch(0.68 0.18 25)",
    title: "Built-in analytics",
    description:
      "Recharts dashboards, KPI tracking, and real-time Prisma Pulse sync.",
    colSpan: 2,
  },
];

/* ─── Section ────────────────────────── */

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        position: "relative",
        padding: "7rem 0 6rem",
        background: "var(--color-bg)",
        overflow: "hidden",
      }}
    >
      {/* Subtle top ambient glow — same as hero */}
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
        <div style={{ maxWidth: "540px", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "9999px",
              background: "oklch(0.52 0.22 285 / 0.09)",
              border: "1px solid oklch(0.52 0.22 285 / 0.20)",
              color: "var(--color-primary)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
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
            Skip the boilerplate. Auth, billing, email, and compliance are
            production-ready from your first commit.
          </p>
        </div>

        {/* Bento grid — CSS Grid with named areas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto",
            gap: "12px",
          }}
        >
          {/* Auth — col-span 2 */}
          <div style={{ gridColumn: "span 2" }}>
            <FeatureCard feature={features[0]} />
          </div>

          {/* Billing — row-span 2 */}
          <div style={{ gridRow: "span 2" }}>
            <FeatureCard feature={features[1]} stretch />
          </div>

          {/* Email + Compliance — each 1 col */}
          <div><FeatureCard feature={features[2]} /></div>
          <div><FeatureCard feature={features[3]} /></div>

          {/* Analytics — col-span 2 (wraps to next row under email/compliance) */}
          <div style={{ gridColumn: "span 2" }}>
            <FeatureCard feature={features[4]} />
          </div>

          {/* Spacer so billing row-span lines up correctly */}
          <div />
        </div>
      </div>
    </section>
  );
}

/* ─── Card ───────────────────────────── */

function FeatureCard({ feature, stretch }: { feature: Feature; stretch?: boolean }) {
  const Icon = feature.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        padding: "1.75rem",
        borderRadius: "16px",
        overflow: "hidden",
        height: stretch ? "100%" : undefined,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: hovered
          ? "0 4px 24px oklch(0 0 0 / 0.10)"
          : "0 1px 3px oklch(0 0 0 / 0.05)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      {/* Hover top-edge glow line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Hover radial fill */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(400px circle at 50% 0%, ${feature.accent.replace(")", " / 0.07)")}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />

      {/* Icon + label row — no colored circle, just the icon + text */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
        <Icon
          size={17}
          aria-hidden="true"
          style={{
            color: feature.accent,
            flexShrink: 0,
            transition: "opacity 0.2s",
          }}
        />
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.11em",
            textTransform: "uppercase",
            color: feature.accent,
          }}
        >
          {feature.label}
        </span>
      </div>

      {/* Title + description */}
      <div style={{ position: "relative" }}>
        <h3
          style={{
            fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.2rem)",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.015em",
            color: "var(--color-text)",
            marginBottom: "0.5rem",
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.65,
            color: "var(--color-text-muted)",
            maxWidth: "44ch",
          }}
        >
          {feature.description}
        </p>
      </div>

      {/* Code block */}
      {feature.code && (
        <div
          style={{
            position: "relative",
            marginTop: "auto",
            borderRadius: "10px",
            overflow: "hidden",
            background: "oklch(0.10 0.010 285)",
            border: "1px solid oklch(0.52 0.22 285 / 0.14)",
          }}
        >
          {/* Mini toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderBottom: "1px solid oklch(0.52 0.22 285 / 0.10)",
            }}
          >
            {["oklch(0.62 0.20 25 / 0.5)","oklch(0.70 0.18 75 / 0.5)","oklch(0.58 0.15 145 / 0.5)"].map((c) => (
              <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "block" }} />
            ))}
            <span
              style={{
                marginLeft: "auto",
                fontSize: "10px",
                fontFamily: "ui-monospace, monospace",
                color: "oklch(0.45 0.06 285)",
              }}
            >
              auth.ts
            </span>
          </div>
          <pre
            style={{
              padding: "14px",
              fontSize: "11.5px",
              lineHeight: 1.8,
              overflowX: "auto",
              color: "oklch(0.72 0.08 285)",
              fontFamily: "'Geist Mono', 'Fira Code', ui-monospace, monospace",
              margin: 0,
            }}
          >
            <code>{feature.code}</code>
          </pre>
        </div>
      )}

      {/* Feature list */}
      {feature.items && (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "auto",
            listStyle: "none",
            padding: 0,
          }}
        >
          {feature.items.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ArrowRight
                size={11}
                aria-hidden="true"
                style={{ color: feature.accent, flexShrink: 0 }}
              />
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
