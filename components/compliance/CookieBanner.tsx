'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getConsent, acceptAll, rejectAll, isConsentExpired, isGPCEnabled } from './ConsentManager'
import { CookiePreferences } from './CookiePreferences'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [gpcDetected, setGpcDetected] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)

  useEffect(() => {
    if (isGPCEnabled()) {
      setGpcDetected(true)
      rejectAll()
      return
    }
    const consent = getConsent()
    if (!consent || isConsentExpired()) setVisible(true)
  }, [])

  if (!visible && !gpcDetected) return null

  if (gpcDetected) {
    return (
      <div
        role="region"
        aria-label="Privacy notice"
        aria-live="polite"
        style={{
          position: 'fixed', bottom: 'var(--space-4)', left: 'var(--space-4)',
          background: 'var(--color-surface-2)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)',
          fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', zIndex: 9998,
          maxWidth: 360, boxShadow: 'var(--shadow-md)',
        }}
      >
        Your privacy preferences have been honored (GPC detected).
        <button onClick={() => setGpcDetected(false)} aria-label="Dismiss" style={{ marginLeft: 8, color: 'var(--color-text-faint)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={12} /></button>
      </div>
    )
  }

  return (
    <>
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Cookie consent"
        aria-live="polite"
        style={{
          position: 'fixed', bottom: 'var(--space-6)', left: '50%', transform: 'translateX(-50%)',
          width: 'min(640px, calc(100vw - var(--space-8)))',
          background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-lg)', zIndex: 9998,
        }}
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 'var(--space-4)', maxWidth: '100%' }}>
          We use cookies to improve your experience and analyze site usage. We won't load non-essential scripts until you consent.{' '}
          <a href="/cookies" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Cookie Policy</a>
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button
            onClick={() => { rejectAll(); setVisible(false) }}
            style={{
              flex: 1, minWidth: 120, padding: 'var(--space-3) var(--space-4)',
              background: 'transparent', border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--color-text)', cursor: 'pointer',
            }}
          >
            Reject All
          </button>
          <button
            onClick={() => setPrefsOpen(true)}
            style={{
              flex: 1, minWidth: 120, padding: 'var(--space-3) var(--space-4)',
              background: 'transparent', border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--color-text)', cursor: 'pointer',
            }}
          >
            Manage Preferences
          </button>
          <button
            onClick={() => { acceptAll(); setVisible(false) }}
            style={{
              flex: 1, minWidth: 120, padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-primary)', border: '1px solid var(--color-primary)',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600,
              color: '#fff', cursor: 'pointer',
            }}
          >
            Accept All
          </button>
        </div>
      </div>
      {prefsOpen && <CookiePreferences onClose={() => { setPrefsOpen(false); setVisible(false) }} />}
    </>
  )
}
