'use client';

import React from 'react';
import { Zap, Chrome, Github, Mail, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';

/* ─── Theme vars ─────────────────────────────────── */
const themeVars = `
  :root, [data-theme="light"] {
    --feat-dot: oklch(0.45 0.06 285 / 0.35);
    --feat-glow: oklch(0.52 0.22 285 / 0.07);
  }
  [data-theme="dark"] {
    --feat-dot: oklch(0.72 0.08 285 / 0.20);
    --feat-glow: oklch(0.52 0.22 285 / 0.12);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
      --feat-dot: oklch(0.72 0.08 285 / 0.20);
      --feat-glow: oklch(0.52 0.22 285 / 0.12);
    }
  }
  @media (max-width: 767px) {
    .feat-row { grid-template-columns: 1fr !important; }
    .feat-row-visual { margin-top: 2rem; }
  }
`;

/* ─── Shared tokens ─────────────────────────────── */
const card: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 14,
  boxShadow: '0 1px 4px oklch(0 0 0 / 0.06), 0 6px 20px oklch(0 0 0 / 0.08)',
};

/* ─── Visuals ───────────────────────────────────── */
function AuthVisual() {
  const providers = [
    { name: 'Google', Icon: Chrome, label: 'Continue with Google', dark: false },
    { name: 'GitHub', Icon: Github, label: 'Continue with GitHub', dark: true  },
    { name: 'Email',  Icon: Mail,   label: 'Continue with Email',  dark: false },
  ];
  return (
    <div style={{ ...card, padding: '1.75rem' }}>
      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 3, color: 'var(--color-text)' }}>Sign in to Acme</p>
      <p style={{ fontSize: 11, marginBottom: '1.5rem', color: 'var(--color-text-faint)' }}>Welcome back</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {providers.map((p) => (
          <div key={p.name} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 14px', borderRadius: 8,
            background: p.dark ? 'oklch(0.18 0.01 285)' : 'var(--color-surface-offset, var(--color-surface))',
            border: '1px solid var(--color-border)',
            fontSize: 12, fontWeight: 500,
            color: p.dark ? '#f1f1f1' : 'var(--color-text)',
          }}>
            <p.Icon size={14} aria-hidden="true" />{p.label}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '1rem 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
        <span style={{ fontSize: 10, color: 'var(--color-text-faint)' }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
      </div>
      <div style={{ padding: '9px 14px', borderRadius: 8, background: 'var(--color-text)', color: 'var(--color-bg)', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>Create account →</div>
      <div style={{ marginTop: '1rem', padding: '8px 12px', borderRadius: 8, background: 'oklch(0.52 0.22 285 / 0.10)', border: '1px solid oklch(0.52 0.22 285 / 0.20)', fontSize: 10, color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <CheckCircle2 size={11} aria-hidden="true" /> Session stored · Prisma · strategy: database
      </div>
    </div>
  );
}

function BillingVisual() {
  const events = [
    { label: 'checkout.session.completed',    time: 'just now', dot: 'oklch(0.62 0.16 145)' },
    { label: 'invoice.payment_succeeded',      time: '2s ago',   dot: 'oklch(0.62 0.20 285)' },
    { label: 'customer.subscription.updated', time: '8s ago',   dot: 'oklch(0.72 0.18 75)'  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ ...card, padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 11, marginBottom: 4, color: 'var(--color-text-faint)' }}>Current plan</p>
            <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
              $49<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--color-text-muted)' }}>/mo</span>
            </p>
          </div>
          <span style={{ padding: '3px 10px', borderRadius: 9999, background: 'oklch(0.52 0.22 285 / 0.12)', color: 'var(--color-accent)', fontSize: 10, fontWeight: 700 }}>Pro</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          {[{ label: 'Seats', val: '5' }, { label: 'Storage', val: '50 GB' }].map((m) => (
            <div key={m.label}>
              <p style={{ fontSize: 9, marginBottom: 2, color: 'var(--color-text-faint)' }}>{m.label}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{m.val}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...card, overflow: 'hidden' }}>
        <p style={{ padding: '8px 14px', fontSize: 10, fontWeight: 600, borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>Stripe webhooks</p>
        {events.map((e, i) => (
          <div key={e.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderBottom: i < events.length - 1 ? '1px solid var(--color-border)' : 'none', fontSize: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: e.dot, flexShrink: 0, display: 'block' }} />
            <span style={{ flex: 1, fontFamily: 'ui-monospace, monospace', color: 'var(--color-text-muted)' }}>{e.label}</span>
            <span style={{ color: 'var(--color-text-faint)' }}>{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailVisual() {
  return (
    <div style={{ ...card, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'oklch(0.52 0.22 285 / 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--color-accent)' }}>A</div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>Acme — Welcome!</p>
          <p style={{ fontSize: 10, margin: 0, color: 'var(--color-text-faint)' }}>hello@acme.com → you@email.com</p>
        </div>
      </div>
      <div style={{ padding: '1.25rem 1.5rem' }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>Welcome to Acme</p>
        <p style={{ fontSize: 11, lineHeight: 1.75, marginBottom: '1.25rem', color: 'var(--color-text-muted)' }}>You’re all set. Your account is live and ready. Click below to get started.</p>
        <div style={{ display: 'inline-block', padding: '9px 20px', borderRadius: 7, background: 'var(--color-text)', color: 'var(--color-bg)', fontSize: 11, fontWeight: 600, marginBottom: '1rem' }}>Open dashboard →</div>
        <div style={{ padding: '8px 12px', borderRadius: 8, background: 'oklch(0.72 0.18 75 / 0.10)', border: '1px solid oklch(0.72 0.18 75 / 0.22)', fontSize: 10, fontFamily: 'ui-monospace, monospace', color: 'oklch(0.68 0.16 75)' }}>React Email + Resend · type-safe</div>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [42, 58, 50, 71, 65, 80, 74, 90, 86, 95, 88, 100];
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const kpis = [
    { label: 'MRR',   value: '$12.4k', delta: '+8.2%',  up: true  },
    { label: 'Users', value: '1,847',  delta: '+12.4%', up: true  },
    { label: 'Churn', value: '2.1%',   delta: '-0.3%',  up: false },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ ...card, padding: 14 }}>
            <p style={{ fontSize: 9, marginBottom: 6, color: 'var(--color-text-faint)' }}>{k.label}</p>
            <p style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4, fontVariantNumeric: 'tabular-nums', color: 'var(--color-text)' }}>{k.value}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {k.up
                ? <TrendingUp   size={10} style={{ color: 'oklch(0.62 0.16 145)' }} aria-hidden="true" />
                : <TrendingDown size={10} style={{ color: 'oklch(0.62 0.18 25)'  }} aria-hidden="true" />
              }
              <p style={{ fontSize: 9, fontWeight: 600, color: k.up ? 'oklch(0.62 0.16 145)' : 'oklch(0.62 0.18 25)', margin: 0 }}>{k.delta}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...card, padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', margin: 0 }}>Revenue · 2025</p>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: 'oklch(0.58 0.15 145 / 0.12)', color: 'oklch(0.62 0.15 145)' }}>+34.2%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 64 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: '100%', height: `${h}%`, borderRadius: 3, background: i === bars.length - 1 ? 'oklch(0.52 0.22 285)' : `oklch(0.52 0.22 285 / ${0.15 + i * 0.06})` }} />
              <span style={{ fontSize: 7, color: 'var(--color-text-faint)' }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Row data ───────────────────────────────────── */
const rows = [
  {
    tag: 'Authentication', hue: 285,
    title: 'Auth in 5 minutes,\nnot 5 days.',
    description: 'NextAuth v5 pre-configured with Google, GitHub, and magic-link email. Prisma-backed sessions, middleware-protected routes, and role-based access — ready from your first git clone.',
    bullets: ['Google + GitHub + magic-link', 'Prisma session strategy', 'Middleware route protection', 'Role-based access control'],
    visual: <AuthVisual />, flip: false,
  },
  {
    tag: 'Billing', hue: 192,
    title: 'Stripe billing,\nfully wired up.',
    description: 'Checkout, webhooks, billing portal, Stripe Tax, and invoice emails — all connected. Subscription status lives in the session so every component knows the plan in real time.',
    bullets: ['Checkout + Stripe Tax', 'Webhook to Prisma sync', 'Billing portal redirect', 'Invoice emails via Resend'],
    visual: <BillingVisual />, flip: true,
  },
  {
    tag: 'Email', hue: 75,
    title: 'Beautiful emails\nout of the box.',
    description: 'React Email components + Resend delivery. Fully typed, preview in the browser, and pixel-perfect across every client. Welcome, invoice, and password-reset templates included.',
    bullets: ['React Email components', 'Resend API integration', 'Browser preview dev mode', 'Welcome + invoice templates'],
    visual: <EmailVisual />, flip: false,
  },
  {
    tag: 'Analytics', hue: 145,
    title: 'KPIs you can\nact on instantly.',
    description: 'Recharts dashboards with MRR, churn, and user metrics. Prisma Pulse streams real-time events so your charts update the moment something happens — no polling, no delay.',
    bullets: ['MRR, churn, NPS tracking', 'Prisma Pulse real-time sync', 'Recharts + custom tooltips', 'Exportable CSV data'],
    visual: <AnalyticsVisual />, flip: true,
  },
];

/* ─── Section ────────────────────────────────────── */
export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        position: 'relative',
        padding: '7rem 0 5rem',
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
          backgroundImage: 'radial-gradient(var(--feat-dot) 1.2px, transparent 1.2px)',
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
          position: 'absolute', top: '-80px', left: '50%',
          transform: 'translateX(-50%)',
          width: '60%', height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 30%, var(--feat-glow) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div style={{ maxWidth: 560, marginBottom: '5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 9999,
            background: 'oklch(0.52 0.22 285 / 0.09)',
            border: '1px solid oklch(0.52 0.22 285 / 0.20)',
            color: 'var(--color-accent)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
            textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            <Zap size={10} aria-hidden="true" /> Built for speed
          </div>
          <h2
            id="features-heading"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 1.75vw, 2.75rem)',
              fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em',
              marginBottom: '1rem', color: 'var(--color-text)',
            }}
          >
            Everything wired up on day&nbsp;one
          </h2>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '42ch', color: 'var(--color-text-muted)', margin: 0 }}>
            Skip the boilerplate. Auth, billing, email, and analytics are production-ready from your very first commit.
          </p>
        </div>

        {/* Feature rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {rows.map((row) => <FeatureRow key={row.tag} row={row} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── FeatureRow ───────────────────────────────── */
function FeatureRow({ row }: { row: typeof rows[number] }) {
  const accent = `oklch(0.65 0.18 ${row.hue})`;
  return (
    <div
      className="feat-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}
    >
      {/* Copy — order swapped via CSS order instead of direction:rtl */}
      <div style={{ order: row.flip ? 2 : 1 }}>
        {/* tag pill */}
        <div style={{
          display: 'inline-block',
          padding: '3px 10px', borderRadius: 9999,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
          textTransform: 'uppercase', marginBottom: '1rem',
          background: `oklch(0.52 0.18 ${row.hue} / 0.12)`,
          color: accent,
          border: `1px solid oklch(0.52 0.18 ${row.hue} / 0.28)`,
        }}>
          {row.tag}
        </div>

        <h3 style={{
          fontSize: 'clamp(1.5rem, 1rem + 1.2vw, 2.1rem)',
          fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em',
          marginBottom: '1rem', whiteSpace: 'pre-line',
          color: 'var(--color-text)',
        }}>
          {row.title}
        </h3>

        <p style={{ fontSize: '1rem', lineHeight: 1.75, maxWidth: '42ch', marginBottom: '1.75rem', color: 'var(--color-text-muted)' }}>
          {row.description}
        </p>

        {/* accent top-line before bullets */}
        <div style={{ width: 32, height: 2, borderRadius: 9999, background: accent, marginBottom: '1.25rem' }} />

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {row.bullets.map((b) => (
            <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 14, height: 1.5, background: accent, flexShrink: 0, display: 'block', borderRadius: 1 }} />
              <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <div
        className="feat-row-visual"
        style={{ order: row.flip ? 1 : 2, position: 'relative' }}
      >
        {/* per-feature glow halo */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: -40, borderRadius: 24,
          background: `radial-gradient(ellipse at 50% 50%, oklch(0.52 0.18 ${row.hue} / 0.10) 0%, transparent 65%)`,
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>{row.visual}</div>
      </div>
    </div>
  );
}
