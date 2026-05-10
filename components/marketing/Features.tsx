'use client';

import React from 'react';
import { Shield, CreditCard, Mail, BarChart3, ArrowRight } from 'lucide-react';

const themeVars = `
  :root,[data-theme="light"]{ --f-dot:oklch(0.45 0.06 285 / 0.30); }
  [data-theme="dark"]       { --f-dot:oklch(0.72 0.08 285 / 0.15); }
  @media(prefers-color-scheme:dark){:root:not([data-theme]){--f-dot:oklch(0.72 0.08 285 / 0.15);}}
  @media(max-width:767px){
    .feat-bento { grid-template-columns: 1fr !important; }
    .feat-tall  { grid-row: auto !important; }
  }
`;

const features = [
  {
    icon: Shield, hue: 285,
    tag: 'Auth',
    title: 'Auth in 5 minutes',
    body: 'NextAuth v5 pre-configured with Google, GitHub, and magic-link. Prisma-backed sessions, middleware-protected routes, and RBAC — ready from git clone.',
    code: `// middleware.ts\nexport { auth as middleware } from '@/auth'\n\nexport const config = {\n  matcher: ['/((?!api|_next).*)'],\n}`,
    wide: false, tall: true,
  },
  {
    icon: CreditCard, hue: 192,
    tag: 'Billing',
    title: 'Stripe, fully wired',
    body: 'Checkout, webhooks, Stripe Tax, billing portal, and invoice emails — all synced to Prisma in real time.',
    stats: [{ label: 'checkout.session.completed', time: 'now', hue: 145 }, { label: 'invoice.payment_succeeded', time: '2s', hue: 285 }, { label: 'customer.subscription.updated', time: '8s', hue: 75 }],
    wide: false, tall: false,
  },
  {
    icon: Mail, hue: 75,
    tag: 'Email',
    title: 'Beautiful emails',
    body: 'React Email + Resend. Fully typed, browser-previewed, and pixel-perfect across every client. Welcome, invoice, and reset templates included.',
    preview: true,
    wide: false, tall: false,
  },
  {
    icon: BarChart3, hue: 145,
    tag: 'Analytics',
    title: 'KPIs out of the box',
    body: 'MRR, churn, NPS. Prisma Pulse streams real-time events so dashboards update the moment something happens — no polling.',
    kpis: [
      { label: 'MRR',   value: '$24.8k', delta: '+18%',  up: true  },
      { label: 'Churn', value: '1.4%',   delta: '-0.6%', up: false },
      { label: 'NPS',   value: '71',     delta: '+5',    up: true  },
    ],
    wide: true, tall: false,
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading"
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
        backgroundImage: 'radial-gradient(var(--f-dot) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <p style={{
            display: 'inline-block',
            padding: '4px 14px', borderRadius: 9999,
            fontSize: 10.5, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase',
            background: 'oklch(0.52 0.22 285 / 0.09)',
            border: '1px solid oklch(0.52 0.22 285 / 0.22)',
            color: 'oklch(0.65 0.20 285)',
            marginBottom: 18,
          }}>Everything wired up on day one</p>
          <h2 id="features-heading" style={{
            fontSize: 'clamp(2rem, 1.2rem + 2.2vw, 3.2rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08,
            color: 'var(--color-text)', margin: '0 0 14px',
          }}>
            Four pillars.{' '}
            <span style={{
              background: 'linear-gradient(135deg, oklch(0.62 0.22 285), oklch(0.62 0.18 192))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Zero boilerplate.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-text-muted)', maxWidth: '46ch', margin: '0 auto' }}>
            Auth, billing, email, and analytics — production-ready from your very first commit.
          </p>
        </div>

        {/* Bento grid */}
        <div className="feat-bento" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 'minmax(260px, auto)',
          gap: 18,
        }}>
          {features.map((f) => <FeatureCard key={f.tag} f={f} />)}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ f }: { f: typeof features[number] }) {
  const Icon = f.icon;
  const accent = `oklch(0.65 0.20 ${f.hue})`;
  const isWide = f.wide;
  const isTall = f.tall;

  return (
    <div className={isTall ? 'feat-tall' : ''}
      style={{
        gridColumn: isWide ? 'span 2' : 'span 1',
        gridRow: isTall ? 'span 2' : 'span 1',
        position: 'relative', overflow: 'hidden',
        borderRadius: 18,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        padding: '2rem',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)',
        transition: 'box-shadow .2s, border-color .2s',
      }}
    >
      {/* Top accent beam */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        height: 2, borderRadius: 9999,
        background: `linear-gradient(to right, transparent, ${accent} 50%, transparent)`,
      }} />

      {/* Per-card glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: `radial-gradient(ellipse at 50% 0%, oklch(0.52 0.18 ${f.hue} / 0.07) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Icon + tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, position: 'relative' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `oklch(0.52 0.18 ${f.hue} / 0.12)`,
          border: `1px solid oklch(0.52 0.18 ${f.hue} / 0.24)`,
        }}>
          <Icon size={18} style={{ color: accent }} aria-hidden="true" />
        </div>
        <span style={{
          fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
          color: accent,
        }}>{f.tag}</span>
      </div>

      {/* Title + body */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: isTall ? 'clamp(1.4rem, 1rem + 1vw, 1.9rem)' : '1.2rem',
          fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15,
          color: 'var(--color-text)', margin: '0 0 12px',
        }}>{f.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-muted)', margin: '0 0 20px', maxWidth: '40ch' }}>{f.body}</p>

        {/* ── Auth: code block ── */}
        {f.code && (
          <div style={{ flex: 1, marginTop: 'auto' }}>
            <pre style={{
              fontSize: 11.5, lineHeight: 1.7,
              padding: '14px 16px', borderRadius: 10,
              background: 'oklch(0.12 0.01 285 / 0.9)',
              border: '1px solid oklch(0.52 0.18 285 / 0.20)',
              color: 'oklch(0.82 0.06 285)',
              overflowX: 'auto', margin: 0,
              fontFamily: 'ui-monospace,"Cascadia Code",monospace',
            }}><code>{f.code}</code></pre>
            <Link href="/docs/auth" style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              marginTop: 14, fontSize: 13, fontWeight: 500,
              color: accent, textDecoration: 'none',
            }}>Auth docs <ArrowRight size={12} /></Link>
          </div>
        )}

        {/* ── Billing: webhook feed ── */}
        {f.stats && (
          <div style={{ marginTop: 'auto', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            {f.stats.map((s, i) => (
              <div key={s.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', fontSize: 11,
                background: 'var(--color-bg)',
                borderBottom: i < f.stats!.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: `oklch(0.62 0.18 ${s.hue})`, flexShrink: 0, boxShadow: `0 0 5px oklch(0.62 0.18 ${s.hue} / 0.6)` }} />
                <span style={{ flex: 1, fontFamily: 'ui-monospace,monospace', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
                <span style={{ color: 'var(--color-text-faint)', flexShrink: 0 }}>{s.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Email: preview tile ── */}
        {f.preview && (
          <div style={{ marginTop: 'auto', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: `oklch(0.52 0.22 285 / 0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'oklch(0.65 0.20 285)' }}>A</div>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--color-text)' }}>Welcome to Acme!</div>
                <div style={{ fontSize: 9.5, color: 'var(--color-text-faint)' }}>hello@acme.com → you@email.com</div>
              </div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 5, color: 'var(--color-text)' }}>You're all set 🎉</div>
              <div style={{ fontSize: 11, lineHeight: 1.65, color: 'var(--color-text-muted)', marginBottom: 10 }}>Your account is live. Click below to open your dashboard and start building.</div>
              <div style={{ display: 'inline-block', padding: '7px 14px', borderRadius: 6, background: 'var(--color-text)', color: 'var(--color-bg)', fontSize: 10.5, fontWeight: 600 }}>Open dashboard →</div>
            </div>
          </div>
        )}

        {/* ── Analytics: KPI chips ── */}
        {f.kpis && (
          <div style={{ marginTop: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {f.kpis.map(k => (
              <div key={k.label} style={{
                flex: 1, minWidth: 90,
                padding: '12px 14px', borderRadius: 10,
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{ fontSize: 9.5, color: 'var(--color-text-faint)', marginBottom: 5 }}>{k.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--color-text)', fontVariantNumeric: 'tabular-nums' }}>{k.value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4, color: k.up ? 'oklch(0.58 0.15 145)' : 'oklch(0.62 0.20 22)' }}>{k.delta}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
