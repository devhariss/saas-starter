'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  getConsent,
  setConsent,
  isConsentExpired,
  isGPCEnabled,
} from './ConsentManager'

const CookiePreferences = dynamic(() =>
  import('./CookiePreferences').then((m) => m.CookiePreferences), { ssr: false }
)

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [gpcNotice, setGpcNotice] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)

  useEffect(() => {
    if (isGPCEnabled()) {
      setConsent({ analytics: false, marketing: false, functional: false })
      setGpcNotice(true)
      return
    }
    const consent = getConsent()
    if (!consent || isConsentExpired()) setVisible(true)
  }, [])

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true, functional: true })
    setVisible(false)
  }

  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false, functional: false })
    setVisible(false)
  }

  if (!visible && !gpcNotice) return null

  if (gpcNotice) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed', bottom: 'var(--space-4)', left: 'var(--space-4)',
          zIndex: 9998, maxWidth: '360px',
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
          🔒 Your privacy preferences have been honored (GPC detected).
        </p>
        <button
          onClick={() => setGpcNotice(false)}
          aria-label="Dismiss GPC notice"
          style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >Dismiss</button>
      </div>
    )
  }

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        style={{
          position: 'fixed', bottom: 'var(--space-6)', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, width: 'min(640px, calc(100vw - var(--space-8)))',
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 'var(--space-2)', fontWeight: 600 }}>We use cookies</p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
          We use essential cookies to operate the site, and optional analytics/marketing cookies to improve your experience.
          Read our <a href="/cookies" style={{ color: 'var(--color-primary)' }}>Cookie Policy</a>.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button
            onClick={acceptAll}
            style={{
              flex: 1, minWidth: '120px', padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-primary)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
              minHeight: '44px',
            }}
          >Accept all</button>
          <button
            onClick={rejectAll}
            style={{
              flex: 1, minWidth: '120px', padding: 'var(--space-2) var(--space-4)',
              background: 'transparent', color: 'var(--color-text)',
              border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
              minHeight: '44px',
            }}
          >Reject all</button>
          <button
            onClick={() => setPrefsOpen(true)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'transparent', color: 'var(--color-text-muted)',
              border: 'none', fontSize: 'var(--text-xs)', cursor: 'pointer',
              minHeight: '44px',
            }}
          >Manage preferences</button>
        </div>
      </div>
      {prefsOpen && (
        <CookiePreferences
          onClose={() => { setPrefsOpen(false); setVisible(false) }}
        />
      )}
    </>
  )
}
