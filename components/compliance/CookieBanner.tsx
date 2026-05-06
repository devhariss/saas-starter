'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { getConsent, setConsent, isConsentExpired, isGPCEnabled } from './ConsentManager'

const CookiePreferences = dynamic(() => import('./CookiePreferences'), { ssr: false })

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [gpcDetected, setGpcDetected] = useState(false)

  useEffect(() => {
    const gpc = isGPCEnabled() || document.cookie.includes('gpc_detected=1')
    if (gpc) {
      setGpcDetected(true)
      setConsent({ analytics: false, marketing: false, functional: false })
      return
    }
    const existing = getConsent()
    if (!existing || isConsentExpired()) {
      setVisible(true)
    }
  }, [])

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true, functional: true })
    setVisible(false)
  }

  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false, functional: false })
    setVisible(false)
  }

  if (gpcDetected) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed', bottom: 'var(--space-4)', left: 'var(--space-4)',
          background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)',
          fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', zIndex: 1000,
          maxWidth: '320px', boxShadow: 'var(--shadow-md)',
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
          background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)',
          zIndex: 1000, width: 'min(560px, calc(100vw - var(--space-8)))',
          boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
        }}
      >
        <div>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 var(--space-2)' }}>
            We value your privacy
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
            We use cookies to provide essential site functionality and, with your consent, to analyze usage and personalize your experience.
            See our{' '}
            <a href="/cookies" style={{ color: 'var(--color-primary)' }}>Cookie Policy</a> for details.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button
            onClick={acceptAll}
            style={{
              flex: 1, minWidth: '100px', padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-primary)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Accept all
          </button>
          <button
            onClick={rejectAll}
            style={{
              flex: 1, minWidth: '100px', padding: 'var(--space-2) var(--space-4)',
              background: 'transparent', color: 'var(--color-text)',
              border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Reject all
          </button>
          <button
            onClick={() => setPrefsOpen(true)}
            style={{
              flex: 1, minWidth: '100px', padding: 'var(--space-2) var(--space-4)',
              background: 'transparent', color: 'var(--color-text-muted)',
              border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 500, cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Manage preferences
          </button>
        </div>
      </div>
      {prefsOpen && (
        <CookiePreferences
          onClose={() => setPrefsOpen(false)}
          onSave={() => { setPrefsOpen(false); setVisible(false) }}
        />
      )}
    </>
  )
}
