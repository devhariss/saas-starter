'use client'

import { useEffect, useState } from 'react'
import { needsBanner, acceptAll, rejectAll, isGPCEnabled, getConsent } from './ConsentManager'
import dynamic from 'next/dynamic'

const CookiePreferences = dynamic(() => import('./CookiePreferences'), { ssr: false })

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [gpcDetected, setGpcDetected] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)

  useEffect(() => {
    if (isGPCEnabled()) {
      setGpcDetected(true)
      // Auto-apply essential-only when GPC is detected
      if (!getConsent()) rejectAll()
      return
    }
    setVisible(needsBanner())
  }, [])

  if (gpcDetected) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-4 left-4 z-50 max-w-sm rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.10)] shadow-lg p-4 text-sm text-[var(--color-text-muted)]"
      >
        🛡 Your privacy preferences have been honored (GPC detected).
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
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-[oklch(from_var(--color-text)_l_c_h_/_0.10)] bg-[var(--color-surface)] shadow-lg"
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="flex-1 text-sm text-[var(--color-text-muted)] max-w-2xl">
            We use cookies to improve your experience. Essential cookies are always active.
            Optional cookies help us understand usage and improve our service.{' '}
            <button
              onClick={() => setShowPrefs(true)}
              className="underline text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
            >
              Manage preferences
            </button>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {/* Equal weight buttons — GDPR dark-pattern prevention */}
            <button
              onClick={() => { rejectAll(); setVisible(false) }}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.15)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
            >
              Reject all
            </button>
            <button
              onClick={() => { acceptAll(); setVisible(false) }}
              className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>

      {showPrefs && (
        <CookiePreferences
          onClose={() => { setShowPrefs(false); setVisible(false) }}
        />
      )}
    </>
  )
}
