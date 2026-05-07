import { Shield, CreditCard, Mail, BarChart3, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    label: "Authentication",
    color: "var(--color-primary)",
    colorBg: "oklch(0.52 0.22 285 / 0.08)",
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
    tall: false,
  },
  {
    icon: CreditCard,
    label: "Billing",
    color: "var(--color-secondary)",
    colorBg: "oklch(0.60 0.15 192 / 0.08)",
    title: "Stripe, done.",
    description: "Subscriptions, webhooks, billing portal, and Stripe Tax — all hooked up.",
    items: [
      "Checkout sessions with tax",
      "Webhook sync to Prisma",
      "Billing portal redirect",
      "Invoice emails via Resend",
      "Subscription status in session",
    ],
    wide: false,
    tall: true,
  },
  {
    icon: Mail,
    label: "Email",
    color: "oklch(0.65 0.18 75)",
    colorBg: "oklch(0.65 0.18 75 / 0.08)",
    title: "Transactional email",
    description: "React Email + Resend. Beautiful, type-safe email templates that just work.",
    wide: false,
    tall: false,
  },
  {
    icon: Globe,
    label: "Compliance",
    color: "var(--color-success)",
    colorBg: "oklch(0.55 0.15 145 / 0.08)",
    title: "GDPR & CCPA ready",
    description: "Cookie consent with GPC detection, data export, and deletion — out of the box.",
    wide: false,
    tall: false,
  },
  {
    icon: BarChart3,
    label: "Analytics",
    color: "oklch(0.65 0.15 25)",
    colorBg: "oklch(0.65 0.15 25 / 0.08)",
    title: "Built-in analytics",
    description: "Recharts dashboards, KPI tracking, and real-time Prisma Pulse sync.",
    wide: true,
    tall: false,
  },
];

export function Features() {
  return (
    <section id="features" className="py-28" style={{ background: "var(--color-bg)" }}>
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-16 max-w-[540px]">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[var(--text-xs)] font-semibold mb-4"
            style={{
              background: "oklch(0.52 0.22 285 / 0.08)",
              color: "var(--color-primary)",
              border: "1px solid oklch(0.52 0.22 285 / 0.15)",
            }}
          >
            <Zap size={11} aria-hidden="true" />
            Built for speed
          </div>
          <h2
            className="font-display font-semibold leading-tight mb-4"
            style={{
              fontSize: "var(--text-xl)",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Wide: Auth */}
          <FeatureCard feature={features[0]} />

          {/* Tall: Billing */}
          <FeatureCard feature={features[1]} />

          {/* Email */}
          <FeatureCard feature={features[2]} />

          {/* Compliance */}
          <FeatureCard feature={features[3]} />

          {/* Analytics — spans 2 */}
          <FeatureCard feature={features[4]} />
        </div>
      </div>
    </section>
  );
}

type Feature = (typeof features)[0];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div
      className={[
        "rounded-[var(--radius-xl)] p-7 flex flex-col gap-5 group transition-all duration-300 hover:-translate-y-0.5",
        feature.wide ? "md:col-span-2" : "",
        feature.tall ? "md:row-span-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Icon + label */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0"
          style={{ background: feature.colorBg }}
        >
          <Icon size={17} aria-hidden="true" style={{ color: feature.color }} />
        </div>
        <span
          className="text-[var(--text-xs)] font-semibold uppercase tracking-widest"
          style={{ color: feature.color }}
        >
          {feature.label}
        </span>
      </div>

      {/* Title + description */}
      <div>
        <h3
          className="font-semibold mb-2"
          style={{ fontSize: "var(--text-lg)", color: "var(--color-text)" }}
        >
          {feature.title}
        </h3>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
          {feature.description}
        </p>
      </div>

      {/* Code block */}
      {feature.code && (
        <pre
          className="rounded-[var(--radius-md)] p-4 text-[11px] overflow-x-auto leading-relaxed"
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <code>{feature.code}</code>
        </pre>
      )}

      {/* List */}
      {feature.items && (
        <ul className="space-y-2.5 mt-auto">
          {feature.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5"
              style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                className="mt-0.5 flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7.5l3.5 3.5 6.5-7"
                  stroke="var(--color-success)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
