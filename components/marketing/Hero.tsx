import Link from "next/link";
import { ArrowRight, Github, Star, Check, Zap } from "lucide-react";

/* ─── Types ─────────────────────────────── */

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

/* ─── Hero ───────────────────────────────── */

export function Hero() {
  const pills = [
    "Next.js 15",
    "Prisma ORM",
    "Stripe Billing",
    "NextAuth v5",
    "Resend Email",
  ];

  return (
    <>
      {/* Inject CSS vars that flip between light/dark — avoids any JS theme hook */}
      <style>{`
        :root, [data-theme="light"] {
          --hero-dot-color: oklch(0.45 0.06 285 / 0.38);
          --hero-glow-primary: oklch(0.52 0.22 285 / 0.10);
          --hero-glow-card: oklch(0.52 0.22 285 / 0.11);
        }
        [data-theme="dark"] {
          --hero-dot-color: oklch(0.72 0.08 285 / 0.28);
          --hero-glow-primary: oklch(0.52 0.22 285 / 0.14);
          --hero-glow-card: oklch(0.52 0.22 285 / 0.16);
        }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme]) {
            --hero-dot-color: oklch(0.72 0.08 285 / 0.28);
            --hero-glow-primary: oklch(0.52 0.22 285 / 0.14);
            --hero-glow-card: oklch(0.52 0.22 285 / 0.16);
          }
        }
      `}</style>

      <section
        className="relative"
        aria-labelledby="hero-heading"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "var(--color-bg)",
          overflow: "hidden",
        }}
      >
        {/* ── Background ── */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

          {/* Dot grid — uses CSS var so it works in both themes */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(var(--hero-dot-color) 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 72% at 60% 50%, black 0%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 72% 72% at 60% 50%, black 0%, transparent 100%)",
            }}
          />

          {/* Accent glow — upper right */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: "55%",
              height: "70%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 70% 30%, var(--hero-glow-primary) 0%, transparent 65%)",
            }}
          />

          {/* Bottom fade to bg */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to bottom, transparent, var(--color-bg))",
            }}
          />
        </div>

        {/* ── Content ── */}
        <div
          style={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "7rem 1.5rem 6rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* ── Left copy ── */}
            <div style={{ maxWidth: "520px" }}>

              {/* Changelog pill */}
              <Link
                href="/changelog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "2rem",
                  padding: "5px 14px 5px 6px",
                  borderRadius: "9999px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    background: "oklch(0.52 0.22 285 / 0.12)",
                    color: "var(--color-primary)",
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  <Zap size={9} />
                  New
                </span>
                v1.0 — Prisma Pulse real-time sync
                <ArrowRight size={11} />
              </Link>

              {/* Eyebrow */}
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-text-faint)",
                  marginBottom: "1rem",
                }}
              >
                Next.js SaaS Starter
              </p>

              {/* Headline */}
              <h1
                id="hero-heading"
                style={{
                  fontSize: "clamp(2.6rem, 1.4rem + 3.2vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.04,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text)",
                  marginBottom: "1.5rem",
                }}
              >
                Ship your SaaS
                <br />
                <span style={{ color: "var(--color-primary)" }}>in days,</span>
                {" "}not months.
              </h1>

              {/* Sub-copy */}
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-muted)",
                  maxWidth: "40ch",
                  marginBottom: "2rem",
                }}
              >
                Everything you need to go from idea to paying customers — auth,
                billing, email, analytics. Production-grade, fully typed.
              </p>

              {/* Stack pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "2.5rem" }}>
                {pills.map((pill) => (
                  <span
                    key={pill}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <Check size={9} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                    {pill}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "2.5rem",
                }}
              >
                <Link
                  href="/register"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    borderRadius: "8px",
                    background: "var(--color-text)",
                    color: "var(--color-bg)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Get started free
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="https://github.com/devhariss/saas-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Github size={14} />
                  View on GitHub
                  <span
                    style={{
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: "var(--color-surface-offset)",
                      color: "var(--color-text-faint)",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    MIT
                  </span>
                </a>
              </div>

              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex" }}>
                  {([285, 192, 145, 75, 25] as number[]).map((hue, i) => (
                    <div
                      key={hue}
                      aria-hidden="true"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        fontWeight: 700,
                        background: `oklch(0.50 0.14 ${hue})`,
                        color: "#fff",
                        outline: "2px solid var(--color-bg)",
                        marginLeft: i > 0 ? "-8px" : 0,
                      }}
                    >
                      {["J","A","R","P","T"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
                    {([...Array(5)] as undefined[]).map((_, i) => (
                      <Star key={i} size={11} style={{ fill: "oklch(0.78 0.18 75)", color: "oklch(0.78 0.18 75)" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--color-text-faint)", margin: 0 }}>
                    <strong style={{ color: "var(--color-text-muted)", fontWeight: 600 }}>2,400+</strong> devs already shipped
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: mockup ── */}
            <div aria-hidden="true" style={{ position: "relative" }}>
              {/* Card glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-24px",
                  borderRadius: "24px",
                  background: "radial-gradient(ellipse at 50% 40%, var(--hero-glow-card) 0%, transparent 65%)",
                  zIndex: 0,
                }}
              />
              {/* Dashboard card */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  boxShadow: "0 1px 3px oklch(0 0 0 / 0.08), 0 12px 40px oklch(0 0 0 / 0.16)",
                }}
              >
                <DashboardMockup />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Dashboard Mockup ─────────────────────────── */

function DashboardMockup() {
  const kpis: KpiItem[] = [
    { label: "MRR",   value: "$12,480", delta: "+8.2%",  up: true  },
    { label: "Users", value: "1,847",   delta: "+12.4%", up: true  },
    { label: "Churn", value: "2.1%",    delta: "-0.3%",  up: false },
    { label: "NPS",   value: "67",      delta: "+4",     up: true  },
  ];

  const barHeights: number[] = [38,52,44,63,58,72,68,81,76,88,84,96];
  const barOpacities: number[] = [0.18,0.22,0.20,0.28,0.25,0.32,0.30,0.38,0.34,0.42,0.40,1.00];
  const months: string[] = ["J","F","M","A","M","J","J","A","S","O","N","D"];

  const activity: ActivityRow[] = [
    { dot: "oklch(0.62 0.15 145)", text: "New user · sarah@nexaflow.io",     time: "now" },
    { dot: "oklch(0.62 0.20 285)", text: "Invoice paid · $49 · Pro plan",    time: "2m"  },
    { dot: "oklch(0.62 0.15 192)", text: "Webhook synced · stripe.checkout", time: "5m"  },
  ];

  const navItems = [
    { label: "Overview", active: true  },
    { label: "Revenue",  active: false },
    { label: "Users",    active: false },
    { label: "Settings", active: false },
  ];

  return (
    <div style={{ background: "var(--color-surface)", fontSize: "0" }}>

      {/* Window chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 14px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          {["oklch(0.62 0.20 25)","oklch(0.70 0.18 75)","oklch(0.58 0.15 145)"].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            padding: "3px 10px",
            borderRadius: "5px",
            background: "var(--color-surface-offset)",
            fontSize: "10px",
            color: "var(--color-text-faint)",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          app.saastarter.dev/dashboard
        </div>
      </div>

      {/* App body */}
      <div style={{ display: "flex" }}>

        {/* Sidebar */}
        <div
          style={{
            width: "120px",
            flexShrink: 0,
            padding: "12px 8px",
            borderRight: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {navItems.map((item) => (
            <div
              key={item.label}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: item.active ? 600 : 400,
                color: item.active ? "var(--color-text)" : "var(--color-text-faint)",
                background: item.active ? "var(--color-surface-offset)" : "transparent",
                border: item.active ? "1px solid var(--color-border)" : "1px solid transparent",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ flex: 1, padding: "12px", minWidth: 0 }}>

          <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text)", marginBottom: "10px" }}>
            Overview
          </p>

          {/* KPI grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p style={{ fontSize: "9px", color: "var(--color-text-faint)", marginBottom: "4px" }}>{kpi.label}</p>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text)", fontVariantNumeric: "tabular-nums" }}>{kpi.value}</p>
                <p style={{ fontSize: "9px", fontWeight: 600, marginTop: "2px", color: kpi.up ? "oklch(0.58 0.15 145)" : "oklch(0.62 0.20 25)" }}>{kpi.delta}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            style={{
              padding: "10px",
              borderRadius: "8px",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-text-muted)" }}>Revenue &middot; 2025</p>
              <span style={{ fontSize: "9px", fontWeight: 600, padding: "2px 6px", borderRadius: "4px", background: "oklch(0.55 0.15 145 / 0.12)", color: "oklch(0.58 0.15 145)" }}>
                +34.2%
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "56px" }}>
              {barHeights.map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${h}%`,
                      borderRadius: "2px",
                      background: `oklch(0.52 0.22 285 / ${barOpacities[i]})`,
                    }}
                  />
                  <span style={{ fontSize: "7px", color: "var(--color-text-faint)" }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <p style={{ padding: "6px 10px", fontSize: "10px", fontWeight: 600, color: "var(--color-text-muted)", background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-border)" }}>
              Live activity
            </p>
            {activity.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 10px",
                  fontSize: "10px",
                  background: "var(--color-surface-2)",
                  borderBottom: i < activity.length - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: row.dot, flexShrink: 0 }} />
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--color-text-muted)" }}>
                  {row.text}
                </span>
                <span style={{ color: "var(--color-text-faint)", flexShrink: 0 }}>{row.time}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
