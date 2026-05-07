import Link from "next/link";
import { ArrowRight, Github, Star, Zap, TrendingUp } from "lucide-react";

/* ─── Types ────────────────────────────────────── */

interface KpiItem {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

interface ActivityItem {
  dot: string;
  text: string;
  time: string;
}

/* ─── Hero ────────────────────────────────────── */

export function Hero() {
  return (
    <section
      className="relative min-h-[96vh] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ background: "var(--color-bg)" }}
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(oklch(0.5 0.01 285 / 0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Primary orb — top center */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.52 0.22 285 / 0.12) 0%, transparent 65%)",
            filter: "blur(1px)",
          }}
        />
        {/* Secondary orb — bottom right */}
        <div
          className="absolute -bottom-48 -right-24 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.60 0.15 192 / 0.08) 0%, transparent 70%)",
          }}
        />
        {/* Accent orb — left */}
        <div
          className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.15 145 / 0.05) 0%, transparent 70%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-bg))",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px] w-full px-6 py-28 md:py-36">
        {/* Announcement badge */}
        <Link
          href="/changelog"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-10 transition-all duration-200 hover:-translate-y-px"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            fontSize: "var(--text-xs)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{
              background: "oklch(0.52 0.22 285 / 0.14)",
              color: "var(--color-primary)",
            }}
          >
            <Zap size={9} aria-hidden="true" />
            New
          </span>
          <span>v1.0 — now with Prisma Pulse real-time sync</span>
          <ArrowRight size={11} aria-hidden="true" />
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-center">
          {/* ── Left: copy ── */}
          <div>
            <h1
              id="hero-heading"
              className="font-display font-bold leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem, 1rem + 4.5vw, 4.8rem)", color: "var(--color-text)" }}
            >
              Ship your SaaS{" "}
              <br className="hidden md:block" />
              <span
                style={{
                  background: "linear-gradient(135deg in oklch, var(--color-primary) 20%, oklch(0.68 0.18 192) 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in days.
              </span>
            </h1>

            <p
              className="mb-10 leading-relaxed"
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--color-text-muted)",
                maxWidth: "44ch",
              }}
            >
              A production-ready Next.js 15 starter with auth, billing, and
              analytics wired up. Delete what you don&apos;t need — ship the rest.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontSize: "var(--text-sm)",
                  boxShadow:
                    "0 1px 3px oklch(0.52 0.22 285 / 0.40), 0 6px 24px oklch(0.52 0.22 285 / 0.20)",
                }}
              >
                Start building free
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/devhariss/saas-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:bg-[var(--color-surface-offset)] active:scale-[0.99]"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <Github size={15} aria-hidden="true" />
                View on GitHub
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: "var(--color-surface-offset)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  MIT
                </span>
              </a>
            </div>

            {/* Social proof */}
            <div
              className="flex items-center gap-5 pt-8 flex-wrap"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              {/* Avatars */}
              <div className="flex -space-x-2.5">
                {(["JK", "AM", "RS", "PL", "TC"] as string[]).map((initials, i) => (
                  <div
                    key={initials}
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: `oklch(${0.48 + i * 0.04} 0.16 ${210 + i * 28})`,
                      color: "#fff",
                      outline: "2.5px solid var(--color-bg)",
                      outlineOffset: "-1px",
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              {/* Stars + count */}
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {([...Array(5)] as undefined[]).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      aria-hidden="true"
                      style={{ fill: "oklch(0.78 0.18 75)", color: "oklch(0.78 0.18 75)" }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
                  Loved by{" "}
                  <strong style={{ color: "var(--color-text-muted)" }}>2,400+</strong>
                  {" "}developers
                </p>
              </div>
              {/* Divider */}
              <div
                className="hidden sm:block w-px h-8"
                style={{ background: "var(--color-border)" }}
              />
              {/* Stat */}
              <div className="hidden sm:flex items-center gap-2">
                <TrendingUp size={15} style={{ color: "var(--color-success)" }} aria-hidden="true" />
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
                  <strong style={{ color: "var(--color-text-muted)" }}>$0 → live</strong>{" "}
                  in under 48h
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: mockup card ── */}
          <div
            aria-hidden="true"
            className="hidden lg:block relative"
            style={{ perspective: "1400px" }}
          >
            {/* Glow behind card */}
            <div
              className="absolute inset-0 -z-10 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 60%, oklch(0.52 0.22 285 / 0.18) 0%, transparent 70%)",
                transform: "scale(1.1)",
              }}
            />
            <div
              className="rounded-2xl overflow-hidden transition-transform duration-700"
              style={{
                border: "1px solid oklch(0.52 0.22 285 / 0.25)",
                background: "oklch(0.11 0.008 285)",
                boxShadow:
                  "0 0 0 1px oklch(0.52 0.22 285 / 0.08), 0 4px 8px oklch(0 0 0 / 0.30), 0 24px 64px oklch(0.52 0.22 285 / 0.12)",
                transform: "rotateY(-5deg) rotateX(2.5deg) translateZ(0)",
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

/* ─── Dashboard Mockup ──────────────────────────── */

function DashboardMockup() {
  const kpis: KpiItem[] = [
    { label: "MRR", value: "$12,480", delta: "+8.2%", up: true },
    { label: "Users", value: "1,847", delta: "+12.4%", up: true },
    { label: "Churn", value: "2.1%", delta: "-0.3%", up: false },
    { label: "NPS", value: "67", delta: "+4", up: true },
  ];

  const bars: number[] = [38, 52, 44, 63, 58, 72, 68, 81, 76, 88, 84, 96];
  const months: string[] = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  const activity: ActivityItem[] = [
    { dot: "oklch(0.68 0.15 145)", text: "New user · sarah@nexaflow.io", time: "now" },
    { dot: "oklch(0.68 0.22 285)", text: "Invoice paid · $49 · Pro plan", time: "2m" },
    { dot: "oklch(0.72 0.15 192)", text: "Webhook synced · stripe.checkout", time: "5m" },
  ];

  return (
    <div className="p-5">
      {/* Window chrome */}
      <div
        className="flex items-center gap-3 pb-4 mb-4"
        style={{ borderBottom: "1px solid oklch(0.52 0.22 285 / 0.12)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.62 0.20 25)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.70 0.18 75)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.58 0.15 145)" }} />
        </div>
        <div
          className="flex-1 rounded-md px-3 py-1 text-[10px] font-mono"
          style={{
            background: "oklch(0.08 0.006 285)",
            color: "oklch(0.45 0.06 285)",
            border: "1px solid oklch(0.52 0.22 285 / 0.10)",
          }}
        >
          app.saastarter.dev/dashboard
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl p-3"
            style={{
              background: "oklch(0.14 0.009 285)",
              border: "1px solid oklch(0.52 0.22 285 / 0.10)",
            }}
          >
            <p className="text-[9px] mb-1 font-medium" style={{ color: "oklch(0.45 0.06 285)" }}>
              {kpi.label}
            </p>
            <p className="text-[13px] font-bold tabular-nums" style={{ color: "oklch(0.92 0.02 285)" }}>
              {kpi.value}
            </p>
            <p
              className="text-[9px] font-semibold mt-0.5"
              style={{
                color: kpi.up ? "oklch(0.68 0.15 145)" : "oklch(0.68 0.18 25)",
              }}
            >
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{
          background: "oklch(0.14 0.009 285)",
          border: "1px solid oklch(0.52 0.22 285 / 0.10)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold" style={{ color: "oklch(0.65 0.08 285)" }}>
            Revenue &middot; 2025
          </p>
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
            style={{
              background: "oklch(0.55 0.15 145 / 0.15)",
              color: "oklch(0.68 0.15 145)",
            }}
          >
            +34.2%
          </span>
        </div>
        <div className="flex items-end gap-[3px] h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === bars.length - 1
                      ? "oklch(0.68 0.22 285)"
                      : `oklch(0.52 0.22 285 / ${0.15 + (h / 100) * 0.30})`,
                  boxShadow: i === bars.length - 1 ? "0 0 8px oklch(0.52 0.22 285 / 0.50)" : "none",
                }}
              />
              <span className="text-[7px]" style={{ color: "oklch(0.38 0.04 285)" }}>
                {months[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1px solid oklch(0.52 0.22 285 / 0.10)",
          background: "oklch(0.14 0.009 285)",
        }}
      >
        <p
          className="text-[10px] font-semibold px-3 py-2.5"
          style={{
            color: "oklch(0.65 0.08 285)",
            borderBottom: "1px solid oklch(0.52 0.22 285 / 0.10)",
          }}
        >
          Live activity
        </p>
        {activity.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-3 py-2 text-[10px]"
            style={{
              borderBottom:
                i < activity.length - 1
                  ? "1px solid oklch(0.52 0.22 285 / 0.08)"
                  : "none",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: item.dot }}
            />
            <span className="flex-1 truncate" style={{ color: "oklch(0.62 0.06 285)" }}>
              {item.text}
            </span>
            <span style={{ color: "oklch(0.40 0.04 285)" }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
