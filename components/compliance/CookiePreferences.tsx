'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { getConsent, setConsent, type ConsentState } from './ConsentManager'

interface Props {
  onClose: () => void
  onSave: () => void
}

export default function CookiePreferences({ onClose, onSave }: Props) {
  const existing = getConsent()
  const [analytics, setAnalytics] = useState(existing?.analytics ?? false)
  const [marketing, setMarketing] = useState(existing?.marketing ?? false)
  const [functional, setFunctional] = useState(existing?.functional ?? false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    firstFocusable?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSave = () => {
    setConsent({ analytics, marketing, functional })
    onSave()
  }

  const categories = [
    { key: 'essential', label: 'Essential', description: 'Required for the site to function. Cannot be disabled.', locked: true, value: true },
    { key: 'analytics', label: 'Analytics', description: 'Help us understand how visitors interact with our site. Data is anonymized.', locked: false, value: analytics, onChange: setAnalytics },
    { key: 'marketing', label: 'Marketing', description: 'Used to deliver personalized advertisements and track ad campaign effectiveness.', locked: false, value: marketing, onChange: setMarketing },
    { key: 'functional', label: 'Functional', description: 'Enable enhanced functionality and personalization, such as live chat.', locked: false, value: functional, onChange: setFunctional },
  ]

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-modal="true"
      style={{ position: 'fixed', inset: 0, zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}
    >
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'oklch(0 0 0 / 0.5)' }} aria-hidden="true" />
      <div
        ref={dialogRef}
        style={{
          position: 'relative', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)', width: 'min(520px, 100%)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>Cookie preferences</h2>
          <button onClick={onClose} aria-label="Close cookie preferences" style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 'var(--space-1)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {categories.map((cat) => (
            <div key={cat.key} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 var(--space-1)' }}>{cat.label}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>{cat.description}</p>
              </div>
              <div style={{ flexShrink: 0 }}>
                {cat.locked ? (
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontWeight: 500 }}>Always on</span>
                ) : (
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <span className="sr-only">{cat.label}</span>
                    <input
                      type="checkbox"
                      checked={cat.value as boolean}
                      onChange={(e) => (cat.onChange as (v: boolean) => void)(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                      aria-label={`${cat.label} cookies`}
                    />
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={handleSave}
            style={{ flex: 1, padding: 'var(--space-3) var(--space-4)', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer', minHeight: '44px' }}
          >
            Save preferences
          </button>
          <button
            onClick={onClose}
            style={{ padding: 'var(--space-3) var(--space-4)', background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500, cursor: 'pointer', minHeight: '44px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
