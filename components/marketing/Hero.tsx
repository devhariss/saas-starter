import Link from "next/link";
import { ArrowRight, Github, Star, Zap } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: "var(--color-bg)",
          }}
        />
        {/* Radial glow top-left */}
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.52 0.22 285 / 0.08) 0%, transparent 70%)",
          }}
        />
        {/* Radial glow bottom-right */}
        <div
          className="absolute -bottom-48 -right-24 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.60 0.15 192 / 0.06) 0%, transparent 70%)",
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.5 0.01 285 / 0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px] w-full px-6 py-28 md:py-36">
        {/* Announcement badge */}
        <Link
          href="/changelog"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-10 text-[var(--text-xs)] font-medium transition-all hover:shadow-[var(--shadow-sm)]"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <span
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{
              background: "oklch(0.52 0.22 285 / 0.12)",
              color: "var(--color-primary)",
            }}
          >
            <Zap size={10} aria-hidden="true" />
            New
          </span>
          v1.0 — now with Prisma Pulse real-time sync
          <ArrowRight size={12} aria-hidden="true" />
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-16 items-center">
          {/* Left: copy */}
          <div>
            <h1
              id="hero-heading"
              className="font-display font-semibold leading-[1.08] tracking-tight mb-6"
              style={{
                fontSize: "clamp(2.4rem, 1rem + 4vw, 4.2rem)",
                color: "var(--color-text)",
              }}
            >
              Ship your SaaS{" "}
              <br className="hidden md:block" />
              <span
                style={{
                  background:
                    "linear-gradient(135deg in oklch, var(--color-primary), oklch(0.60 0.15 192))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in days.
              </span>
            </h1>
            <p
              className="mb-10 leading-relaxed max-w-[46ch]"
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--color-text-muted)",
              }}
            >
              A production-ready Next.js 15 starter with auth, billing, and
              analytics wired up. Delete what you don&apos;t need — ship the
              rest.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] font-medium transition-all hover:-translate-y-px active:translate-y-0"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontSize: "var(--text-sm)",
                  boxShadow: "0 1px 3px oklch(0.52 0.22 285 / 0.35), 0 4px 16px oklch(0.52 0.22 285 / 0.15)",
                }}
              >
                Start building free
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/devhariss/saas-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] font-medium transition-all hover:bg-[var(--color-surface-offset)] active:scale-[0.99]"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  fontSize: "var(--text-sm)",
                }}
              >
                <Github size={15} aria-hidden="true" />
                Star on GitHub
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

            {/* Social proof strip */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex -space-x-2">
                {["JK", "AM", "RS", "PL", "TC"].map((initials, i) => (
                  <div
                    key={initials}
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold"
                    style={{
                      background: `oklch(${0.50 + i * 0.04} 0.15 ${220 + i * 25})`,
                      color: "#fff",
                      outline: "2px solid var(--color-bg)",
                      outlineOffset: "-1px",
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      aria-hidden="true"
                      style={{ fill: "oklch(0.75 0.18 75)", color: "oklch(0.75 0.18 75)" }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
                  Loved by <strong style={{ color: "var(--color-text-muted)" }}>2,400+</strong> developers
                </p>
              </div>
            </div>
          </div>

          {/* Right: product card */}
          <div
            aria-hidden="true"
            className="hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            <div
              className="rounded-[var(--radius-xl)] overflow-hidden"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                boxShadow:
                  "0 2px 4px oklch(0.2 0.02 285 / 0.06), 0 16px 48px oklch(0.2 0.02 285 / 0.12), 0 0 0 1px oklch(0.2 0.02 285 / 0.04)",
                transform: "rotateY(-4deg) rotateX(2deg)",
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

function DashboardMockup() {
  const kpis = [
    { label: "MRR", value: "$12,480", delta: "+8.2%", up: true },
    { label: "Users", value: "1,847", delta: "+12.4%", up: true },
    { label: "Churn", value: "2.1%", delta: "-0.3%", up: false },
    { label: "NPS", value: "67", delta: "+4", up: true },
  ];

  const bars = [38, 52, 44, 63, 58, 72, 68, 81, 76, 88, 84, 96];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="p-5">
      {/* Window chrome */}
      <div
        className="flex items-center gap-4 pb-4 mb-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.62 0.20 25)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.70 0.18 75)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.58 0.15 145)" }} />
        </div>
        <div
          className="flex-1 rounded-md px-2 py-1 text-[10px]"
          style={{ background: "var(--color-surface-2)", color: "var(--color-text-faint)" }}
        >
          app.saastarter.dev/dashboard
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-[var(--radius-md)] p-3"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p className="text-[10px] mb-1" style={{ color: "var(--color-text-faint)" }}>
              {kpi.label}
            </p>
            <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
              {kpi.value}
            </p>
            <p
              className="text-[10px] font-medium"
              style={{ color: kpi.up ? "var(--color-success)" : "var(--color-error)" }}
            >
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="rounded-[var(--radius-md)] p-3 mb-4"
        style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
      >
        <p className="text-[10px] font-medium mb-3" style={{ color: "var(--color-text-muted)" }}>
          Revenue · 2025
        </p>
        <div className="flex items-end gap-1 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === 11
                      ? "var(--color-primary)"
                      : "oklch(from var(--color-primary) l c h / 0.25)",
                }}
              />
              <span className="text-[8px]" style={{ color: "var(--color-text-faint)" }}>
                {months[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div
        className="rounded-[var(--radius-md)] overflow-hidden"
        style={{ border: "1px solid var(--color-border)" }}
      >
        {[
          { dot: "var(--color-success)", text: "New user · sarah@nexaflow.io", time: "now" },
          { dot: "var(--color-primary)", text: "Invoice paid · $49 · Pro plan", time: "2m" },
          { dot: "var(--color-secondary)", text: "Webhook synced · stripe.checkout", time: "5m" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-3 py-2 text-[10px]"
            style={{
              borderBottom: i < 2 ? "1px solid var(--color-border)" : "none",
              background: "var(--color-surface-2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: item.dot }}
            />
            <span className="flex-1 truncate" style={{ color: "var(--color-text-muted)" }}>
              {item.text}
            </span>
            <span style={{ color: "var(--color-text-faint)" }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
