'use client'

import { useState, useEffect } from 'react'
import { getConsent, acceptAll, rejectAll, isConsentExpired, isGPCEnabled } from './ConsentManager'
import { CookiePreferences } from './CookiePreferences'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [gpcDetected, setGpcDetected] = useState(false)

  useEffect(() => {
    const gpc = isGPCEnabled()
    if (gpc) {
      setGpcDetected(true)
      rejectAll()
      return
    }
    const consent = getConsent()
    if (!consent || isConsentExpired()) {
      setVisible(true)
    }
  }, [])

  if (gpcDetected) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed', bottom: 'var(--space-4)', left: 'var(--space-4)',
          background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)',
          fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)',
          maxWidth: '320px', zIndex: 9998, boxShadow: 'var(--shadow-md)',
        }}
      >
        Your privacy preferences have been honored (GPC detected).
      </div>
    )
  }

  if (!visible) return null

  return (
    <>
      <div
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="false"
        style={{
          position: 'fixed', bottom: 'var(--space-6)', left: '50%', transform: 'translateX(-50%)',
          width: 'min(560px, calc(100vw - var(--space-8)))',
          background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)',
          zIndex: 9998, boxShadow: 'var(--shadow-lg)',
        }}
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 'var(--space-2)', fontWeight: 600 }}>
          We use cookies
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)', lineHeight: 1.6 }}>
          We use essential cookies to make our site work. With your consent, we may also use analytics and functional
          cookies to improve your experience. See our{' '}
          <a href="/cookies" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Cookie Policy</a>.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button
            onClick={() => { acceptAll(); setVisible(false) }}
            style={{
              flex: 1, minWidth: '100px', padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-primary)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Accept all
          </button>
          <button
            onClick={() => { rejectAll(); setVisible(false) }}
            style={{
              flex: 1, minWidth: '100px', padding: 'var(--space-2) var(--space-4)',
              background: 'transparent', color: 'var(--color-text)',
              border: '1px solid oklch(from var(--color-text) l c h / 0.12)',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Reject all
          </button>
          <button
            onClick={() => setShowPreferences(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'transparent', color: 'var(--color-text-muted)',
              border: 'none', fontSize: 'var(--text-xs)', cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Manage preferences
          </button>
        </div>
      </div>
      {showPreferences && (
        <CookiePreferences
          onClose={() => { setShowPreferences(false); setVisible(false) }}
        />
      )}
    </>
  )
}
