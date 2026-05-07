'use client'

import { useEffect, useState } from 'react'
import { shouldShowBanner, setConsent, isGPCEnabled } from './ConsentManager'
import dynamic from 'next/dynamic'

const CookiePreferences = dynamic(() => import('./CookiePreferences').then(m => m.CookiePreferences), {
  ssr: false,
})

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [gpc, setGpc] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)

  useEffect(() => {
    const gpcActive = isGPCEnabled()
    setGpc(gpcActive)
    if (gpcActive) {
      setConsent({ essential: true, analytics: false, marketing: false, functional: false, gpc: true })
      setVisible(false)
      return
    }
    setVisible(shouldShowBanner())
  }, [])

  if (!visible && !gpc) return null

  const acceptAll = () => {
    setConsent({ essential: true, analytics: true, marketing: true, functional: true })
    setVisible(false)
  }

  const rejectAll = () => {
    setConsent({ essential: true, analytics: false, marketing: false, functional: false })
    setVisible(false)
  }

  if (gpc) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed', bottom: 'var(--space-4)', left: 'var(--space-4)',
          background: 'var(--color-surface)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)',
          fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', maxWidth: 320, zIndex: 9999,
        }}
      >
        Your privacy preferences have been honored (GPC detected).
      </div>
    )
  }

  return (
    <>
      {showPrefs && (
        <CookiePreferences
          onClose={() => { setShowPrefs(false); setVisible(false) }}
        />
      )}
      <div
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="false"
        style={{
          position: 'fixed', bottom: 'var(--space-6)', left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(560px, calc(100vw - var(--space-8)))',
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 9998,
        }}
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 'var(--space-1)', fontWeight: 600 }}>
          We value your privacy
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
          We use cookies to improve your experience. You can accept all, reject non-essential, or manage preferences.
          See our <a href="/cookies" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Cookie Policy</a>.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={acceptAll}
            style={{
              flex: 1, minWidth: 100, padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-primary)', color: '#fff',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)',
              fontWeight: 600, border: 'none', cursor: 'pointer',
            }}
          >
            Accept all
          </button>
          <button
            onClick={rejectAll}
            style={{
              flex: 1, minWidth: 100, padding: 'var(--space-2) var(--space-4)',
              background: 'transparent',
              border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              color: 'var(--color-text)', borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Reject all
          </button>
          <button
            onClick={() => setShowPrefs(true)}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: 'transparent', border: 'none',
              color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)',
              cursor: 'pointer', textDecoration: 'underline',
            }}
          >
            Manage preferences
          </button>
        </div>
      </div>
    </>
  )
}
