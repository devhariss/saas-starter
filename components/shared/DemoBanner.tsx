'use client';

import { useState } from 'react';
import { AlertTriangle, X, Github } from 'lucide-react';

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="Demo mode notice"
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 14px 9px 12px',
        borderRadius: 12,
        background: 'oklch(0.14 0.02 285 / 0.96)',
        border: '1px solid oklch(0.52 0.22 285 / 0.40)',
        boxShadow: '0 8px 32px oklch(0 0 0 / 0.40), 0 0 0 1px oklch(0.52 0.22 285 / 0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        whiteSpace: 'nowrap',
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      {/* Pulsing dot */}
      <span style={{ position: 'relative', display: 'flex', width: 8, height: 8, flexShrink: 0 }}>
        <span style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: 'oklch(0.72 0.18 75)',
          animation: 'demo-ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
          opacity: 0.6,
        }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.72 0.18 75)', display: 'block' }} />
      </span>

      <AlertTriangle size={13} style={{ color: 'oklch(0.72 0.18 75)', flexShrink: 0 }} aria-hidden />

      <span style={{ fontSize: 12.5, fontWeight: 500, color: 'oklch(0.88 0.04 285)' }}>
        <strong style={{ fontWeight: 700, color: 'white' }}>Preview branch</strong>
        {' — auth is bypassed, data is mocked. '}
        <strong style={{ color: 'oklch(0.72 0.18 75)' }}>Do not use in production.</strong>
      </span>

      <a
        href="https://github.com/devhariss/saas-starter/tree/preview"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', borderRadius: 7,
          fontSize: 11.5, fontWeight: 600,
          background: 'oklch(0.52 0.22 285 / 0.20)',
          border: '1px solid oklch(0.52 0.22 285 / 0.35)',
          color: 'oklch(0.75 0.12 285)',
          textDecoration: 'none', flexShrink: 0,
        }}
      >
        <Github size={11} /> View branch
      </a>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss demo notice"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'oklch(0.60 0.04 285)', padding: 4,
          display: 'flex', alignItems: 'center', flexShrink: 0,
        }}
      >
        <X size={14} />
      </button>

      <style>{`
        @keyframes demo-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
