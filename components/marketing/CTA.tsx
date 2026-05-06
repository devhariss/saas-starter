import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[800px] px-6 text-center">
        <h2
          className="font-display font-semibold text-[var(--color-text)] mb-4 leading-tight"
          style={{ fontSize: "clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)" }}
        >
          Ready to ship?
        </h2>
        <p className="text-[var(--text-base)] text-[var(--color-text-muted)] mb-10 max-w-[44ch] mx-auto">
          Clone the repo, set your env vars, and have a production-ready SaaS
          running before lunch.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
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
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
