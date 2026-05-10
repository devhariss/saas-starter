'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const themeVars = `
  :root,[data-theme="light"]{ --fq-dot:oklch(0.45 0.06 285 / 0.28); }
  [data-theme="dark"]       { --fq-dot:oklch(0.72 0.08 285 / 0.14); }
  @media(prefers-color-scheme:dark){:root:not([data-theme]){--fq-dot:oklch(0.72 0.08 285 / 0.14);}}
  @media(max-width:767px){ .faq-layout{ grid-template-columns:1fr!important; } }
`;

const faqs = [
  { q: 'Is there a free trial?',              cat: 'Billing',  hue: 285, a: 'Yes. The Free plan is free forever with no credit card required. Pro and Team plans include a 14-day free trial, and all paid plans come with a 30-day money-back guarantee.' },
  { q: 'Can I cancel at any time?',            cat: 'Billing',  hue: 285, a: 'Absolutely. Cancel from Settings › Billing at any time. You'll retain access until the end of your billing period and won't be charged again.' },
  { q: 'Can I upgrade or downgrade?',          cat: 'Billing',  hue: 285, a: 'Yes, instantly. Upgrades are prorated and take effect immediately. Downgrades kick in at the end of your billing period through the Stripe billing portal.' },
  { q: 'Is Stripe the only payment option?',   cat: 'Billing',  hue: 285, a: 'Currently yes. Stripe supports 135+ currencies and most global payment methods including cards, SEPA, iDEAL, and Alipay. Other providers can be added via lib/stripe.ts.' },
  { q: 'Who owns my data?',                    cat: 'Privacy',  hue: 145, a: 'You do, entirely. Your data lives in your own database. Export everything via Settings › Privacy › Download my data, or request deletion at any time.' },
  { q: 'Is this GDPR and CCPA compliant?',     cat: 'Privacy',  hue: 145, a: 'Yes. Ships with a cookie consent banner, GPC signal detection, granular consent categories, Privacy Policy, Terms of Service, Cookie Policy, and data export/deletion endpoints.' },
  { q: 'What support is available?',           cat: 'Support',  hue: 192, a: 'Free plan: community support via GitHub Discussions. Pro: priority email with 24h SLA. Business: dedicated Slack channel and 99.9% uptime SLA.' },
  { q: 'Is this open source?',                 cat: 'General',  hue: 75,  a: 'Yes — MIT licensed. Fork it, modify it, ship it. No attribution required, though a GitHub star is always appreciated.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading"
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
        backgroundImage: 'radial-gradient(var(--fq-dot) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <h2 id="faq-heading" style={{
            fontSize: 'clamp(2rem, 1.2rem + 2.2vw, 3.2rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08,
            color: 'var(--color-text)', margin: '0 0 14px',
          }}>
            Frequently asked{' '}
            <span style={{
              background: 'linear-gradient(135deg, oklch(0.62 0.22 285), oklch(0.62 0.18 192))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>questions.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--color-text-muted)', maxWidth: '44ch', margin: '0 auto 0' }}>
            Everything you need to know before you start building.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="faq-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {faqs.map((faq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                all: 'unset',
                display: 'block', cursor: 'pointer',
                padding: '20px 22px', borderRadius: 14,
                background: open === i ? `oklch(0.52 0.18 ${faq.hue} / 0.06)` : 'var(--color-surface)',
                border: open === i ? `1px solid oklch(0.52 0.18 ${faq.hue} / 0.30)` : '1px solid var(--color-border)',
                transition: 'background .2s, border-color .2s',
                textAlign: 'left', width: '100%', boxSizing: 'border-box',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: open === i ? 12 : 0 }}>
                <div style={{ flex: 1 }}>
                  <span style={{
                    display: 'inline-block', marginBottom: 6,
                    padding: '2px 8px', borderRadius: 5,
                    fontSize: 9.5, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase',
                    background: `oklch(0.52 0.18 ${faq.hue} / 0.10)`,
                    color: `oklch(0.65 0.18 ${faq.hue})`,
                  }}>{faq.cat}</span>
                  <p style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: '-.01em', color: 'var(--color-text)', margin: 0, lineHeight: 1.4 }}>{faq.q}</p>
                </div>
                <span style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: open === i ? `oklch(0.55 0.18 ${faq.hue})` : 'var(--color-bg)',
                  border: open === i ? `1px solid oklch(0.55 0.18 ${faq.hue})` : '1px solid var(--color-border)',
                  transition: 'background .2s, border-color .2s', marginTop: 2,
                }}>
                  {open === i
                    ? <Minus size={12} color="white" aria-hidden="true" />
                    : <Plus  size={12} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />}
                </span>
              </div>

              {/* Answer */}
              {open === i && (
                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--color-text-muted)', margin: 0, paddingTop: 4 }}>
                  {faq.a}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ fontSize: 15, color: 'var(--color-text-muted)', marginBottom: 16 }}>Still have questions?</p>
          <a href="mailto:support@example.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', borderRadius: 10,
            fontSize: 14, fontWeight: 600,
            color: 'var(--color-text)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            textDecoration: 'none',
          }}>Contact support</a>
        </div>
      </div>
    </section>
  );
}
