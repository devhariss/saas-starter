'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Github, Star } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

const NAV_LINKS = [
  { href: '/#features',     label: 'Features'     },
  { href: '/#pricing',      label: 'Pricing'       },
  { href: '/#testimonials', label: 'Testimonials'  },
  { href: '/#faq',          label: 'FAQ'           },
];

export function Navbar() {
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,  setActive]  = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-nav-drawer]') && !target.closest('[data-nav-hamburger]')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
        background: scrolled
          ? 'oklch(from var(--color-bg) l c h / 0.82)'
          : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(16px) saturate(1.3)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.3)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--color-border)' : 'none',
      }}
    >
      {/* Top accent gradient line — only when not scrolled */}
      {!scrolled && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 0, left: '10%', right: '10%',
            height: 1,
            background: 'linear-gradient(to right, transparent, oklch(0.62 0.20 285 / 0.25) 50%, transparent)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          maxWidth: 1280, margin: '0 auto',
          height: 64, padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* ─ Logo ─ */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}
        >
          <NavLogo />
          <span style={{ fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-text)', fontSize: 15 }}>
            SaaS<span style={{ color: 'var(--color-accent)' }}>Starter</span>
          </span>
        </Link>

        {/* ─ Desktop nav ─ */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-desktop">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setActive(l.href)}
                style={{
                  position: 'relative',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
              >
                {l.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute', bottom: -1, left: '20%', right: '20%',
                      height: 2, borderRadius: 9999,
                      background: 'var(--color-accent)',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ─ Desktop right ─ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-desktop">
          {/* GitHub star chip */}
          <a
            href="https://github.com/devhariss/saas-starter"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 7,
              fontSize: 12, fontWeight: 500,
              color: 'var(--color-text-muted)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
          >
            <Github size={13} aria-hidden="true" />
            <Star size={11} style={{ fill: 'oklch(0.78 0.18 75)', color: 'oklch(0.78 0.18 75)' }} aria-hidden="true" />
            <span>Star</span>
          </a>

          <Link
            href="/sign-in"
            style={{
              padding: '6px 12px', fontSize: 14,
              color: 'var(--color-text-muted)',
              textDecoration: 'none', transition: 'color 0.15s',
            }}
          >
            Sign in
          </Link>

          <Link
            href="/sign-up"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', borderRadius: 8,
              fontSize: 14, fontWeight: 600,
              background: 'var(--color-text)',
              color: 'var(--color-bg)',
              textDecoration: 'none',
              transition: 'filter 0.15s',
              boxShadow: '0 1px 4px oklch(0 0 0 / 0.15)',
            }}
          >
            Get started
          </Link>

          <ThemeToggle />
        </div>

        {/* ─ Mobile: theme + hamburger ─ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="nav-mobile">
          <ThemeToggle />
          <button
            data-nav-hamburger
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              padding: '6px 8px',
              borderRadius: 7,
              color: 'var(--color-text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* ─ Mobile drawer ─ */}
      <div
        data-nav-drawer
        style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
          padding: open ? '12px 16px 20px' : '0 16px',
          overflow: 'hidden',
          maxHeight: open ? 480 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.28s ease, opacity 0.2s ease, padding 0.2s ease',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => { setOpen(false); setActive(l.href); }}
              style={{
                padding: '11px 14px', borderRadius: 8,
                color: 'var(--color-text)', textDecoration: 'none',
                fontSize: 15, fontWeight: 400,
                background: active === l.href ? 'var(--color-surface)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              {l.label}
            </Link>
          ))}

          <div style={{ marginTop: 10, paddingTop: 12, borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              style={{ padding: '11px 14px', borderRadius: 8, color: 'var(--color-text)', textDecoration: 'none', fontSize: 15 }}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              style={{
                padding: '11px 14px', borderRadius: 9,
                background: 'var(--color-text)', color: 'var(--color-bg)',
                textDecoration: 'none', fontSize: 15, fontWeight: 600, textAlign: 'center',
              }}
            >
              Get started free
            </Link>
          </div>
        </nav>
      </div>

      <style>{`
        @media (min-width: 768px) { .nav-desktop{display:flex!important} .nav-mobile{display:none!important} }
        @media (max-width: 767px) { .nav-desktop{display:none!important} .nav-mobile{display:flex!important} }
      `}</style>
    </header>
  );
}

function NavLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="navgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.52 0.22 285)" />
          <stop offset="100%" stopColor="oklch(0.62 0.18 192)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#navgrad)" />
      <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
