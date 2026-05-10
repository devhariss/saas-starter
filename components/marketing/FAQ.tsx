'use client';

import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const themeVars = `
  :root, [data-theme="light"] {
    --faq-dot-color: oklch(0.45 0.06 285 / 0.35);
    --faq-glow: oklch(0.52 0.22 285 / 0.07);
  }
  [data-theme="dark"] {
    --faq-dot-color: oklch(0.72 0.08 285 / 0.20);
    --faq-glow: oklch(0.52 0.22 285 / 0.12);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --faq-dot-color: oklch(0.72 0.08 285 / 0.20);
      --faq-glow: oklch(0.52 0.22 285 / 0.12);
    }
  }
  @media (max-width: 767px) { .faq-grid { grid-template-columns: 1fr !important; } }
`;

interface FaqItem { q: string; a: string; category: string; }

const faqs: FaqItem[] = [
  { category: 'Billing',  q: 'Is there a free trial?',                  a: 'Yes. The Free plan is free forever — no credit card required. Pro and Team plans include a 14-day free trial, and all paid plans come with a 30-day money-back guarantee.' },
  { category: 'Billing',  q: 'Can I cancel at any time?',               a: 'Absolutely. Cancel from Settings › Billing at any time. You’ll retain access until the end of your billing period and won’t be charged again.' },
  { category: 'Billing',  q: 'Can I upgrade or downgrade my plan?',      a: 'Yes, instantly. Upgrades are prorated and take effect immediately. Downgrades kick in at the end of your billing period — all through the Stripe billing portal.' },
  { category: 'Billing',  q: 'Is Stripe the only payment option?',       a: 'Currently yes. Stripe supports 135+ currencies and most global payment methods — cards, SEPA, iDEAL, Alipay, and more. Additional providers can be added by extending lib/stripe.ts.' },
  { category: 'Privacy',  q: 'Who owns my data?',                        a: 'You do, entirely. Your data lives in your own database. Export everything via Settings › Privacy › Download my data, or request deletion at any time.' },
  { category: 'Privacy',  q: 'Is this GDPR and CCPA compliant?',         a: 'Yes. Ships with a cookie consent banner, GPC signal detection, granular consent categories, Privacy Policy, Terms of Service, Cookie Policy, and data export/deletion endpoints out of the box.' },
  { category: 'Support',  q: 'What kind of support is available?',       a: 'Free plan: community support via GitHub Discussions. Pro: priority email with a 24-hour response SLA. Business: dedicated Slack channel and 99.9% uptime SLA.' },
  { category: 'General',  q: 'Is this open source?',                     a: 'Yes — MIT licensed. Fork it, modify it, ship your product. No attribution required, though a GitHub star is always appreciated.' },
];

const categoryHue: Record<string, number> = { Billing: 285, Privacy: 145, Support: 192, General: 75 };

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  // unique categories for the strip
  const cats = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
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
        backgroundImage: 'radial-gradient(var(--faq-dot-color) 1.2px, transparent 1.2px)',
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
        background: 'radial-gradient(ellipse at 50% 30%, var(--faq-glow) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div
        className="faq-grid"
        style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)',
          gap: '4rem', alignItems: 'start',
        }}
      >
        {/* Left sticky panel */}
        <div style={{ position: 'sticky', top: 96 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 9999,
            background: 'oklch(0.52 0.22 285 / 0.09)',
            border: '1px solid oklch(0.52 0.22 285 / 0.20)',
            color: 'var(--color-accent)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            <MessageCircle size={10} aria-hidden="true" /> FAQ
          </div>

          <h2 id="faq-heading" style={{
            fontSize: 'clamp(1.75rem, 1rem + 1.75vw, 2.75rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--color-text)', margin: '0 0 16px',
          }}>
            Got questions?
          </h2>

          <p style={{
            fontSize: 15, lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            margin: '0 0 32px', maxWidth: '28ch',
          }}>
            Everything you need to know before you start building.
          </p>

          {/* Category legend strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {cats.map((cat) => {
              const hue = categoryHue[cat] ?? 285;
              return (
                <span key={cat} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 6,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: `oklch(0.52 0.18 ${hue} / 0.10)`,
                  color: `oklch(0.68 0.18 ${hue})`,
                  border: `1px solid oklch(0.52 0.18 ${hue} / 0.20)`,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: `oklch(0.62 0.18 ${hue})`, display: 'block' }} />
                  {cat}
                </span>
              );
            })}
          </div>

          <a
            href="mailto:support@example.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 18px', borderRadius: 9,
              fontSize: 13, fontWeight: 500,
              color: 'var(--color-text)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
          >
            Contact support
          </a>
        </div>

        {/* Right accordion */}
        <dl style={{ margin: 0 }}>
          {faqs.map((faq, i) => (
            <FaqRow
              key={i}
              faq={faq}
              index={i}
              isOpen={open === i}
              isLast={i === faqs.length - 1}
              hue={categoryHue[faq.category] ?? 285}
              onToggle={toggle}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

interface FaqRowProps {
  faq: FaqItem; index: number;
  isOpen: boolean; isLast: boolean;
  hue: number;
  onToggle: (i: number) => void;
}

function FaqRow({ faq, index, isOpen, isLast, hue, onToggle }: FaqRowProps) {
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid var(--color-border)', position: 'relative' }}>
      {/* open accent bar */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 2, borderRadius: 9999,
        background: isOpen ? `oklch(0.62 0.18 ${hue})` : 'transparent',
        transition: 'background 0.2s',
      }} />

      <dt>
        <button
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          style={{
            display: 'flex', width: '100%',
            alignItems: 'flex-start', justifyContent: 'space-between',
            gap: 20, padding: '22px 0 22px 16px',
            background: 'none', border: 'none',
            cursor: 'pointer', textAlign: 'left',
          }}
        >
          <span style={{ flex: 1 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              marginRight: 10, marginBottom: 2,
              padding: '2px 8px', borderRadius: 4,
              fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase',
              background: `oklch(0.52 0.18 ${hue} / 0.10)`,
              color: `oklch(0.70 0.18 ${hue})`,
              verticalAlign: 'middle',
            }}>{faq.category}</span>
            <span style={{
              fontSize: 15, fontWeight: 500, lineHeight: 1.5,
              color: isOpen ? `oklch(0.68 0.18 ${hue})` : 'var(--color-text)',
              transition: 'color 0.15s', verticalAlign: 'middle',
            }}>{faq.q}</span>
          </span>

          <span style={{
            flexShrink: 0, width: 24, height: 24,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 2,
            background: isOpen ? `oklch(0.62 0.18 ${hue})` : 'var(--color-surface)',
            border: isOpen ? `1px solid oklch(0.62 0.18 ${hue})` : '1px solid var(--color-border)',
            transition: 'background 0.2s, border-color 0.2s',
          }}>
            {isOpen
              ? <Minus size={12} color="white" aria-hidden="true" />
              : <Plus  size={12} aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />}
          </span>
        </button>
      </dt>

      <dd
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? 400 : 0,
          opacity: isOpen ? 1 : 0,
          paddingBottom: isOpen ? 24 : 0,
          paddingLeft: 16,
          transition: 'max-height 0.32s ease, opacity 0.25s ease, padding-bottom 0.25s ease',
          margin: 0,
        }}
      >
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--color-text-muted)', margin: 0, maxWidth: '64ch' }}>
          {faq.a}
        </p>
      </dd>
    </div>
  );
}
