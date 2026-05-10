import Link from 'next/link';
import { Github, Twitter, ArrowUpRight } from 'lucide-react';

const themeVars = `
  :root,[data-theme="light"]{ --ft-dot:oklch(0.45 0.06 285 / 0.20); }
  [data-theme="dark"]       { --ft-dot:oklch(0.72 0.08 285 / 0.10); }
  @media(prefers-color-scheme:dark){:root:not([data-theme]){--ft-dot:oklch(0.72 0.08 285 / 0.10);}}
  @media(max-width:767px){
    .ft-grid { grid-template-columns: 1fr 1fr !important; }
    .ft-brand { grid-column: 1/-1 !important; }
  }
`;

const cols = [
  { heading: 'Product',    links: [{ l:'Features',href:'/#features'},{l:'Pricing',href:'/#pricing'},{l:'Changelog',href:'/changelog'},{l:'Roadmap',href:'/changelog'}] },
  { heading: 'Developers', links: [{ l:'Docs',href:'/docs'},{l:'GitHub',href:'https://github.com/devhariss/saas-starter'},{l:'Blog',href:'/blog'}] },
  { heading: 'Company',    links: [{ l:'About',href:'/about'},{l:'Contact',href:'/contact'}] },
  { heading: 'Legal',      links: [{ l:'Privacy',href:'/privacy'},{l:'Terms',href:'/terms'},{l:'Cookies',href:'/cookies'}] },
];

const badges = [
  { label: 'GDPR',  hue: 145, title: 'GDPR Compliant'     },
  { label: 'SOC 2', hue: 192, title: 'SOC 2 Type II'       },
  { label: '100⚡', hue: 75,  title: 'Lighthouse Score'    },
  { label: 'MIT',   hue: 285, title: 'MIT Licensed'        },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer aria-label="Site footer" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
      <style>{themeVars}</style>

      {/* dot grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(var(--ft-dot) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 100% 100% at 50% 100%, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 100%, black 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px 0', position: 'relative', zIndex: 1 }}>

        {/* Divider with gradient */}
        <div aria-hidden="true" style={{
          height: 1, marginBottom: 56,
          background: 'linear-gradient(to right, transparent, oklch(0.62 0.20 285 / 0.25) 30%, oklch(0.62 0.20 192 / 0.20) 70%, transparent)',
        }} />

        {/* Main grid */}
        <div className="ft-grid" style={{ display: 'grid', gridTemplateColumns: '240px repeat(4,1fr)', gap: '40px 24px', marginBottom: 60 }}>

          {/* Brand */}
          <div className="ft-brand">
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', marginBottom: 14 }}>
              <span style={{
                width: 30, height: 30, borderRadius: 9,
                background: 'linear-gradient(135deg, oklch(0.52 0.22 285), oklch(0.58 0.20 192))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px oklch(0.52 0.22 285 / 0.30)',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2v10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-.03em', color: 'var(--color-text)' }}>
                SaaS<span style={{ color: 'oklch(0.62 0.20 285)' }}>Starter</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--color-text-faint)', lineHeight: 1.75, maxWidth: '24ch', margin: '0 0 20px' }}>
              Production-ready Next.js 15 SaaS starter. Auth, billing, email, and analytics — all wired up.
            </p>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ href: 'https://github.com/devhariss/saas-starter', Icon: Github, label: 'GitHub' }, { href: 'https://twitter.com', Icon: Twitter, label: 'Twitter' }].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 34, height: 34, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text-faint)', textDecoration: 'none',
                }}><Icon size={15} aria-hidden="true" /></a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase', color: 'var(--color-text)', marginBottom: 16 }}>{heading}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(({ l, href }) => (
                  <li key={l}>
                    <Link href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13, color: 'var(--color-text-faint)', textDecoration: 'none' }}
                    >
                      {l}{href.startsWith('http') && <ArrowUpRight size={10} style={{ opacity: 0.5 }} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', padding: '20px 0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-faint)', margin: 0 }}>&copy; {year} SaasStarter. MIT Licensed.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {badges.map(b => (
              <span key={b.label} title={b.title} style={{
                padding: '3px 10px', borderRadius: 6,
                fontSize: 10.5, fontWeight: 700,
                background: `oklch(0.52 0.18 ${b.hue} / 0.09)`,
                color: `oklch(0.65 0.18 ${b.hue})`,
                border: `1px solid oklch(0.52 0.18 ${b.hue} / 0.20)`,
              }}>{b.label}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
