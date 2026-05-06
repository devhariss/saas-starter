'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { shouldShowBanner, setConsent, revokeConsent, isGPCEnabled } from './ConsentManager'

const CookiePreferences = dynamic(() => import('./CookiePreferences'), {
  ssr: false,
})

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [gpcDetected, setGpcDetected] = useState(false)

  useEffect(() => {
    const gpc = isGPCEnabled()
    if (gpc) {
      revokeConsent()
      setGpcDetected(true)
      return
    }
    if (shouldShowBanner()) setVisible(true)
  }, [])

  const acceptAll = useCallback(() => {
    setConsent({ essential: true, analytics: true, marketing: true, functional: true })
    setVisible(false)
  }, [])

  const rejectAll = useCallback(() => {
    setConsent({ essential: true, analytics: false, marketing: false, functional: false })
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
          zIndex: 9999,
          maxWidth: '360px',
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
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
          width: 'min(640px, calc(100vw - 2rem))',
          zIndex: 9998,
          padding: 'var(--space-6)',
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-1)',
            }}
          >
            We use cookies
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', maxWidth: 'none' }}>
            We use essential cookies to make our site work. With your consent, we may also use analytics and
            functional cookies to improve your experience.{' '}
            <a href="/cookies" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              Cookie Policy
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button
            onClick={acceptAll}
            style={{
              flex: 1,
              minWidth: '120px',
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
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
              minWidth: '120px',
              padding: 'var(--space-2) var(--space-4)',
              background: 'transparent',
              color: 'var(--color-text)',
              border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Reject all
          </button>
          <button
            onClick={() => setShowPrefs(true)}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              border: 'none',
              fontSize: 'var(--text-xs)',
              cursor: 'pointer',
              minHeight: '44px',
              textDecoration: 'underline',
            }}
          >
            Manage preferences
          </button>
        </div>
      </div>
      {showPrefs && (
        <CookiePreferences
          onClose={() => setShowPrefs(false)}
          onSave={() => setVisible(false)}
        />
      )}
    </>
  )
}
