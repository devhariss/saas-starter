'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, Sparkles, Zap } from 'lucide-react';

const themeVars = `
  :root,[data-theme="light"]{ --p-dot:oklch(0.45 0.06 285 / 0.28); }
  [data-theme="dark"]       { --p-dot:oklch(0.72 0.08 285 / 0.15); }
  @media(prefers-color-scheme:dark){:root:not([data-theme]){--p-dot:oklch(0.72 0.08 285 / 0.15);}}
  @media(max-width:767px){ .pricing-grid{ grid-template-columns:1fr!important; } }
`;

type Plan = {
  name: string; monthly: number; yearly: number;
  desc: string; badge?: string; highlight?: boolean;
  cta: string; href: string;
  features: { label: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    name: 'Starter', monthly: 0, yearly: 0,
    desc: 'For solo builders getting off the ground.',
    cta: 'Start for free', href: '/sign-up',
    features: [
      { label: 'Up to 3 projects',    included: true  },
      { label: '1 seat',              included: true  },
      { label: 'Community support',   included: true  },
      { label: 'Basic analytics',     included: true  },
      { label: 'Advanced permissions',included: false },
      { label: 'SSO / SAML',         included: false },
      { label: 'Audit logs',          included: false },
      { label: 'Custom domains',      included: false },
    ],
  },
  {
    name: 'Pro', monthly: 29, yearly: 290,
    desc: 'For growing products and small teams.',
    badge: 'Most popular', highlight: true,
    cta: 'Start free trial', href: '/sign-up?plan=pro',
    features: [
      { label: 'Unlimited projects',  included: true  },
      { label: 'Up to 10 seats',      included: true  },
      { label: 'Priority support',    included: true  },
      { label: 'Advanced analytics',  included: true  },
      { label: 'Advanced permissions',included: true  },
      { label: 'SSO / SAML',         included: false },
      { label: 'Audit logs',          included: false },
      { label: 'Custom domains',      included: true  },
    ],
  },
  {
    name: 'Business', monthly: 99, yearly: 990,
    desc: 'Enterprise security, compliance, and control.',
    cta: 'Contact sales', href: '/contact',
    features: [
      { label: 'Unlimited projects',  included: true },
      { label: 'Unlimited seats',     included: true },
      { label: '24/7 dedicated SLA',  included: true },
      { label: 'Custom analytics',    included: true },
      { label: 'Advanced permissions',included: true },
      { label: 'SSO / SAML',         included: true },
      { label: 'Audit logs',          included: true },
      { label: 'Custom domains',      included: true },
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" aria-labelledby="pricing-heading"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '8rem 0 6rem',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{themeVars}</style>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(var(--p-dot) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Centre glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '60%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 0%, oklch(0.52 0.22 285 / 0.10) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 14px', borderRadius: 9999,
            fontSize: 10.5, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase',
            background: 'oklch(0.52 0.22 285 / 0.09)',
            border: '1px solid oklch(0.52 0.22 285 / 0.22)',
            color: 'oklch(0.65 0.20 285)', marginBottom: 20,
          }}><Zap size={10} /> Pricing</p>
          <h2 id="pricing-heading" style={{
            fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3.4rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06,
            color: 'var(--color-text)', margin: '0 0 16px',
          }}>
            Simple, transparent{' '}
            <span style={{
              background: 'linear-gradient(135deg, oklch(0.62 0.22 285), oklch(0.62 0.18 192))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>pricing.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.65, margin: '0 0 32px' }}>
            Start free. Upgrade when you&apos;re ready. No contracts, no surprises.
          </p>

          {/* Toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: 4, borderRadius: 11,
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          }}>
            {(['Monthly','Yearly'] as const).map(lbl => {
              const isY = lbl === 'Yearly';
              const active = isY === yearly;
              return (
                <button key={lbl} onClick={() => setYearly(isY)} style={{
                  padding: '7px 18px', borderRadius: 8,
                  fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                  transition: 'all .15s',
                  background: active ? 'linear-gradient(135deg, oklch(0.52 0.22 285), oklch(0.52 0.20 192))' : 'transparent',
                  color: active ? 'white' : 'var(--color-text-muted)',
                  boxShadow: active ? '0 2px 8px oklch(0.52 0.22 285 / 0.30)' : 'none',
                }}>
                  {lbl} {isY && <span style={{ opacity: active ? 1 : 0.6, fontSize: 11, marginLeft: 4 }}>−17%</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'stretch' }}>
          {plans.map(p => <PricingCard key={p.name} plan={p} yearly={yearly} />)}
        </div>

        <p style={{ textAlign: 'center', marginTop: 28, fontSize: 12, color: 'var(--color-text-faint)' }}>
          All plans include a 30-day money-back guarantee · No setup fees · Cancel anytime
        </p>
      </div>
    </section>
  );
}

function PricingCard({ plan: p, yearly }: { plan: Plan; yearly: boolean }) {
  const price = p.monthly === 0 ? 0 : yearly ? Math.floor(p.yearly / 12) : p.monthly;

  return (
    <div style={{
      position: 'relative',
      borderRadius: 20, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      background: p.highlight
        ? 'linear-gradient(160deg, oklch(0.15 0.025 285), oklch(0.12 0.02 285))'
        : 'var(--color-surface)',
      border: p.highlight ? '1px solid oklch(0.40 0.18 285 / 0.50)' : '1px solid var(--color-border)',
      boxShadow: p.highlight ? '0 0 0 1px oklch(0.52 0.22 285 / 0.20), 0 20px 60px oklch(0.52 0.22 285 / 0.20)' : '0 1px 4px oklch(0 0 0 / 0.06)',
    }}>
      {p.highlight && (
        <>
          {/* Top gradient bar */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(to right, oklch(0.52 0.22 285), oklch(0.62 0.20 192))',
          }} />
          {/* Inner glow */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
            background: 'radial-gradient(ellipse at 50% 0%, oklch(0.52 0.22 285 / 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </>
      )}

      {/* Header */}
      <div style={{ padding: '28px 28px 22px', borderBottom: `1px solid ${p.highlight ? 'oklch(0.40 0.18 285 / 0.30)' : 'var(--color-border)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.02em', color: p.highlight ? 'white' : 'var(--color-text)', margin: 0 }}>{p.name}</h3>
          {p.badge && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 9px', borderRadius: 9999,
              fontSize: 10, fontWeight: 700, letterSpacing: '.05em',
              background: 'linear-gradient(135deg, oklch(0.52 0.22 285), oklch(0.58 0.20 192))',
              color: 'white',
            }}><Sparkles size={9} /> {p.badge}</span>
          )}
        </div>
        <p style={{ fontSize: 13, color: p.highlight ? 'oklch(0.75 0.06 285)' : 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 20px' }}>{p.desc}</p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 4 }}>
          <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-.05em', lineHeight: 1, color: p.highlight ? 'white' : 'var(--color-text)', fontVariantNumeric: 'tabular-nums' }}>${price}</span>
          <span style={{ fontSize: 14, color: p.highlight ? 'oklch(0.70 0.06 285)' : 'var(--color-text-muted)', paddingBottom: 8 }}>/mo</span>
        </div>
        {yearly && p.yearly > 0 && (
          <p style={{ fontSize: 12, color: p.highlight ? 'oklch(0.70 0.06 285)' : 'var(--color-text-faint)', margin: 0 }}>
            Billed ${p.yearly}/yr · <span style={{ color: p.highlight ? 'oklch(0.75 0.16 145)' : 'oklch(0.62 0.16 145)', fontWeight: 600 }}>Save ${p.monthly * 12 - p.yearly}</span>
          </p>
        )}
        {p.monthly === 0 && <p style={{ fontSize: 12, color: p.highlight ? 'oklch(0.70 0.06 285)' : 'var(--color-text-faint)', margin: 0 }}>Free forever · No credit card</p>}
      </div>

      {/* Features */}
      <ul style={{ flex: 1, listStyle: 'none', margin: 0, padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {p.features.map(f => (
          <li key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: f.included ? 1 : 0.4 }}>
            {f.included
              ? <Check size={14} style={{ color: p.highlight ? 'oklch(0.75 0.18 145)' : 'oklch(0.58 0.16 145)', flexShrink: 0 }} />
              : <X     size={14} style={{ color: 'var(--color-text-faint)', flexShrink: 0 }} />}
            <span style={{ fontSize: 13.5, color: p.highlight ? 'oklch(0.82 0.04 285)' : 'var(--color-text)' }}>{f.label}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div style={{ padding: '0 28px 28px' }}>
        <Link href={p.href} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          width: '100%', padding: '12px 20px', borderRadius: 10,
          fontSize: 14, fontWeight: 700, textDecoration: 'none',
          transition: 'filter .15s, transform .15s',
          boxSizing: 'border-box',
          background: p.highlight
            ? 'linear-gradient(135deg, oklch(0.62 0.22 285), oklch(0.62 0.20 192))'
            : 'transparent',
          color: p.highlight ? 'white' : 'var(--color-text)',
          border: p.highlight ? 'none' : '1px solid var(--color-border)',
          boxShadow: p.highlight ? '0 4px 16px oklch(0.52 0.22 285 / 0.35)' : 'none',
        }}>
          {p.cta} {p.highlight && <ArrowRight size={14} />}
        </Link>
      </div>
    </div>
  );
}
