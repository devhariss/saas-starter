// components/marketing/SocialProof.tsx
import { Star, Quote } from 'lucide-react';

/* ─── CSS vars (injected once, flip per theme) ─── */
const themeVars = `
  :root, [data-theme="light"] {
    --sp-dot-color: oklch(0.45 0.06 285 / 0.38);
    --sp-glow: oklch(0.52 0.22 285 / 0.08);
  }
  [data-theme="dark"] {
    --sp-dot-color: oklch(0.72 0.08 285 / 0.22);
    --sp-glow: oklch(0.52 0.22 285 / 0.13);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --sp-dot-color: oklch(0.72 0.08 285 / 0.22);
      --sp-glow: oklch(0.52 0.22 285 / 0.13);
    }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .sp-marquee {
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite;
  }
  .sp-marquee:hover { animation-play-state: paused; }
`;

/* ─── Data ─────────────────────────────────────── */
const logos = [
  { name: 'Vercel',     initials: '▲',  hue: 270 },
  { name: 'Supabase',   initials: 'SB', hue: 155 },
  { name: 'Stripe',     initials: 'S',  hue: 250 },
  { name: 'Resend',     initials: 'RE', hue: 20  },
  { name: 'Prisma',     initials: 'Δ',  hue: 220 },
  { name: 'NexaFlow',   initials: 'NF', hue: 285 },
  { name: 'Gridcraft',  initials: 'GC', hue: 192 },
  { name: 'TrustLayer', initials: 'TL', hue: 145 },
];

const stats = [
  { value: '2,400+',  label: 'developers using this',          hue: 285 },
  { value: '11 days', label: 'avg. time to first paying user',  hue: 192 },
  { value: '100',     label: 'Lighthouse score',               hue: 145 },
  { value: 'MIT',     label: 'open source license',            hue: 75  },
];

const testimonials = [
  {
    quote: 'We went from idea to paying customers in 11 days. The auth and billing setup alone saved us a week of work.',
    name: 'Sarah Chen',
    role: 'CTO at NexaFlow',
    initials: 'SC',
    hue: 285,
    stars: 5,
  },
  {
    quote: 'The Lighthouse scores are real. Zero regressions in production. This is the template I wish I had three startups ago.',
    name: 'Marcus Reid',
    role: 'Founder at Gridcraft',
    initials: 'MR',
    hue: 192,
    stars: 5,
  },
  {
    quote: 'GDPR compliance was the part I was dreading most. It is just done. Cookie consent, data export, deletion — all there.',
    name: 'Priya Sharma',
    role: 'Head of Eng at TrustLayer',
    initials: 'PS',
    hue: 145,
    stars: 5,
  },
];

/* ─── Component ─────────────────────────────────── */
export function SocialProof() {
  const loopLogos = [...logos, ...logos];

  return (
    <section
      aria-labelledby="trusted-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 0',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{themeVars}</style>

      {/* ── bg dot grid ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(var(--sp-dot-color) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── ambient glow (matches Hero upper-right) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 30%, var(--sp-glow) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Section label ── */}
        <p
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--color-text-faint)',
            marginBottom: 40,
          }}
        >
          Trusted by teams building in public
        </p>

        {/* ── Logo marquee ── */}
        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '5rem' }}>
          {/* fade edges */}
          {(['left', 'right'] as const).map((side) => (
            <div
              key={side}
              aria-hidden="true"
              style={{
                position: 'absolute',
                insetBlock: 0,
                [side]: 0,
                width: 96,
                background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, var(--color-bg), transparent)`,
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          ))}
          <div className="sp-marquee" aria-label="Partner logos">
            {loopLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  margin: '0 32px',
                  userSelect: 'none',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    background: `oklch(0.52 0.18 ${logo.hue} / 0.12)`,
                    border: `1px solid oklch(0.52 0.18 ${logo.hue} / 0.22)`,
                    color: `oklch(0.72 0.15 ${logo.hue})`,
                  }}
                >
                  {logo.initials}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            marginBottom: '5rem',
            background: 'var(--color-surface)',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                position: 'relative',
                borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              {/* top accent line */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: 2,
                  borderRadius: 9999,
                  background: `linear-gradient(to right, transparent, oklch(0.62 0.18 ${stat.hue}) 50%, transparent)`,
                }}
              />
              <p
                style={{
                  fontSize: 'clamp(2rem, 1rem + 2vw, 2.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: `oklch(0.78 0.18 ${stat.hue})`,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.4,
                  maxWidth: '14ch',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Testimonials header ── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--color-accent)',
              marginBottom: 12,
            }}
          >
            Testimonials
          </p>
          <h2
            id="trusted-heading"
            style={{
              fontSize: 'clamp(1.8rem, 1rem + 2.5vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            Don&apos;t take our word for it
          </h2>
        </div>

        {/* ── Testimonial cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              style={{
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                padding: '28px',
                borderRadius: 16,
                background: 'var(--color-surface)',
                border: `1px solid oklch(0.52 0.18 ${t.hue} / 0.18)`,
                boxShadow: '0 1px 4px oklch(0 0 0 / 0.06), 0 8px 24px oklch(0 0 0 / 0.08)',
                position: 'relative',
                overflow: 'hidden',
                marginTop: i === 1 ? 32 : 0,
              }}
            >
              {/* top accent line */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '15%',
                  right: '15%',
                  height: 2,
                  borderRadius: 9999,
                  background: `linear-gradient(to right, transparent, oklch(0.62 0.18 ${t.hue}) 50%, transparent)`,
                }}
              />

              {/* Stars + quote icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{ display: 'flex', gap: 2 }}
                  aria-label={`${t.stars} out of 5 stars`}
                >
                  {(Array.from({ length: t.stars }) as undefined[]).map((_, s) => (
                    <Star
                      key={s}
                      size={13}
                      aria-hidden="true"
                      style={{ fill: 'oklch(0.78 0.18 75)', color: 'oklch(0.78 0.18 75)' }}
                    />
                  ))}
                </div>
                <Quote
                  size={18}
                  aria-hidden="true"
                  style={{ color: `oklch(0.52 0.18 ${t.hue} / 0.35)` }}
                />
              </div>

              {/* Quote */}
              <blockquote style={{ flex: 1, margin: 0 }}>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'var(--color-text-muted)',
                    margin: 0,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: `oklch(0.52 0.18 ${t.hue} / 0.12)`,
                }}
              />

              {/* Author */}
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    background: `oklch(0.52 0.20 ${t.hue} / 0.18)`,
                    border: `1px solid oklch(0.52 0.20 ${t.hue} / 0.28)`,
                    color: `oklch(0.78 0.18 ${t.hue})`,
                    boxShadow: `0 0 12px oklch(0.52 0.20 ${t.hue} / 0.15)`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 2px',
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
