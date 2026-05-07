import { Shield, CreditCard, Mail, Globe, BarChart3, Zap, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */

interface BaseFeature {
  icon: LucideIcon;
  label: string;
  color: string;
  colorBg: string;
  glowColor: string;
  title: string;
  description: string;
  wide?: boolean;
  tall?: boolean;
}

interface CodeFeature extends BaseFeature {
  code: string;
  items?: never;
}

interface ListFeature extends BaseFeature {
  items: string[];
  code?: never;
}

interface PlainFeature extends BaseFeature {
  code?: never;
  items?: never;
}

type Feature = CodeFeature | ListFeature | PlainFeature;

/* ─── Data ───────────────────────────────────────────── */

const features: Feature[] = [
  {
    icon: Shield,
    label: "Authentication",
    color: "oklch(0.68 0.22 285)",
    colorBg: "oklch(0.52 0.22 285 / 0.10)",
    glowColor: "oklch(0.52 0.22 285 / 0.20)",
    title: "Auth in 5 minutes",
    description:
      "NextAuth v5 with Google, GitHub, and magic links. Prisma-backed sessions. Zero JWT juggling.",
    code: `export const { auth, handlers, signIn, signOut } =
  NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub, Resend],
    session: { strategy: "database" },
  });`,
    wide: true,
  },
  {
    icon: CreditCard,
    label: "Billing",
    color: "oklch(0.72 0.15 192)",
    colorBg: "oklch(0.60 0.15 192 / 0.10)",
    glowColor: "oklch(0.60 0.15 192 / 0.20)",
    title: "Stripe, done.",
    description: "Subscriptions, webhooks, billing portal, and Stripe Tax \u2014 all hooked up.",
    items: [
      "Checkout sessions with tax",
      "Webhook sync to Prisma",
      "Billing portal redirect",
      "Invoice emails via Resend",
      "Subscription status in session",
    ],
    tall: true,
  },
  {
    icon: Mail,
    label: "Email",
    color: "oklch(0.75 0.18 75)",
    colorBg: "oklch(0.65 0.18 75 / 0.10)",
    glowColor: "oklch(0.65 0.18 75 / 0.18)",
    title: "Transactional email",
    description:
      "React Email + Resend. Beautiful, type-safe email templates that just work.",
  },
  {
    icon: Globe,
    label: "Compliance",
    color: "oklch(0.68 0.15 145)",
    colorBg: "oklch(0.55 0.15 145 / 0.10)",
    glowColor: "oklch(0.55 0.15 145 / 0.18)",
    title: "GDPR & CCPA ready",
    description:
      "Cookie consent with GPC detection, data export, and deletion \u2014 out of the box.",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    color: "oklch(0.72 0.18 25)",
    colorBg: "oklch(0.65 0.15 25 / 0.10)",
    glowColor: "oklch(0.65 0.15 25 / 0.18)",
    title: "Built-in analytics",
    description:
      "Recharts dashboards, KPI tracking, and real-time Prisma Pulse sync.",
    wide: true,
  },
];

/* ─── Section ────────────────────────────────────────── */

export function Features() {
  return (
    <section
      id="features"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.52 0.22 285 / 0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-16 max-w-[540px]">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase mb-5"
            style={{
              background: "oklch(0.52 0.22 285 / 0.10)",
              color: "var(--color-primary)",
              border: "1px solid oklch(0.52 0.22 285 / 0.20)",
            }}
          >
            <Zap size={10} aria-hidden="true" />
            Built for speed
          </div>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.75rem, 1rem + 1.75vw, 2.75rem)",
              color: "var(--color-text)",
            }}
          >
            Everything wired up on day one
          </h2>
          <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-muted)" }}>
            Skip the boilerplate. Auth, billing, email, and compliance are production-ready.
            Your first commit ships features, not scaffolding.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          <FeatureCard feature={features[0]} />
          <FeatureCard feature={features[1]} />
          <FeatureCard feature={features[2]} />
          <FeatureCard feature={features[3]} />
          <FeatureCard feature={features[4]} />
        </div>
      </div>
    </section>
  );
}

/* ─── Card ───────────────────────────────────────────── */

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div
      className={[
        "group relative flex flex-col gap-6 rounded-2xl p-7 overflow-hidden",
        "transition-all duration-300 hover:-translate-y-0.5",
        feature.wide === true ? "md:col-span-2" : "",
        feature.tall === true ? "md:row-span-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${feature.glowColor}, transparent 70%)`,
        }}
      />

      {/* Top edge glow line on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
        }}
      />

      {/* Icon + label */}
      <div className="relative flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: feature.colorBg,
            boxShadow: `0 0 0 1px ${feature.color}30`,
          }}
        >
          <Icon size={18} aria-hidden="true" style={{ color: feature.color }} />
        </div>
        <span
          className="text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: feature.color }}
        >
          {feature.label}
        </span>
      </div>

      {/* Title + description */}
      <div className="relative">
        <h3
          className="font-display font-semibold mb-2 leading-snug"
          style={{ fontSize: "var(--text-lg)", color: "var(--color-text)" }}
        >
          {feature.title}
        </h3>
        <p
          className="leading-relaxed"
          style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
        >
          {feature.description}
        </p>
      </div>

      {/* Code block */}
      {"code" in feature && feature.code !== undefined && (
        <div className="relative mt-auto">
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "oklch(0.08 0.008 285)",
              border: "1px solid oklch(0.52 0.22 285 / 0.15)",
            }}
          >
            {/* Dot row */}
            <div
              className="flex items-center gap-1.5 px-4 py-3"
              style={{ borderBottom: "1px solid oklch(0.52 0.22 285 / 0.10)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              <span
                className="ml-auto text-[10px] font-mono"
                style={{ color: "oklch(0.45 0.06 285)" }}
              >
                auth.ts
              </span>
            </div>
            <pre
              className="p-4 text-[11.5px] leading-[1.8] overflow-x-auto"
              style={{ color: "oklch(0.70 0.08 285)", fontFamily: "'Geist Mono', 'Fira Code', monospace" }}
            >
              <code>{feature.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Feature list */}
      {"items" in feature && feature.items !== undefined && (
        <ul className="relative space-y-3 mt-auto">
          {feature.items.map((item: string) => (
            <li key={item} className="flex items-center gap-3">
              <span
                className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full"
                style={{
                  background: feature.colorBg,
                  border: `1px solid ${feature.color}40`,
                }}
              >
                <Check size={10} strokeWidth={2.5} style={{ color: feature.color }} aria-hidden="true" />
              </span>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
