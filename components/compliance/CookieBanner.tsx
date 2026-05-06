'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  shouldShowBanner,
  setConsent,
  isGPCEnabled,
  type ConsentState,
} from './ConsentManager'

const CookiePreferences = dynamic(() => import('./CookiePreferences'), { ssr: false })

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [gpcDetected, setGpcDetected] = useState(false)

  useEffect(() => {
    const gpc = isGPCEnabled() || document.cookie.includes('gpc_detected=1')
    if (gpc) {
      setGpcDetected(true)
      setConsent({ essential: true, analytics: false, marketing: false, functional: false })
      return
    }
    setVisible(shouldShowBanner())
  }, [])

  const acceptAll = useCallback(() => {
    setConsent({ essential: true, analytics: true, marketing: true, functional: true })
    setVisible(false)
  }, [])

  const rejectAll = useCallback(() => {
    setConsent({ essential: true, analytics: false, marketing: false, functional: false })
    setVisible(false)
  }, [])

  const handleSavePrefs = useCallback((state: ConsentState) => {
    setConsent(state)
    setPrefsOpen(false)
    setVisible(false)
  }, [])

  if (gpcDetected) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: 'var(--space-4)',
          left: 'var(--space-4)',
          zIndex: 9998,
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          maxWidth: '20rem',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
        }}
      >
        🔒 Your privacy preferences have been honored (GPC detected).
      </div>
    )
  }

  if (!visible) return null

  return (
    <>
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Cookie consent"
        style={{
          position: 'fixed',
          bottom: 'var(--space-4)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9998,
          width: 'min(calc(100vw - 2rem), 44rem)',
          padding: 'var(--space-6)',
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div>
          <p style={{ fontWeight: 600, marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            We value your privacy
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            We use cookies to provide essential functionality and, with your consent, to analyse usage
            and personalise your experience. See our{' '}
            <a href="/cookies" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              Cookie Policy
            </a>{' '}
            for details.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button
            onClick={acceptAll}
            style={{
              flex: 1,
              minWidth: '7rem',
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Accept all
          </button>
          <button
            onClick={rejectAll}
            style={{
              flex: 1,
              minWidth: '7rem',
              padding: 'var(--space-2) var(--space-4)',
              background: 'transparent',
              color: 'var(--color-text)',
              border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Reject all
          </button>
          <button
            onClick={() => setPrefsOpen(true)}
            style={{
              flex: 1,
              minWidth: '9rem',
              padding: 'var(--space-2) var(--space-4)',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              cursor: 'pointer',
              minHeight: '44px',
              textDecoration: 'underline',
            }}
          >
            Manage preferences
          </button>
        </div>
      </div>

      {prefsOpen && (
        <CookiePreferences onSave={handleSavePrefs} onClose={() => setPrefsOpen(false)} />
      )}
    </>
  )
}
