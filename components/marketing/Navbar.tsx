// components/marketing/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#testimonials', label: 'Testimonials' },
    { href: '/#faq', label: 'FAQ' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 64,
        transition: 'all 0.2s',
        background: scrolled ? 'var(--color-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          height: '100%',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        >
          <NavLogo />
          <span style={{ fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--color-text)', fontSize: 15 }}>
            SaaS Starter
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden-mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: 14,
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-accent)';
                (e.target as HTMLElement).style.background = 'var(--color-surface)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-text-muted)';
                (e.target as HTMLElement).style.background = 'transparent';
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden-mobile">
          <Link
            href="/sign-in"
            style={{
              padding: '6px 12px',
              fontSize: 14,
              color: 'var(--color-text)',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              textDecoration: 'none',
              transition: 'filter 0.15s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.filter = 'brightness(1.1)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.filter = 'brightness(1)')}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            borderRadius: 6,
            color: 'var(--color-text)',
            display: 'none',
          }}
          className="show-mobile"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            background: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)',
            padding: '12px 16px 20px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 6,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  fontSize: 15,
                }}
              >
                {l.label}
              </Link>
            ))}
            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 6,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  fontSize: 15,
                }}
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}

function NavLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="navgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#navgrad)" />
      <path d="M7 12h10M12 7v10" stroke="var(--color-bg)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
