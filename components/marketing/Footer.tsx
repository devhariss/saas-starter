import Link from 'next/link';
import { Github, Twitter, Star } from 'lucide-react';

const themeVars = `
  :root, [data-theme="light"] {
    --footer-dot: oklch(0.45 0.06 285 / 0.28);
  }
  [data-theme="dark"] {
    --footer-dot: oklch(0.72 0.08 285 / 0.14);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) { --footer-dot: oklch(0.72 0.08 285 / 0.14); }
  }
  @media (max-width: 767px) {
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .footer-brand { grid-column: 1 / -1 !important; }
  }
`;

const cols = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',   href: '/#features'  },
      { label: 'Pricing',    href: '/#pricing'   },
      { label: 'Changelog',  href: '/changelog'  },
      { label: 'Roadmap',    href: '/changelog'  },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Documentation', href: '/docs'  },
      { label: 'GitHub',        href: 'https://github.com/devhariss/saas-starter' },
      { label: 'Blog',          href: '/blog'  },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '/about'   },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',   href: '/privacy' },
      { label: 'Terms of Service', href: '/terms'   },
      { label: 'Cookie Policy',    href: '/cookies' },
    ],
  },
];

const socialLinks = [
  { href: 'https://github.com/devhariss/saas-starter', Icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com', Icon: Twitter, label: 'Twitter' },
];

const badges = [
  { label: 'GDPR',  title: 'GDPR Compliant',       hue: 145 },
  { label: 'SOC 2', title: 'SOC 2 Type II',         hue: 192 },
  { label: '100⚡', title: 'Lighthouse Score 100',  hue: 75  },
  { label: 'MIT',   title: 'MIT Licensed',          hue: 285 },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{themeVars}</style>

      {/* Subtle dot grid — lighter than sections */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(var(--footer-dot) 1.2px, transparent 1.2px)',
        backgroundSize: '28px 28px',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 100%, black 0%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse 100% 100% at 50% 100%, black 0%, transparent 75%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0', position: 'relative', zIndex: 1 }}>

        {/* Top accent line */}
        <div aria-hidden="true" style={{
          height: 1, marginBottom: 52,
          background: 'linear-gradient(to right, transparent, oklch(0.62 0.20 285 / 0.20) 50%, transparent)',
        }} />

        {/* Main grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '220px repeat(4, 1fr)',
            gap: '40px 32px',
            marginBottom: 56,
          }}
        >
          {/* Brand col */}
          <div className="footer-brand">
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 14 }} aria-label="SaasStarter home">
              <FooterLogo />
              <span style={{ fontWeight: 700, letterSpacing: '-0.03em', fontSize: 15, color: 'var(--color-text)' }}>
                SaaS<span style={{ color: 'var(--color-accent)' }}>Starter</span>
              </span>
            </Link>

            <p style={{ fontSize: 13, color: 'var(--color-text-faint)', lineHeight: 1.7, maxWidth: '22ch', margin: '0 0 20px' }}>
              Production-ready Next.js 15 SaaS starter. Auth, billing, email, analytics — all wired up.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 6 }}>
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-faint)',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <p style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.10em', textTransform: 'uppercase',
                color: 'var(--color-text)', marginBottom: 16,
              }}>
                {heading}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }} role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: 13, color: 'var(--color-text-faint)', textDecoration: 'none', transition: 'color 0.15s' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          padding: '20px 0 28px',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 16,
        }}>
          {/* Copyright + GitHub */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <p style={{ fontSize: 12, color: 'var(--color-text-faint)', margin: 0 }}>
              &copy; {year} SaasStarter. MIT Licensed.
            </p>
            <a
              href="https://github.com/devhariss/saas-starter"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 12, color: 'var(--color-text-faint)',
                textDecoration: 'none', transition: 'color 0.15s',
              }}
            >
              <Github size={12} aria-hidden="true" />
              <Star size={10} style={{ fill: 'oklch(0.78 0.18 75)', color: 'oklch(0.78 0.18 75)' }} aria-hidden="true" />
              Star on GitHub
            </a>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {badges.map((b) => (
              <span
                key={b.label}
                title={b.title}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 10px', borderRadius: 6,
                  fontSize: 10, fontWeight: 700,
                  background: `oklch(0.52 0.18 ${b.hue} / 0.08)`,
                  color: `oklch(0.68 0.18 ${b.hue})`,
                  border: `1px solid oklch(0.52 0.18 ${b.hue} / 0.18)`,
                  letterSpacing: '0.04em',
                }}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="footergrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.52 0.22 285)" />
          <stop offset="100%" stopColor="oklch(0.62 0.18 192)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#footergrad)" />
      <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
