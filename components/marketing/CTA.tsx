import Link from 'next/link';
import { ArrowRight, Github, Sparkles } from 'lucide-react';

const themeVars = `
  :root,[data-theme="light"]{
    --cta-beam: oklch(0.52 0.22 285 / 0.12);
    --cta-beam2: oklch(0.55 0.20 192 / 0.08);
    --cta-grid: oklch(0.50 0.04 285 / 0.07);
  }
  [data-theme="dark"]{
    --cta-beam: oklch(0.52 0.22 285 / 0.20);
    --cta-beam2: oklch(0.55 0.20 192 / 0.14);
    --cta-grid: oklch(0.70 0.04 285 / 0.05);
  }
  @media(prefers-color-scheme:dark){:root:not([data-theme]){
    --cta-beam:oklch(0.52 0.22 285 / 0.20);
    --cta-beam2:oklch(0.55 0.20 192 / 0.14);
    --cta-grid:oklch(0.70 0.04 285 / 0.05);
  }}
`;

export function CTA() {
  return (
    <section aria-labelledby="cta-heading"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '8rem 0 9rem',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{themeVars}</style>

      {/* Grid lines */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(var(--cta-grid) 1px, transparent 1px), linear-gradient(90deg, var(--cta-grid) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Violet beam */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '80%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 0%, var(--cta-beam) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Teal beam */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-20%', right: '-10%',
        width: '50%', height: '60%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 70% 70%, var(--cta-beam2) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Hard centre light */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: '60%',
        background: 'linear-gradient(to bottom, oklch(0.62 0.20 285 / 0.50), transparent)',
        filter: 'blur(1px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 14px', borderRadius: 9999,
          background: 'oklch(0.52 0.22 285 / 0.09)',
          border: '1px solid oklch(0.52 0.22 285 / 0.22)',
          color: 'oklch(0.65 0.20 285)',
          fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
          marginBottom: 28,
        }}>
          <Sparkles size={11} aria-hidden="true" /> Ready to ship?
        </div>

        {/* Headline */}
        <h2 id="cta-heading" style={{
          fontSize: 'clamp(2.4rem, 1.4rem + 3vw, 4.2rem)',
          fontWeight: 900, letterSpacing: '-.05em', lineHeight: 1.0,
          color: 'var(--color-text)', margin: '0 0 1.5rem',
        }}>
          Stop building{' '}
          <span style={{
            background: 'linear-gradient(135deg, oklch(0.62 0.22 285) 0%, oklch(0.62 0.20 192) 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>boilerplate.</span>
          <br />
          Start shipping product.
        </h2>

        {/* Sub */}
        <p style={{
          fontSize: '1.125rem', lineHeight: 1.7,
          color: 'var(--color-text-muted)',
          maxWidth: '48ch', margin: '0 auto 2.75rem',
        }}>
          Clone the repo, set your env vars, deploy to Vercel. Your SaaS is live in under 10 minutes.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '3rem' }}>
          <Link href="/sign-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 28px', borderRadius: 12,
            fontSize: 15.5, fontWeight: 700,
            background: 'linear-gradient(135deg, oklch(0.52 0.22 285), oklch(0.52 0.20 192))',
            color: 'white', textDecoration: 'none',
            boxShadow: '0 6px 28px oklch(0.52 0.22 285 / 0.42)',
            letterSpacing: '-.01em',
          }}>
            Get started for free <ArrowRight size={16} />
          </Link>
          <a href="https://github.com/devhariss/saas-starter" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 24px', borderRadius: 12,
            fontSize: 15.5, fontWeight: 500,
            color: 'var(--color-text)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            textDecoration: 'none',
          }}><Github size={16} /> Star on GitHub</a>
        </div>

        {/* Fine print */}
        <p style={{ fontSize: 13, color: 'var(--color-text-faint)' }}>
          MIT licensed · No credit card · Deploy in &lt;10 min
        </p>
      </div>
    </section>
  );
}
