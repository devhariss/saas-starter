// components/marketing/CTA.tsx
import Link from 'next/link';
import { ArrowRight, Github, Star, Zap, Shield, Clock } from 'lucide-react';

const themeVars = `
  :root, [data-theme="light"] {
    --cta-dot: oklch(0.45 0.06 285 / 0.40);
    --cta-glow-a: oklch(0.52 0.22 285 / 0.18);
    --cta-glow-b: oklch(0.55 0.20 192 / 0.12);
    --cta-border-glow: oklch(0.62 0.20 285 / 0.55);
    --cta-card-bg: oklch(0.97 0.005 285);
  }
  [data-theme="dark"] {
    --cta-dot: oklch(0.72 0.08 285 / 0.22);
    --cta-glow-a: oklch(0.52 0.22 285 / 0.22);
    --cta-glow-b: oklch(0.55 0.20 192 / 0.14);
    --cta-border-glow: oklch(0.72 0.20 285 / 0.70);
    --cta-card-bg: oklch(0.13 0.010 285);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --cta-dot: oklch(0.72 0.08 285 / 0.22);
      --cta-glow-a: oklch(0.52 0.22 285 / 0.22);
      --cta-glow-b: oklch(0.55 0.20 192 / 0.14);
      --cta-border-glow: oklch(0.72 0.20 285 / 0.70);
      --cta-card-bg: oklch(0.13 0.010 285);
    }
  }

  @keyframes cta-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes cta-pulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.04); }
  }
`;

const badges = [
  { icon: Zap,    label: 'Ships in minutes' },
  { icon: Shield, label: 'GDPR compliant'   },
  { icon: Clock,  label: '14-day free trial' },
];

export function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 0 8rem',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{themeVars}</style>

      {/* full-section dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(var(--cta-dot) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* dual ambient glows */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '10%', left: '15%',
          width: '40%', height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, var(--cta-glow-a) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '20%', right: '10%',
          width: '35%', height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, var(--cta-glow-b) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* ── Central card ── */}
      <div
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Glowing border card wrapper */}
        <div
          style={{
            position: 'relative',
            borderRadius: 24,
            padding: 2,
            background: 'linear-gradient(135deg, var(--cta-border-glow) 0%, var(--color-border) 40%, var(--cta-border-glow) 100%)',
            boxShadow: '0 0 60px oklch(0.52 0.22 285 / 0.15), 0 0 120px oklch(0.52 0.22 285 / 0.08)',
            animation: 'cta-pulse 4s ease-in-out infinite',
          }}
        >
          {/* Spinning conic gradient overlay for animated border */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: 26,
              overflow: 'hidden',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '200%', height: '200%',
                background: 'conic-gradient(from 0deg, transparent 0deg, oklch(0.68 0.22 285 / 0.6) 60deg, transparent 120deg)',
                animation: 'cta-spin 4s linear infinite',
                zIndex: 0,
              }}
            />
          </div>

          {/* Inner card */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: 22,
              background: 'var(--cta-card-bg)',
              padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 6vw, 4rem)',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            {/* inner card glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-30%', left: '50%',
                transform: 'translateX(-50%)',
                width: '80%', height: '60%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at 50% 0%, oklch(0.52 0.22 285 / 0.14) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top accent line */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0, left: '20%', right: '20%',
                height: 1,
                background: 'linear-gradient(to right, transparent, var(--cta-border-glow) 50%, transparent)',
              }}
            />

            {/* Badge pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 14px',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                background: 'oklch(0.52 0.22 285 / 0.12)',
                color: 'var(--color-accent)',
                border: '1px solid oklch(0.52 0.22 285 / 0.25)',
                marginBottom: 28,
              }}
            >
              <Zap size={10} aria-hidden="true" />
              Free forever · No credit card
            </div>

            {/* Headline */}
            <h2
              id="cta-heading"
              style={{
                fontSize: 'clamp(2rem, 1.2rem + 3vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                color: 'var(--color-text)',
                margin: '0 0 20px',
              }}
            >
              Ship your SaaS
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, oklch(0.68 0.22 285) 0%, oklch(0.72 0.18 192) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                before lunch.
              </span>
            </h2>

            {/* Sub-copy */}
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                maxWidth: '46ch',
                margin: '0 auto 36px',
              }}
            >
              Clone the repo, set your env vars, and have a production-ready SaaS
              running in minutes — auth, billing, and compliance included.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 12,
                marginBottom: 40,
              }}
            >
              <Link
                href="/sign-up"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 28px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  background: 'var(--color-text)',
                  color: 'var(--color-bg)',
                  textDecoration: 'none',
                  transition: 'filter 0.15s, transform 0.15s',
                  boxShadow: '0 2px 8px oklch(0 0 0 / 0.20), 0 8px 24px oklch(0.52 0.22 285 / 0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                Start building free
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <a
                href="https://github.com/devhariss/saas-starter"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 24px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, background 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Github size={15} aria-hidden="true" />
                View on GitHub
                <span
                  style={{
                    padding: '2px 7px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    background: 'oklch(0.52 0.22 285 / 0.10)',
                    color: 'var(--color-accent)',
                    border: '1px solid oklch(0.52 0.22 285 / 0.18)',
                  }}
                >
                  MIT
                </span>
              </a>
            </div>

            {/* Feature badges row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 36,
              }}
            >
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <Icon size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>

            {/* Social proof strip */}
            <div
              style={{
                paddingTop: 28,
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
              }}
            >
              {/* Avatars */}
              <div style={{ display: 'flex' }}>
                {([285, 192, 145, 75, 25] as number[]).map((hue, i) => (
                  <div
                    key={hue}
                    aria-hidden="true"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      background: `oklch(0.50 0.14 ${hue})`,
                      color: '#fff',
                      outline: '2px solid var(--cta-card-bg)',
                      marginLeft: i > 0 ? -8 : 0,
                      zIndex: 5 - i,
                      position: 'relative',
                    }}
                  >
                    {['J', 'A', 'R', 'P', 'T'][i]}
                  </div>
                ))}
              </div>

              {/* Stars + text */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                  {(Array.from({ length: 5 }) as undefined[]).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      aria-hidden="true"
                      style={{ fill: 'oklch(0.78 0.18 75)', color: 'oklch(0.78 0.18 75)' }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>
                  <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>2,400+</strong>
                  {' '}developers already shipped with this
                </p>
              </div>

              {/* Separator */}
              <div
                aria-hidden="true"
                style={{
                  width: 1, height: 28,
                  background: 'var(--color-border)',
                }}
                className="cta-sep"
              />

              {/* MIT badge */}
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>
                MIT licensed &middot; Deploy to Vercel in{' '}
                <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>under 2 minutes</strong>
              </p>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .cta-sep { display: none !important; }
        }
      `}</style>
    </section>
  );
}
