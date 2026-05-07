import Link from "next/link";
import { ArrowRight, Github, Star, Check } from "lucide-react";

/* ─── Types ──────────────────────────────── */

interface KpiItem {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

interface ActivityRow {
  dot: string;
  text: string;
  time: string;
}

/* ─── Hero ──────────────────────────────── */

export function Hero() {
  const pills = ["Next.js 15", "Prisma", "Stripe", "NextAuth v5", "Resend"];

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--color-bg)",
      }}
    >
      {/* Blueprint grid — Vercel-aesthetic, barely visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.5 0.01 285 / 0.07) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0.01 285 / 0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial fade at center — softens the grid near content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 40% 50%, var(--color-bg) 30%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />

      <div
        className="mx-auto w-full px-6 py-24 md:py-32"
        style={{ maxWidth: "1200px" }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >

          {/* ── Left: copy ── */}
          <div>
            {/* Announcement badge */}
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 mb-8 rounded-full px-3 py-1 transition-opacity hover:opacity-80"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                fontSize: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{
                  background: "oklch(0.52 0.22 285 / 0.12)",
                  color: "var(--color-primary)",
                }}
              >
                v1.0
              </span>
              Prisma Pulse real-time sync is live
              <ArrowRight size={11} aria-hidden="true" />
            </Link>

            {/* Eyebrow */}
            <p
              className="uppercase tracking-widest mb-4"
              style={{ fontSize: "11px", color: "var(--color-text-faint)", letterSpacing: "0.14em" }}
            >
              Next.js SaaS starter
            </p>

            {/* Headline — left-aligned, no gradient text */}
            <h1
              id="hero-heading"
              className="font-display font-bold tracking-tight mb-6"
              style={{
                fontSize: "clamp(2.4rem, 1rem + 4vw, 4rem)",
                lineHeight: 1.05,
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
              }}
            >
              Ship your SaaS{" "}
              <br />
              <span style={{ color: "var(--color-primary)" }}>in days,</span>{" "}
              not months.
            </h1>

            <p
              className="mb-8 leading-relaxed"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-muted)",
                maxWidth: "42ch",
              }}
            >
              Production-ready Next.js 15 with auth, billing, email and analytics
              pre-wired. Fork, configure, and ship — everything else is already done.
            </p>

            {/* Stack pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    fontSize: "11px",
                    color: "var(--color-text-muted)",
                  }}
                >
                  <Check size={9} style={{ color: "var(--color-primary)" }} aria-hidden="true" />
                  {pill}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap mb-10">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-150 hover:-translate-y-px active:translate-y-0"
                style={{
                  background: "var(--color-text)",
                  color: "var(--color-bg)",
                  fontSize: "var(--text-sm)",
                }}
              >
                Get started free
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/devhariss/saas-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-150 hover:bg-[var(--color-surface-offset)]"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <Github size={14} aria-hidden="true" />
                GitHub
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                  style={{
                    background: "var(--color-surface-offset)",
                    color: "var(--color-text-faint)",
                  }}
                >
                  MIT
                </span>
              </a>
            </div>

            {/* Social proof row */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {([285, 192, 145, 75, 25] as number[]).map((hue, i) => (
                  <div
                    key={hue}
                    aria-hidden="true"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                      background: `oklch(0.50 0.14 ${hue})`,
                      color: "#fff",
                      outline: "2px solid var(--color-bg)",
                    }}
                  >
                    {["J", "A", "R", "P", "T"][i]}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {([...Array(5)] as undefined[]).map((_, i) => (
                    <Star key={i} size={11} aria-hidden="true"
                      style={{ fill: "oklch(0.78 0.18 75)", color: "oklch(0.78 0.18 75)" }} />
                  ))}
                </div>
                <p style={{ fontSize: "12px", color: "var(--color-text-faint)" }}>
                  <strong style={{ color: "var(--color-text-muted)" }}>2,400+</strong> devs shipped with this
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: dashboard mockup ── */}
          <div
            aria-hidden="true"
            className="hidden lg:block relative"
          >
            {/* Subtle glow behind card — single, low opacity */}
            <div
              className="absolute -inset-8 -z-10 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, oklch(0.52 0.22 285 / 0.07) 0%, transparent 70%)",
              }}
            />
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                boxShadow: "0 2px 4px oklch(0 0 0 / 0.06), 0 16px 48px oklch(0 0 0 / 0.10)",
              }}
            >
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Dashboard Mockup ────────────────────── */

function DashboardMockup() {
  const kpis: KpiItem[] = [
    { label: "MRR",   value: "$12,480", delta: "+8.2%",  up: true  },
    { label: "Users", value: "1,847",   delta: "+12.4%", up: true  },
    { label: "Churn", value: "2.1%",    delta: "-0.3%",  up: false },
    { label: "NPS",   value: "67",      delta: "+4",     up: true  },
  ];

  const bars: number[] = [38, 52, 44, 63, 58, 72, 68, 81, 76, 88, 84, 96];
  const months: string[] = ["J","F","M","A","M","J","J","A","S","O","N","D"];

  const activity: ActivityRow[] = [
    { dot: "oklch(0.65 0.15 145)", text: "New user · sarah@nexaflow.io",     time: "now" },
    { dot: "oklch(0.65 0.20 285)", text: "Invoice paid · $49 · Pro plan",  time: "2m"  },
    { dot: "oklch(0.65 0.15 192)", text: "Webhook synced · stripe.checkout", time: "5m"  },
  ];

  return (
    <div style={{ background: "var(--color-surface)" }}>
      {/* Window chrome */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.62 0.20 25)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.70 0.18 75)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.58 0.15 145)" }} />
        </div>
        <div
          className="flex-1 rounded px-2.5 py-1"
          style={{
            background: "var(--color-surface-offset)",
            fontSize: "10px",
            color: "var(--color-text-faint)",
            fontFamily: "monospace",
          }}
        >
          app.saastarter.dev/dashboard
        </div>
      </div>

      <div className="p-4">
        {/* Sidebar + main layout */}
        <div className="flex gap-3">
          {/* Mini sidebar */}
          <div
            className="hidden xl:flex flex-col gap-1 pt-1"
            style={{ width: "120px", flexShrink: 0 }}
          >
            {[
              { label: "Overview",  active: true  },
              { label: "Revenue",   active: false },
              { label: "Users",     active: false },
              { label: "Settings",  active: false },
            ].map((item) => (
              <div
                key={item.label}
                className="px-2.5 py-1.5 rounded-md text-[10px] font-medium"
                style={{
                  background: item.active ? "var(--color-surface-offset)" : "transparent",
                  color: item.active ? "var(--color-text)" : "var(--color-text-faint)",
                  border: item.active ? "1px solid var(--color-border)" : "1px solid transparent",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-lg p-2.5"
                  style={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <p className="text-[8px] mb-1 font-medium" style={{ color: "var(--color-text-faint)" }}>
                    {kpi.label}
                  </p>
                  <p className="text-[12px] font-bold tabular-nums" style={{ color: "var(--color-text)" }}>
                    {kpi.value}
                  </p>
                  <p
                    className="text-[8px] font-semibold mt-0.5"
                    style={{ color: kpi.up ? "oklch(0.58 0.15 145)" : "oklch(0.62 0.20 25)" }}
                  >
                    {kpi.delta}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div
              className="rounded-lg p-3 mb-3"
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[10px] font-semibold" style={{ color: "var(--color-text-muted)" }}>
                  Revenue &middot; 2025
                </p>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                  style={{
                    background: "oklch(0.55 0.15 145 / 0.12)",
                    color: "oklch(0.58 0.15 145)",
                  }}
                >
                  +34.2%
                </span>
              </div>
              <div className="flex items-end gap-[2px] h-16">
                {bars.map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-[3px] flex-1">
                    <div
                      className="w-full rounded-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          i === bars.length - 1
                            ? "var(--color-primary)"
                            : `oklch(from var(--color-primary) l c h / ${0.15 + (h / 100) * 0.25})`,
                      }}
                    />
                    <span className="text-[7px]" style={{ color: "var(--color-text-faint)" }}>
                      {months[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <p
                className="px-3 py-2 text-[10px] font-semibold"
                style={{
                  background: "var(--color-surface-2)",
                  color: "var(--color-text-muted)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                Live activity
              </p>
              {activity.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 text-[10px]"
                  style={{
                    background: "var(--color-surface-2)",
                    borderBottom: i < activity.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: row.dot }}
                  />
                  <span className="flex-1 truncate" style={{ color: "var(--color-text-muted)" }}>
                    {row.text}
                  </span>
                  <span style={{ color: "var(--color-text-faint)" }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
