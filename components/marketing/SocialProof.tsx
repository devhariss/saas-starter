// components/marketing/SocialProof.tsx
import { Star, Quote } from 'lucide-react';

const themeVars = `
  :root, [data-theme="light"] {
    --sp-dot-color: oklch(0.45 0.06 285 / 0.38);
    --sp-glow: oklch(0.52 0.22 285 / 0.08);
    --sp-logo-fill: oklch(0.25 0.02 285);
    --sp-logo-bg: oklch(0.93 0.005 285);
    --sp-logo-border: oklch(0.88 0.01 285);
    --sp-logo-name: oklch(0.35 0.04 285);
  }
  [data-theme="dark"] {
    --sp-dot-color: oklch(0.72 0.08 285 / 0.22);
    --sp-glow: oklch(0.52 0.22 285 / 0.13);
    --sp-logo-fill: oklch(0.88 0.01 285);
    --sp-logo-bg: oklch(0.16 0.012 285);
    --sp-logo-border: oklch(0.25 0.02 285);
    --sp-logo-name: oklch(0.72 0.04 285);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --sp-dot-color: oklch(0.72 0.08 285 / 0.22);
      --sp-glow: oklch(0.52 0.22 285 / 0.13);
      --sp-logo-fill: oklch(0.88 0.01 285);
      --sp-logo-bg: oklch(0.16 0.012 285);
      --sp-logo-border: oklch(0.25 0.02 285);
      --sp-logo-name: oklch(0.72 0.04 285);
    }
  }
  @keyframes marquee-fwd { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes marquee-rev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  .sp-row-fwd { display:flex; width:max-content; animation: marquee-fwd 36s linear infinite; }
  .sp-row-rev { display:flex; width:max-content; animation: marquee-rev 42s linear infinite; }
  .sp-row-fwd:hover, .sp-row-rev:hover { animation-play-state: paused; }
`;

/* ─── Brand SVG icons ──────────────────────────────── */
// All icons use currentColor so they inherit --sp-logo-fill via the wrapper div
const icons: Record<string, JSX.Element> = {
  Stripe: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M13.3 10.9c0-.9.7-1.2 1.9-1.2 1.7 0 3.8.5 5.5 1.4V6.4A14.6 14.6 0 0 0 15.2 5.5c-3.8 0-6.3 2-6.3 5.3 0 5.2 7.1 4.4 7.1 6.6 0 1-.9 1.4-2.1 1.4-1.8 0-4.2-.8-6-1.8v4.8c2 .9 4.1 1.2 6 1.2 3.9 0 6.5-1.9 6.5-5.3-.1-5.6-7.1-4.6-7.1-6.8z" fill="currentColor"/>
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M15.8 3.5 6.4 16.3h8.1v8.2l9.1-12.8h-7.8z" fill="currentColor"/>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4 26 24H2L14 4z" fill="currentColor"/>
    </svg>
  ),
  NextJS: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 19V9l10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.5 9v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Prisma: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 22.5 13 4l9 17-9-4.5L5 22.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      <path d="M13 4v12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Resend: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 9l10 8 10-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  NextAuth: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="7" y="12" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M10 12V9a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="14" cy="17.5" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M7 14c.8-3.3 2.8-5 6-5 4.5 0 5.3 3.3 7.5 3.8 1.7.4 3.2-.4 4.5-2.3C24.2 13.8 22.2 15.5 19 15.5c-4.5 0-5.3-3.3-7.5-3.8C9.8 11.3 8.3 12.1 7 14zM3 19.5c.8-3.3 2.8-5 6-5 4.5 0 5.3 3.3 7.5 3.8 1.7.4 3.2-.4 4.5-2.3-1.8 3.3-3.8 5-7 5-4.5 0-5.3-3.3-7.5-3.8C4.8 16.8 3.3 17.6 3 19.5z" fill="currentColor"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="22" height="22" rx="3" fill="currentColor" opacity="0.15"/>
      <path d="M6 10h10M11 10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 16.5c0-1.4 1-2.5 2.5-2.5S21 15.1 21 16.5c0 2-1.5 3-2.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="18.5" cy="21.5" r=".8" fill="currentColor"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <ellipse cx="14" cy="14" rx="10" ry="4" stroke="currentColor" strokeWidth="1.6"/>
      <ellipse cx="14" cy="14" rx="10" ry="4" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 14 14)"/>
      <ellipse cx="14" cy="14" rx="10" ry="4" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 14 14)"/>
      <circle cx="14" cy="14" r="2" fill="currentColor"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 3a11 11 0 0 0-3.5 21.4c.6.1.8-.2.8-.5v-2c-3.1.7-3.7-1.3-3.7-1.3-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.7 1 .7 2.1v3c0 .3.2.6.8.5A11 11 0 0 0 14 3z" fill="currentColor"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <ellipse cx="14" cy="9" rx="8" ry="4" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M6 9v10c0 2.2 3.6 4 8 4s8-1.8 8-4V9" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M6 14c0 2.2 3.6 4 8 4s8-1.8 8-4" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <ellipse cx="14" cy="19" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M5 19v-6" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M23 19v-6" stroke="currentColor" strokeWidth="1.7"/>
      <ellipse cx="14" cy="13" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M5 13V9" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M23 13V9" stroke="currentColor" strokeWidth="1.7"/>
      <ellipse cx="14" cy="9" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  ),
  Cloudflare: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M20 18.5H9a4 4 0 0 1 0-8 4 4 0 0 1 7.5-1.3A5 5 0 1 1 20 18.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M7 17l-3 2 3 2M21 17l3 2-3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 19h20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M9 7l2 8 3-5 3 5 2-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Linear: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 23 23 5M5 14.5 13.5 23M14.5 5 23 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
};

/* ─── Logo rows ──────────────────────────────────── */
const row1 = [
  { name: 'Stripe',     color: 'oklch(0.55 0.20 264)' },
  { name: 'Supabase',   color: 'oklch(0.58 0.18 152)' },
  { name: 'Vercel',     color: null },
  { name: 'NextJS',     color: null },
  { name: 'Prisma',     color: 'oklch(0.52 0.12 220)' },
  { name: 'Resend',     color: 'oklch(0.58 0.16 22)'  },
  { name: 'NextAuth',   color: 'oklch(0.55 0.20 285)' },
  { name: 'Tailwind',   color: 'oklch(0.60 0.15 200)' },
];

const row2 = [
  { name: 'TypeScript', color: 'oklch(0.52 0.18 240)' },
  { name: 'React',      color: 'oklch(0.62 0.16 200)' },
  { name: 'GitHub',     color: null },
  { name: 'PostgreSQL', color: 'oklch(0.52 0.15 240)' },
  { name: 'Redis',      color: 'oklch(0.55 0.20 25)'  },
  { name: 'Cloudflare', color: 'oklch(0.65 0.18 50)'  },
  { name: 'AWS',        color: 'oklch(0.65 0.18 55)'  },
  { name: 'Linear',     color: 'oklch(0.55 0.18 275)' },
];

/* display names override */
const displayName: Record<string, string> = {
  NextJS: 'Next.js',
  NextAuth: 'NextAuth',
  TypeScript: 'TypeScript',
  PostgreSQL: 'PostgreSQL',
};

/* ─── Other data ─────────────────────────────────── */
const stats = [
  { value: '2,400+',  label: 'developers using this',          hue: 285 },
  { value: '11 days', label: 'avg. time to first paying user',  hue: 192 },
  { value: '100',     label: 'Lighthouse score',               hue: 145 },
  { value: 'MIT',     label: 'open source license',            hue: 75  },
];

const testimonials = [
  {
    quote: 'We went from idea to paying customers in 11 days. The auth and billing setup alone saved us a week of work.',
    name: 'Sarah Chen', role: 'CTO at NexaFlow', initials: 'SC', hue: 285, stars: 5,
  },
  {
    quote: 'The Lighthouse scores are real. Zero regressions in production. This is the template I wish I had three startups ago.',
    name: 'Marcus Reid', role: 'Founder at Gridcraft', initials: 'MR', hue: 192, stars: 5,
  },
  {
    quote: 'GDPR compliance was the part I was dreading most. It is just done. Cookie consent, data export, deletion — all there.',
    name: 'Priya Sharma', role: 'Head of Eng at TrustLayer', initials: 'PS', hue: 145, stars: 5,
  },
];

/* ─── LogoChip ────────────────────────────────────── */
function LogoChip({ name, color }: { name: string; color: string | null }) {
  const label = displayName[name] ?? name;
  const iconColor = color ?? 'var(--sp-logo-fill)';
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 9,
        margin: '0 28px', userSelect: 'none', flexShrink: 0,
        padding: '7px 14px',
        borderRadius: 10,
        background: 'var(--sp-logo-bg)',
        border: '1px solid var(--sp-logo-border)',
      }}
    >
      <span
        style={{
          width: 20, height: 20, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: iconColor,
        }}
      >
        {icons[name]}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--sp-logo-name)' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Component ────────────────────────────────────── */
export function SocialProof() {
  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  return (
    <section
      aria-labelledby="trusted-heading"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '7rem 0',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{themeVars}</style>

      {/* dot grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(var(--sp-dot-color) 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', left: '50%',
        transform: 'translateX(-50%)',
        width: '60%', height: '50%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 30%, var(--sp-glow) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <p style={{
          textAlign: 'center', textTransform: 'uppercase',
          letterSpacing: '0.18em', fontSize: 11, fontWeight: 600,
          color: 'var(--color-text-faint)', marginBottom: 40,
        }}>
          Trusted by teams building with the best stack
        </p>

        {/* ── Dual-row marquee ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: '5rem' }}>
          {[{ items: loop1, cls: 'sp-row-fwd' }, { items: loop2, cls: 'sp-row-rev' }].map(({ items, cls }) => (
            <div key={cls} style={{ position: 'relative', overflow: 'hidden' }}>
              {/* fade edges */}
              {(['left','right'] as const).map((side) => (
                <div key={side} aria-hidden="true" style={{
                  position: 'absolute', insetBlock: 0, [side]: 0, width: 80,
                  background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, var(--color-bg), transparent)`,
                  zIndex: 2, pointerEvents: 'none',
                }} />
              ))}
              <div className={cls} aria-label="Technology logos">
                {items.map((logo, idx) => (
                  <LogoChip key={`${logo.name}-${idx}`} name={logo.name} color={logo.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid var(--color-border)',
          marginBottom: '5rem',
          background: 'var(--color-surface)',
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '2.5rem 1.5rem', textAlign: 'center',
              position: 'relative',
              borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: '20%', right: '20%',
                height: 2, borderRadius: 9999,
                background: `linear-gradient(to right, transparent, oklch(0.62 0.18 ${stat.hue}) 50%, transparent)`,
              }} />
              <p style={{
                fontSize: 'clamp(2rem, 1rem + 2vw, 2.8rem)',
                fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
                color: `oklch(0.78 0.18 ${stat.hue})`, marginBottom: 8,
              }}>{stat.value}</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.4, maxWidth: '14ch' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            textTransform: 'uppercase', letterSpacing: '0.18em',
            fontSize: 11, fontWeight: 600,
            color: 'var(--color-accent)', marginBottom: 12,
          }}>Testimonials</p>
          <h2 id="trusted-heading" style={{
            fontSize: 'clamp(1.8rem, 1rem + 2.5vw, 2.8rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--color-text)', margin: 0,
          }}>Don&apos;t take our word for it</h2>
        </div>

        {/* Testimonial cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <figure key={t.name} style={{
              margin: 0, display: 'flex', flexDirection: 'column', gap: 20,
              padding: 28, borderRadius: 16,
              background: 'var(--color-surface)',
              border: `1px solid oklch(0.52 0.18 ${t.hue} / 0.18)`,
              boxShadow: '0 1px 4px oklch(0 0 0 / 0.06), 0 8px 24px oklch(0 0 0 / 0.08)',
              position: 'relative', overflow: 'hidden',
              marginTop: i === 1 ? 32 : 0,
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: '15%', right: '15%',
                height: 2, borderRadius: 9999,
                background: `linear-gradient(to right, transparent, oklch(0.62 0.18 ${t.hue}) 50%, transparent)`,
              }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 2 }} aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={13} aria-hidden="true" style={{ fill: 'oklch(0.78 0.18 75)', color: 'oklch(0.78 0.18 75)' }} />
                  ))}
                </div>
                <Quote size={18} aria-hidden="true" style={{ color: `oklch(0.52 0.18 ${t.hue} / 0.35)` }} />
              </div>
              <blockquote style={{ flex: 1, margin: 0 }}>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-muted)', margin: 0 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <div style={{ height: 1, background: `oklch(0.52 0.18 ${t.hue} / 0.12)` }} />
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                  background: `oklch(0.52 0.20 ${t.hue} / 0.18)`,
                  border: `1px solid oklch(0.52 0.20 ${t.hue} / 0.28)`,
                  color: `oklch(0.78 0.18 ${t.hue})`,
                  boxShadow: `0 0 12px oklch(0.52 0.20 ${t.hue} / 0.15)`,
                }}>{t.initials}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', margin: '0 0 2px' }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
