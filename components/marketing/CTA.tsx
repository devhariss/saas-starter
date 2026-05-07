import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export function CTA() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ borderTop: "1px solid var(--color-border)" }}
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div style={{ background: "var(--color-bg)", position: "absolute", inset: 0 }} />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.52 0.22 285 / 0.3), transparent)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.52 0.22 285 / 0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.5 0.01 285 / 0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="mx-auto max-w-[760px] px-6 text-center">
        {/* Label */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[var(--text-xs)] font-semibold mb-6"
          style={{
            background: "oklch(0.52 0.22 285 / 0.08)",
            color: "var(--color-primary)",
            border: "1px solid oklch(0.52 0.22 285 / 0.15)",
          }}
        >
          Free forever · No credit card
        </div>

        <h2
          id="cta-heading"
          className="font-display font-semibold leading-tight mb-5"
          style={{ fontSize: "var(--text-xl)", color: "var(--color-text)" }}
        >
          Ready to ship your SaaS?
        </h2>
        <p
          className="mb-10 mx-auto max-w-[44ch] leading-relaxed"
          style={{ fontSize: "var(--text-base)", color: "var(--color-text-muted)" }}
        >
          Clone the repo, set your env vars, and have a production-ready SaaS running before
          lunch.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-md)] font-medium transition-all hover:-translate-y-px"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              fontSize: "var(--text-sm)",
              boxShadow:
                "0 1px 3px oklch(0.52 0.22 285 / 0.35), 0 4px 20px oklch(0.52 0.22 285 / 0.15)",
            }}
          >
            Start building free
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a
            href="https://github.com/devhariss/saas-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-md)] font-medium transition-all hover:bg-[var(--color-surface-offset)]"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              fontSize: "var(--text-sm)",
            }}
          >
            <Github size={15} aria-hidden="true" />
            View on GitHub
          </a>
        </div>

        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
          MIT licensed &middot; No vendor lock-in &middot; Deploy to Vercel in under 2 minutes
        </p>
      </div>
    </section>
  );
}
