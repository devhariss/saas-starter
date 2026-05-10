'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Github, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

const NAV_LINKS = [
  { href: '/#features',     label: 'Features'     },
  { href: '/#pricing',      label: 'Pricing'       },
  { href: '/#faq',          label: 'FAQ'           },
  { href: '/docs',          label: 'Docs'          },
];

export function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          padding: 6px 13px; border-radius: 7px;
          font-size: 13.5px; font-weight: 450;
          color: var(--color-text-muted); text-decoration: none;
          transition: color .15s, background .15s;
          letter-spacing: -.01em;
        }
        .nav-link:hover { color: var(--color-text); background: var(--color-surface); }
        @media(min-width:768px){.nav-d{display:flex!important}.nav-m{display:none!important}}
        @media(max-width:767px){.nav-d{display:none!important}.nav-m{display:flex!important}}
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 60,
        transition: 'background .3s, border-color .3s, box-shadow .3s',
        background: scrolled ? 'color-mix(in oklch, var(--color-bg) 85%, transparent)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: '100%', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
            <span style={{
              width: 30, height: 30, borderRadius: 9,
              background: 'linear-gradient(135deg, oklch(0.52 0.22 285), oklch(0.58 0.20 192))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px oklch(0.52 0.22 285 / 0.35)',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3v10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </span>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-.03em', color: 'var(--color-text)' }}>
              SaaS<span style={{ color: 'oklch(0.62 0.20 285)' }}>Starter</span>
            </span>
          </Link>

          {/* Desktop links — centred pill nav */}
          <nav className="nav-d" style={{ alignItems: 'center', gap: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 10, padding: '3px 4px', gap: 2,
            }}>
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
              ))}
            </div>
          </nav>

          {/* Desktop right */}
          <div className="nav-d" style={{ alignItems: 'center', gap: 8 }}>
            <a href="https://github.com/devhariss/saas-starter" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 11px', borderRadius: 8,
                fontSize: 12.5, fontWeight: 500,
                color: 'var(--color-text-muted)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                textDecoration: 'none',
              }}
            >
              <Github size={13} />
              GitHub
            </a>
            <Link href="/sign-in" style={{ fontSize: 13.5, color: 'var(--color-text-muted)', textDecoration: 'none', padding: '5px 10px' }}>
              Sign in
            </Link>
            <Link href="/sign-up" style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 15px', borderRadius: 8,
              fontSize: 13.5, fontWeight: 600,
              background: 'var(--color-text)', color: 'var(--color-bg)',
              textDecoration: 'none',
              boxShadow: '0 1px 6px oklch(0 0 0 / 0.18)',
            }}>
              Get started <ArrowRight size={13} />
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="nav-m" style={{ alignItems: 'center', gap: 6 }}>
            <ThemeToggle />
            <button onClick={() => setOpen(s => !s)}
              aria-label={open ? 'Close' : 'Menu'} aria-expanded={open}
              style={{
                background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: 8, padding: '6px 8px', cursor: 'pointer',
                color: 'var(--color-text)', display: 'flex',
              }}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div style={{
          position: 'absolute', top: 60, left: 0, right: 0,
          background: 'color-mix(in oklch, var(--color-bg) 95%, transparent)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-border)',
          overflow: 'hidden',
          maxHeight: open ? 400 : 0, opacity: open ? 1 : 0,
          transition: 'max-height .28s ease, opacity .2s',
          padding: open ? '12px 16px 20px' : '0 16px',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ padding: '11px 14px', borderRadius: 8, color: 'var(--color-text)', textDecoration: 'none', fontSize: 15 }}>
                {l.label}
              </Link>
            ))}
            <div style={{ marginTop: 10, paddingTop: 12, borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/sign-in" onClick={() => setOpen(false)}
                style={{ padding: '11px 14px', borderRadius: 8, color: 'var(--color-text)', textDecoration: 'none', fontSize: 15 }}>Sign in</Link>
              <Link href="/sign-up" onClick={() => setOpen(false)}
                style={{ padding: '11px 14px', borderRadius: 9, background: 'var(--color-text)', color: 'var(--color-bg)', textDecoration: 'none', fontSize: 15, fontWeight: 600, textAlign: 'center' }}>Get started free</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
