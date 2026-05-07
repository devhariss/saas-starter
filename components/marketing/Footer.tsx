import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const links = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/changelog" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "GitHub", href: "https://github.com/devhariss/saas-starter" },
    { label: "Blog", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-[220px_1fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="SaasStarter home">
              <Logo className="w-6 h-6" />
              <span
                className="font-display font-semibold"
                style={{ fontSize: "var(--text-base)", color: "var(--color-text)" }}
              >
                SaasStarter
              </span>
            </Link>
            <p
              className="mb-5 max-w-[22ch]"
              style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)", lineHeight: 1.7 }}
            >
              Production-ready Next.js 15 SaaS starter. Ship faster.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/devhariss/saas-starter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="p-2 rounded-[var(--radius-md)] transition-colors hover:bg-[var(--color-surface-offset)]"
                style={{ color: "var(--color-text-faint)" }}
              >
                <Github size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p
                className="font-semibold mb-4"
                style={{ fontSize: "var(--text-xs)", color: "var(--color-text)", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {group}
              </p>
              <ul className="space-y-2.5" role="list">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="transition-colors hover:text-[var(--color-text)]"
                      style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
            &copy; {new Date().getFullYear()} SaasStarter. MIT Licensed.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "GDPR", title: "GDPR Compliant" },
              { label: "SOC 2", title: "SOC 2 Type II" },
              { label: "100", title: "Lighthouse Score 100" },
            ].map((badge) => (
              <span
                key={badge.label}
                title={badge.title}
                className="px-2.5 py-1 rounded-full font-semibold"
                style={{
                  fontSize: "10px",
                  background: "var(--color-surface-offset)",
                  color: "var(--color-text-faint)",
                  border: "1px solid var(--color-border)",
                  letterSpacing: "0.04em",
                }}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
