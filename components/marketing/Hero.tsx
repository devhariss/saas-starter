import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Play, Sparkles, CheckCircle } from 'lucide-react';

const STACK = [
  { name: 'Next.js 15',     color: 'oklch(0.72 0.01 285)' },
  { name: 'Supabase',       color: 'oklch(0.58 0.18 152)' },
  { name: 'Stripe',         color: 'oklch(0.55 0.20 264)' },
  { name: 'Prisma',         color: 'oklch(0.52 0.12 220)' },
  { name: 'Resend',         color: 'oklch(0.58 0.16 22)'  },
  { name: 'TypeScript',     color: 'oklch(0.52 0.18 240)' },
];

const SOCIAL_HUES = [285, 192, 145, 75, 22];

export function Hero() {
  return (
    <>
      <style>{`
        :root,[data-theme="light"]{
          --h-beam: oklch(0.52 0.22 285 / 0.13);
          --h-beam2: oklch(0.55 0.20 192 / 0.09);
          --h-dot: oklch(0.40 0.04 285 / 0.30);
          --h-grid: oklch(0.50 0.04 285 / 0.07);
        }
        [data-theme="dark"]{
          --h-beam: oklch(0.52 0.22 285 / 0.18);
          --h-beam2: oklch(0.55 0.20 192 / 0.13);
          --h-dot: oklch(0.72 0.08 285 / 0.22);
          --h-grid: oklch(0.70 0.04 285 / 0.05);
        }
        @media(prefers-color-scheme:dark){
          :root:not([data-theme]){
            --h-beam:oklch(0.52 0.22 285 / 0.18);
            --h-beam2:oklch(0.55 0.20 192 / 0.13);
            --h-dot:oklch(0.72 0.08 285 / 0.22);
            --h-grid:oklch(0.70 0.04 285 / 0.05);
          }
        }
        @keyframes hero-in {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-fadeup { animation: hero-in .7s cubic-bezier(.16,1,.3,1) both; }
        @media(max-width:767px){ .hero-grid { grid-template-columns:1fr!important; } }
      `}</style>

      <section
        aria-labelledby="hero-heading"
        style={{
          position: 'relative', overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex', alignItems: 'center',
          background: 'var(--color-bg)',
          paddingTop: 60,
        }}
      >
        {/* ── Backgrounds ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

          {/* Grid lines */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(var(--h-grid) 1px, transparent 1px),
              linear-gradient(90deg, var(--h-grid) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 100%)',
          }} />

          {/* Dot overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(var(--h-dot) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 0%, transparent 100%)',
          }} />

          {/* Primary violet beam */}
          <div style={{
            position: 'absolute', top: '-20%', left: '50%',
            transform: 'translateX(-50%)',
            width: '80%', height: '70%', borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 0%, var(--h-beam) 0%, transparent 60%)',
          }} />

          {/* Teal counter-beam */}
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-10%',
            width: '50%', height: '50%', borderRadius: '50%',
            background: 'radial-gradient(ellipse at 70% 70%, var(--h-beam2) 0%, transparent 60%)',
          }} />

          {/* Hard conic sweep */}
          <div style={{
            position: 'absolute', top: '-5%', left: '50%',
            transform: 'translateX(-50%)',
            width: '1px', height: '70%',
            background: 'linear-gradient(to bottom, oklch(0.62 0.20 285 / 0.60), transparent)',
            filter: 'blur(1px)',
          }} />

          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
            background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
          }} />
        </div>

        {/* ── Content ── */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '5rem 24px 6rem', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* ── Left copy ── */}
            <div>
              {/* Announce chip */}
              <div className="hero-fadeup" style={{ animationDelay: '0ms', marginBottom: 28 }}>
                <Link href="/changelog" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '4px 6px 4px 5px',
                  borderRadius: 9999,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  boxShadow: '0 1px 6px oklch(0 0 0 / 0.06)',
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 9px', borderRadius: 9999,
                    background: 'linear-gradient(135deg, oklch(0.52 0.22 285), oklch(0.58 0.20 192))',
                    color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                  }}>
                    <Sparkles size={9} /> v1.0
                  </span>
                  <span style={{ fontSize: 12.5, color: 'var(--color-text-muted)', paddingRight: 6 }}>Prisma Pulse real-time sync is live</span>
                  <ArrowRight size={11} style={{ color: 'var(--color-text-faint)', marginRight: 4 }} />
                </Link>
              </div>

              {/* Headline */}
              <div className="hero-fadeup" style={{ animationDelay: '80ms' }}>
                <h1 id="hero-heading" style={{
                  fontSize: 'clamp(2.8rem, 2rem + 3vw, 4.5rem)',
                  fontWeight: 800, lineHeight: 1.02, letterSpacing: '-.04em',
                  color: 'var(--color-text)', margin: '0 0 1.5rem',
                }}>
                  Ship your SaaS{' '}
                  <span style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, oklch(0.62 0.22 285) 0%, oklch(0.62 0.20 192) 100%)',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>in days.</span>
                </h1>
              </div>

              {/* Sub */}
              <div className="hero-fadeup" style={{ animationDelay: '140ms' }}>
                <p style={{
                  fontSize: '1.125rem', lineHeight: 1.75,
                  color: 'var(--color-text-muted)',
                  maxWidth: '38ch', margin: '0 0 2.25rem',
                }}>
                  Production-ready auth, billing, email, and analytics. Built on Next.js 15 — fully typed, tested, and ready to clone.
                </p>
              </div>

              {/* CTAs */}
              <div className="hero-fadeup" style={{ animationDelay: '180ms', display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <Link href="/sign-up" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '11px 22px', borderRadius: 10,
                  fontSize: 14.5, fontWeight: 700,
                  background: 'linear-gradient(135deg, oklch(0.52 0.22 285), oklch(0.52 0.20 192))',
                  color: 'white', textDecoration: 'none',
                  boxShadow: '0 4px 20px oklch(0.52 0.22 285 / 0.40)',
                  letterSpacing: '-.01em',
                }}>
                  Get started free <ArrowRight size={15} />
                </Link>
                <a href="https://github.com/devhariss/saas-starter" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '11px 20px', borderRadius: 10,
                  fontSize: 14.5, fontWeight: 500,
                  color: 'var(--color-text)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                }}>
                  <Github size={15} /> View on GitHub
                </a>
              </div>

              {/* Trust row */}
              <div className="hero-fadeup" style={{ animationDelay: '220ms', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex' }}>
                  {SOCIAL_HUES.map((h, i) => (
                    <div key={h} style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: `linear-gradient(135deg, oklch(0.48 0.16 ${h}), oklch(0.56 0.18 ${h}))`,
                      border: '2px solid var(--color-bg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: 'white',
                      marginLeft: i > 0 ? -9 : 0,
                      zIndex: SOCIAL_HUES.length - i,
                    }}>
                      {['J','A','R','P','T'][i]}
                    </div>
                  ))}
                </div>
                <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-.01em' }}>2,400+ developers</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-faint)' }}>already shipped their SaaS</div>
                </div>
              </div>

              {/* Stack pills */}
              <div className="hero-fadeup" style={{ animationDelay: '260ms', display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 28 }}>
                {STACK.map(s => (
                  <span key={s.name} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: 6,
                    fontSize: 11.5, fontWeight: 500,
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}>
                    <CheckCircle size={9} style={{ color: s.color }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: dramatic mockup ── */}
            <div className="hero-fadeup" style={{ animationDelay: '320ms', position: 'relative' }}>
              {/* Glow halo behind card */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: '-40px',
                background: 'radial-gradient(ellipse at 50% 50%, oklch(0.52 0.22 285 / 0.14) 0%, transparent 65%)',
                borderRadius: '50%', pointerEvents: 'none',
              }} />

              {/* Floating stats pill — top left */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: -16, left: -20,
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 12px', borderRadius: 10,
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 24px oklch(0 0 0 / 0.12)',
                zIndex: 3, whiteSpace: 'nowrap',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'oklch(0.62 0.16 145)', display: 'block', flexShrink: 0, boxShadow: '0 0 6px oklch(0.62 0.16 145 / 0.7)' }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text)' }}>+$1,240 MRR today</span>
              </div>

              {/* Floating build time pill — bottom right */}
              <div aria-hidden="true" style={{
                position: 'absolute', bottom: -14, right: -20,
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '7px 12px', borderRadius: 10,
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 24px oklch(0 0 0 / 0.12)',
                zIndex: 3, whiteSpace: 'nowrap',
              }}>
                <Play size={10} style={{ color: 'oklch(0.62 0.20 285)', fill: 'oklch(0.62 0.20 285)' }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text)' }}>Deployed in 11 days</span>
              </div>

              {/* Browser card */}
              <div style={{
                position: 'relative', zIndex: 2,
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                boxShadow: '0 2px 4px oklch(0 0 0 / 0.06), 0 20px 60px oklch(0 0 0 / 0.18)',
              }}>
                <DashboardMockup />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DashboardMockup() {
  const kpis = [
    { label: 'MRR',   value: '$24.8k', delta: '+18%',  hue: 145, up: true  },
    { label: 'ARR',   value: '$297k',  delta: '+18%',  hue: 145, up: true  },
    { label: 'Users', value: '3,241',  delta: '+22%',  hue: 285, up: true  },
    { label: 'Churn', value: '1.4%',   delta: '-0.6%', hue: 22,  up: false },
  ];
  const bars  = [28,36,32,45,42,54,50,62,58,70,66,100];
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const activity = [
    { dot: 'oklch(0.62 0.16 145)', text: 'New signup · priya@nexaflow.io', time: 'now' },
    { dot: 'oklch(0.62 0.20 285)', text: 'Invoice paid · $49 · Pro plan',  time: '2m' },
    { dot: 'oklch(0.62 0.18 192)', text: 'Webhook · stripe.checkout.done', time: '5m' },
  ];

  return (
    <div style={{ fontSize: 0 }}>
      {/* Window bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['oklch(0.62 0.20 22)','oklch(0.70 0.18 75)','oklch(0.58 0.15 145)'].map(c => (
            <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'block' }} />
          ))}
        </div>
        <div style={{
          flex: 1, padding: '3px 10px', borderRadius: 6,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          fontSize: 10, color: 'var(--color-text-faint)',
          fontFamily: 'ui-monospace,monospace',
        }}>app.saastarter.dev/dashboard</div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: 110, flexShrink: 0, padding: '10px 8px', borderRight: '1px solid var(--color-border)' }}>
          {['Overview','Revenue','Users','Settings'].map((item, i) => (
            <div key={item} style={{
              padding: '6px 9px', borderRadius: 6,
              fontSize: 11, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? 'var(--color-text)' : 'var(--color-text-faint)',
              background: i === 0 ? 'oklch(0.52 0.22 285 / 0.10)' : 'transparent',
              borderLeft: i === 0 ? '2px solid oklch(0.62 0.20 285)' : '2px solid transparent',
              marginBottom: 2,
            }}>{item}</div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: 12, minWidth: 0 }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 10 }}>
            {kpis.map(k => (
              <div key={k.label} style={{
                padding: '8px 9px', borderRadius: 9,
                background: `oklch(0.52 0.18 ${k.hue} / 0.06)`,
                border: `1px solid oklch(0.52 0.18 ${k.hue} / 0.15)`,
              }}>
                <div style={{ fontSize: 8.5, color: 'var(--color-text-faint)', marginBottom: 3 }}>{k.label}</div>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--color-text)', fontVariantNumeric: 'tabular-nums' }}>{k.value}</div>
                <div style={{ fontSize: 8.5, fontWeight: 600, color: k.up ? 'oklch(0.58 0.15 145)' : 'oklch(0.62 0.20 22)', marginTop: 2 }}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ padding: '9px 10px', borderRadius: 9, background: 'var(--color-surface)', border: '1px solid var(--color-border)', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--color-text-muted)' }}>Revenue · 2025</span>
              <span style={{ fontSize: 8.5, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: 'oklch(0.55 0.15 145 / 0.12)', color: 'oklch(0.58 0.15 145)' }}>+34.2%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 52 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{
                    width: '100%', height: `${h}%`, borderRadius: 2,
                    background: i === bars.length - 1
                      ? 'linear-gradient(to top, oklch(0.52 0.22 285), oklch(0.62 0.20 192))'
                      : `oklch(0.52 0.22 285 / ${.12 + i*.055})`,
                  }} />
                  <span style={{ fontSize: 6.5, color: 'var(--color-text-faint)' }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div style={{ borderRadius: 9, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <div style={{ padding: '5px 9px', fontSize: 9.5, fontWeight: 600, color: 'var(--color-text-muted)', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>Live activity</div>
            {activity.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 9px', fontSize: 9.5, background: 'var(--color-surface)', borderBottom: i < activity.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: r.dot, flexShrink: 0, boxShadow: `0 0 4px ${r.dot}` }} />
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--color-text-muted)' }}>{r.text}</span>
                <span style={{ color: 'var(--color-text-faint)', flexShrink: 0 }}>{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
