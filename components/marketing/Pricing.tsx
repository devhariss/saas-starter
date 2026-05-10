'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Minus, ArrowRight, Zap } from 'lucide-react';

/* ─── Theme vars ─────────────────────────────────── */
const themeVars = `
  :root, [data-theme="light"] {
    --pricing-dot: oklch(0.45 0.06 285 / 0.35);
    --pricing-glow: oklch(0.52 0.22 285 / 0.07);
  }
  [data-theme="dark"] {
    --pricing-dot: oklch(0.72 0.08 285 / 0.20);
    --pricing-glow: oklch(0.52 0.22 285 / 0.13);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --pricing-dot: oklch(0.72 0.08 285 / 0.20);
      --pricing-glow: oklch(0.52 0.22 285 / 0.13);
    }
  }
  @media (max-width: 767px) {
    .pricing-grid { grid-template-columns: 1fr !important; }
  }
`;

/* ─── Data ─────────────────────────────────────── */
type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  desc: string;
  features: { label: string; included: boolean }[];
  cta: string;
  href: string;
  highlight?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: 'Starter', monthly: 0, yearly: 0,
    desc: 'Everything you need to get started — free forever.',
    cta: 'Get started free', href: '/sign-up',
    features: [
      { label: 'Up to 3 projects',      included: true  },
      { label: '1 team member',          included: true  },
      { label: 'Community support',      included: true  },
      { label: 'Basic analytics',        included: true  },
      { label: 'Advanced permissions',   included: false },
      { label: 'SSO & SAML',            included: false },
      { label: 'Audit logs',             included: false },
      { label: 'Custom domains',         included: false },
    ],
  },
  {
    name: 'Pro', monthly: 29, yearly: 290,
    desc: 'For growing teams that need power and flexibility.',
    cta: 'Start 14-day trial', href: '/sign-up?plan=pro',
    highlight: true, badge: 'Most popular',
    features: [
      { label: 'Unlimited projects',     included: true  },
      { label: 'Up to 10 team members',  included: true  },
      { label: 'Priority email support', included: true  },
      { label: 'Advanced analytics',     included: true  },
      { label: 'Advanced permissions',   included: true  },
      { label: 'SSO & SAML',            included: false },
      { label: 'Audit logs',             included: false },
      { label: 'Custom domains',         included: true  },
    ],
  },
  {
    name: 'Business', monthly: 99, yearly: 990,
    desc: 'Enterprise-grade security, compliance, and control.',
    cta: 'Contact sales', href: '/contact',
    features: [
      { label: 'Unlimited projects',     included: true },
      { label: 'Unlimited team members', included: true },
      { label: '24/7 dedicated support', included: true },
      { label: 'Custom analytics',       included: true },
      { label: 'Advanced permissions',   included: true },
      { label: 'SSO & SAML',            included: true },
      { label: 'Audit logs',             included: true },
      { label: 'Custom domains',         included: true },
    ],
  },
];

/* ─── Component ────────────────────────────────── */
export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{
        position: 'relative',
        padding: '7rem 0',
        background: 'var(--color-bg)',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <style>{themeVars}</style>

      {/* dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(var(--pricing-dot) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-10%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 30%, var(--pricing-glow) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 9999,
            background: 'oklch(0.52 0.22 285 / 0.09)',
            border: '1px solid oklch(0.52 0.22 285 / 0.20)',
            color: 'var(--color-accent)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            <Zap size={10} aria-hidden="true" /> Pricing
          </div>
          <h2
            id="pricing-heading"
            style={{
              fontSize: 'clamp(2rem, 1rem + 2.5vw, 3rem)',
              fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
              color: 'var(--color-text)', margin: '0 0 16px',
            }}
          >
            Plans that scale with you
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 16, lineHeight: 1.6, margin: '0 0 32px' }}>
            Start free. Upgrade when you&apos;re ready. No contracts, no hidden fees.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: 4, borderRadius: 10,
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
          }}>
            {(['Monthly', 'Yearly'] as const).map((label) => {
              const isY = label === 'Yearly';
              const active = isY === yearly;
              return (
                <button
                  key={label}
                  onClick={() => setYearly(isY)}
                  style={{
                    padding: '6px 16px', borderRadius: 7,
                    fontSize: 13, fontWeight: 500,
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s',
                    background: active ? 'var(--color-accent)' : 'transparent',
                    color: active ? 'var(--color-bg)' : 'var(--color-text-muted)',
                  }}
                >
                  {label}
                  {isY && (
                    <span style={{ marginLeft: 6, fontSize: 11, opacity: active ? 1 : 0.65, fontWeight: 600 }}>
                      −15%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards grid — all same height via align-items:stretch, no scale() */}
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {plans.map((p) => <PricingCard key={p.name} plan={p} yearly={yearly} />)}
        </div>

        {/* Bottom fine print */}
        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: 'var(--color-text-faint)' }}>
          All plans include a 30-day money-back guarantee · No setup fees · Cancel any time
        </p>
      </div>
    </section>
  );
}

/* ─── PricingCard ───────────────────────────────── */
function PricingCard({ plan: p, yearly }: { plan: Plan; yearly: boolean }) {
  const price = p.monthly === 0 ? 0 : yearly ? Math.floor(p.yearly / 12) : p.monthly;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--color-surface)',
        /* highlight card gets a 2px gradient border via box-shadow layering */
        border: p.highlight ? 'none' : '1px solid var(--color-border)',
        padding: p.highlight ? 2 : 0,
        boxShadow: p.highlight
          ? '0 0 0 2px var(--color-accent), 0 8px 40px oklch(0.52 0.22 285 / 0.18)'
          : '0 1px 4px oklch(0 0 0 / 0.06)',
      }}
    >
      {/* Highlight card inner wrapper */}
      {p.highlight && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 18,
            background: 'radial-gradient(ellipse at 50% 0%, oklch(0.52 0.22 285 / 0.10) 0%, transparent 60%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      )}

      {/* Top accent line on highlight */}
      {p.highlight && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: '15%', right: '15%',
            height: 2, borderRadius: 9999,
            background: 'linear-gradient(to right, transparent, var(--color-accent) 50%, transparent)',
            zIndex: 2,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, borderRadius: p.highlight ? 16 : 18, overflow: 'hidden', background: 'var(--color-surface)' }}>

        {/* Badge */}
        {p.badge && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'var(--color-accent)', color: 'var(--color-bg)',
            padding: '3px 10px', borderRadius: 20,
          }}>
            {p.badge}
          </div>
        )}

        {/* Header */}
        <div style={{ padding: '28px 28px 24px', borderBottom: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text)', margin: '0 0 6px' }}>{p.name}</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 13, margin: '0 0 20px', lineHeight: 1.5 }}>{p.desc}</p>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 48, fontWeight: 800, letterSpacing: '-0.05em',
                lineHeight: 1, color: 'var(--color-text)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              ${price}
            </span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 14, paddingBottom: 6 }}>/mo</span>
          </div>
          {yearly && p.yearly > 0 && (
            <p style={{ color: 'var(--color-text-faint)', fontSize: 12, margin: 0 }}>
              Billed ${p.yearly}/yr ·{' '}
              <span style={{ color: 'oklch(0.62 0.16 145)', fontWeight: 600 }}>Save ${(p.monthly * 12) - p.yearly}</span>
            </p>
          )}
          {p.monthly === 0 && (
            <p style={{ color: 'var(--color-text-faint)', fontSize: 12, margin: 0 }}>Free forever · No credit card</p>
          )}
        </div>

        {/* Feature list */}
        <ul style={{ flex: 1, listStyle: 'none', margin: 0, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {p.features.map((f) => (
            <li key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, opacity: f.included ? 1 : 0.38 }}>
              {f.included
                ? <Check  size={15} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                : <Minus  size={15} style={{ color: 'var(--color-text-faint)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
              }
              <span style={{ fontSize: 14, color: 'var(--color-text)', lineHeight: 1.5 }}>{f.label}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ padding: '0 28px 28px' }}>
          <Link
            href={p.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '11px 20px',
              borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
              transition: 'filter 0.15s',
              background: p.highlight ? 'var(--color-accent)' : 'transparent',
              color: p.highlight ? 'var(--color-bg)' : 'var(--color-text)',
              border: p.highlight ? 'none' : '1px solid var(--color-border)',
              boxSizing: 'border-box',
              boxShadow: p.highlight ? '0 2px 8px oklch(0.52 0.22 285 / 0.25)' : 'none',
            }}
          >
            {p.cta} {p.highlight && <ArrowRight size={14} aria-hidden="true" />}
          </Link>
        </div>
      </div>
    </div>
  );
}
