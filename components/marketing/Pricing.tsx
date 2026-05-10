// components/marketing/Pricing.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

type Feature = { label: string; included: boolean };

type Plan = {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: Feature[];
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Everything you need to get started — free forever.',
    cta: 'Get started free',
    ctaHref: '/sign-up',
    features: [
      { label: 'Up to 3 projects', included: true },
      { label: '1 team member', included: true },
      { label: 'Community support', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Advanced permissions', included: false },
      { label: 'SSO & SAML', included: false },
      { label: 'Audit logs', included: false },
      { label: 'Custom domains', included: false },
    ],
  },
  {
    name: 'Pro',
    priceMonthly: 29,
    priceYearly: 290,
    description: 'For growing teams that need power and flexibility.',
    highlight: true,
    badge: 'Most popular',
    cta: 'Start 14-day trial',
    ctaHref: '/sign-up?plan=pro',
    features: [
      { label: 'Unlimited projects', included: true },
      { label: 'Up to 10 team members', included: true },
      { label: 'Priority email support', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Advanced permissions', included: true },
      { label: 'SSO & SAML', included: false },
      { label: 'Audit logs', included: false },
      { label: 'Custom domains', included: true },
    ],
  },
  {
    name: 'Business',
    priceMonthly: 99,
    priceYearly: 990,
    description: 'Enterprise-grade security, compliance, and control.',
    cta: 'Contact sales',
    ctaHref: '/contact',
    features: [
      { label: 'Unlimited projects', included: true },
      { label: 'Unlimited team members', included: true },
      { label: '24/7 dedicated support', included: true },
      { label: 'Custom analytics', included: true },
      { label: 'Advanced permissions', included: true },
      { label: 'SSO & SAML', included: true },
      { label: 'Audit logs', included: true },
      { label: 'Custom domains', included: true },
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      style={{
        position: 'relative',
        padding: '7rem 0',
        background: 'var(--color-bg)',
        overflow: 'hidden',
      }}
    >
      {/* bg glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(700px circle at 50% -80px, oklch(0.55 0.18 285 / 0.10), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* dot grid */}
      <div
        aria-hidden="true"
        className="pricing-pattern"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-accent)',
              marginBottom: 12,
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              margin: '0 0 16px',
            }}
          >
            Plans that scale with you
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 16, lineHeight: 1.6, margin: '0 0 32px' }}>
            Start free. Upgrade when you&apos;re ready. No contracts, no hidden fees.
          </p>

          {/* Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
            }}
          >
            {(['Monthly', 'Yearly'] as const).map((label) => {
              const isYearly = label === 'Yearly';
              const active = isYearly === yearly;
              return (
                <button
                  key={label}
                  onClick={() => setYearly(isYearly)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 7,
                    fontSize: 13,
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    background: active ? 'var(--color-accent)' : 'transparent',
                    color: active ? 'var(--color-bg)' : 'var(--color-text-muted)',
                  }}
                >
                  {label}
                  {isYearly && (
                    <span
                      style={{
                        marginLeft: 6,
                        fontSize: 11,
                        opacity: active ? 1 : 0.7,
                        fontWeight: 400,
                      }}
                    >
                      −15%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {plans.map((p) => (
            <div
              key={p.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 16,
                border: p.highlight
                  ? '2px solid var(--color-accent)'
                  : '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                overflow: 'hidden',
                position: 'relative',
                transform: p.highlight ? 'scale(1.03)' : 'scale(1)',
                boxShadow: p.highlight
                  ? '0 8px 40px oklch(0.55 0.18 285 / 0.15)'
                  : '0 1px 4px oklch(0 0 0 / 0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              {/* Most popular badge */}
              {p.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    padding: '3px 10px',
                    borderRadius: 20,
                  }}
                >
                  {p.badge}
                </div>
              )}

              {/* Card header */}
              <div
                style={{
                  padding: '28px 28px 20px',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 6px',
                  }}
                >
                  {p.name}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 14, margin: '0 0 20px', lineHeight: 1.5 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      letterSpacing: '-0.04em',
                      color: 'var(--color-text)',
                      lineHeight: 1,
                    }}
                  >
                    ${p.priceMonthly === 0 ? '0' : yearly ? Math.floor(p.priceYearly / 12) : p.priceMonthly}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 14, paddingBottom: 4 }}>/mo</span>
                </div>
                {yearly && p.priceYearly > 0 && (
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 12, marginTop: 4 }}>
                    Billed ${p.priceYearly}/yr
                  </p>
                )}
              </div>

              {/* Features */}
              <ul
                style={{
                  flex: 1,
                  listStyle: 'none',
                  margin: 0,
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {p.features.map((f) => (
                  <li
                    key={f.label}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      opacity: f.included ? 1 : 0.4,
                    }}
                  >
                    {f.included ? (
                      <Check
                        size={16}
                        style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}
                      />
                    ) : (
                      <X
                        size={16}
                        style={{ color: 'var(--color-text-muted)', flexShrink: 0, marginTop: 2 }}
                      />
                    )}
                    <span style={{ fontSize: 14, color: 'var(--color-text)', lineHeight: 1.5 }}>{f.label}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div style={{ padding: '0 28px 28px' }}>
                <Link
                  href={p.ctaHref}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '11px 20px',
                    borderRadius: 9,
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'filter 0.15s, background 0.15s',
                    background: p.highlight ? 'var(--color-accent)' : 'transparent',
                    color: p.highlight ? 'var(--color-bg)' : 'var(--color-text)',
                    border: p.highlight ? 'none' : '1px solid var(--color-border)',
                    boxSizing: 'border-box',
                  }}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='oklch(0.55 0.04 285)' fill-opacity='0.06'/%3E%3C/svg%3E");
          background-size: 32px 32px;
        }
        [data-theme='light'] .pricing-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='oklch(0.2 0.02 285)' fill-opacity='0.05'/%3E%3C/svg%3E");
        }
        @media (prefers-color-scheme: light) {
          .pricing-pattern {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='oklch(0.2 0.02 285)' fill-opacity='0.05'/%3E%3C/svg%3E");
          }
        }
      `}</style>
    </section>
  );
}
