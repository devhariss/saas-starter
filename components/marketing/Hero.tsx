import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background: "var(--color-bg)",
        backgroundImage:
          "radial-gradient(oklch(0.5 0.01 285 / 0.15) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-[1200px] w-full px-6 py-24 md:py-32">
        {/* Beta badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--text-xs)] text-[var(--color-text-muted)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" aria-hidden="true" />
          Now in public beta · v1.0
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <h1
              className="font-display font-semibold text-[var(--color-text)] mb-6 leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2rem, 1.2rem + 2.5vw, 3.5rem)" }}
            >
              Ship your SaaS in days,
              <br />
              <span className="text-[var(--color-primary)]">not months.</span>
            </h1>
            <p className="text-[var(--text-lg)] text-[var(--color-text-muted)] mb-10 max-w-[48ch] leading-relaxed">
              A production-ready Next.js 15 starter with auth, billing, and
              analytics wired up. Delete what you don't need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-[var(--text-sm)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Start building free
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="https://github.com/devhariss/saas-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--text-sm)] text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
              >
                <Github size={16} aria-hidden="true" />
                View on GitHub
              </a>
            </div>

            {/* Social signals */}
            <p className="mt-8 text-[var(--text-xs)] text-[var(--color-text-faint)]">
              MIT licensed · No vendor lock-in · Deploy to Vercel in 2 minutes
            </p>
          </div>

          {/* Right: product mockup drawn in SVG/CSS */}
          <div
            aria-hidden="true"
            className="hidden lg:block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] overflow-hidden"
          >
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="p-4 font-mono text-[11px]">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-3 h-3 rounded-full bg-[oklch(0.55_0.20_25)]" />
        <span className="w-3 h-3 rounded-full bg-[oklch(0.65_0.18_75)]" />
        <span className="w-3 h-3 rounded-full bg-[oklch(0.55_0.15_145)]" />
        <span className="ml-3 text-[var(--color-text-faint)]">dashboard — SaasStarter</span>
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: "MRR", value: "$12,480", delta: "+8.2%", up: true },
          { label: "Users", value: "1,847", delta: "+12.4%", up: true },
          { label: "Churn", value: "2.1%", delta: "-0.3%", up: false },
          { label: "NPS", value: "67", delta: "+4", up: true },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="p-2 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-border)]"
          >
            <p className="text-[var(--color-text-faint)] mb-0.5">{kpi.label}</p>
            <p className="text-[var(--color-text)] font-semibold">{kpi.value}</p>
            <p
              className="text-[10px]"
              style={{
                color: kpi.up ? "var(--color-success)" : "var(--color-error)",
              }}
            >
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>
      {/* Chart placeholder */}
      <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-border)] h-28 mb-3 flex items-end p-2 gap-1">
        {[40, 55, 45, 65, 70, 60, 80, 75, 90, 85, 95, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                "oklch(from var(--color-primary) l c h / 0.35)",
            }}
          />
        ))}
      </div>
      {/* Activity rows */}
      {["User signed up · just now", "Invoice paid · 2m ago", "Project created · 5m ago"].map(
        (item) => (
          <div
            key={item}
            className="flex items-center gap-2 py-1 border-b border-[var(--color-border)] last:border-0"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-[var(--color-text-muted)] truncate">{item}</span>
          </div>
        )
      )}
    </div>
  );
}
