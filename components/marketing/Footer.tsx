import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/changelog#roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/devhariss/saas-starter", external: true },
      { label: "Twitter / X", href: "https://twitter.com", external: true },
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo size={24} />
              <span className="text-[var(--text-sm)] font-semibold text-[var(--color-text)]">
                SaasStarter
              </span>
            </Link>
            <p className="text-[var(--text-xs)] text-[var(--color-text-faint)] max-w-[24ch]">
              Production-ready Next.js 15 SaaS boilerplate. MIT licensed.
            </p>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-[var(--text-xs)] font-semibold text-[var(--color-text)] uppercase tracking-widest mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-xs)] text-[var(--color-text-faint)]">
            © {new Date().getFullYear()} SaasStarter. Made with ♥ by YourCompany.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/cookies#withdraw"
              className="text-[var(--text-xs)] text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
            >
              Withdraw consent
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/devhariss/saas-starter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
              >
                <Github size={16} aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
              >
                <Twitter size={16} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
