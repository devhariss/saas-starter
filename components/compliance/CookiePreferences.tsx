'use client'

import { useEffect, useRef, useState } from 'react'
import { getConsent, setConsent, ConsentState } from './ConsentManager'

interface CookiePreferencesProps {
  onClose: () => void
}

const CATEGORIES = [
  {
    key: 'essential' as const,
    label: 'Essential',
    description: 'Required for the site to function. Cannot be disabled.',
    locked: true,
  },
  {
    key: 'analytics' as const,
    label: 'Analytics',
    description: 'Help us understand how you use SaasStarter so we can improve it.',
    locked: false,
  },
  {
    key: 'marketing' as const,
    label: 'Marketing',
    description: 'Used to serve relevant ads and measure campaign effectiveness.',
    locked: false,
  },
  {
    key: 'functional' as const,
    label: 'Functional',
    description: 'Enable enhanced features like live chat and personalisation.',
    locked: false,
  },
]

export function CookiePreferences({ onClose }: CookiePreferencesProps) {
  const [prefs, setPrefs] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  })
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const existing = getConsent()
    if (existing) setPrefs(existing)
    dialogRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const save = () => {
    setConsent(prefs)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'oklch(0.1 0.005 285 / 0.6)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        style={{
          background: 'var(--color-surface)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          width: 'min(480px, calc(100vw - var(--space-8)))',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          Cookie preferences
        </h2>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
          Choose which cookies you allow SaasStarter to use.
        </p>
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend className="sr-only">Cookie categories</legend>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                gap: 'var(--space-4)', padding: 'var(--space-4) 0',
                borderBottom: '1px solid oklch(from var(--color-text) l c h / 0.08)',
              }}
            >
              <div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 4 }}>{cat.label}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{cat.description}</p>
              </div>
              <label
                style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
              >
                <span className="sr-only">{cat.locked ? `${cat.label} (always on)` : `Toggle ${cat.label}`}</span>
                <input
                  type="checkbox"
                  checked={cat.locked ? true : prefs[cat.key]}
                  disabled={cat.locked}
                  onChange={(e) => setPrefs((p) => ({ ...p, [cat.key]: e.target.checked }))}
                  style={{ width: 18, height: 18, accentColor: 'var(--color-primary)' }}
                />
              </label>
            </div>
          ))}
        </fieldset>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
          <button
            onClick={save}
            style={{
              flex: 1, padding: 'var(--space-3)',
              background: 'var(--color-primary)', color: '#fff',
              borderRadius: 'var(--radius-md)', fontWeight: 600,
              fontSize: 'var(--text-sm)', border: 'none', cursor: 'pointer',
            }}
          >
            Save preferences
          </button>
          <button
            onClick={onClose}
            style={{
              padding: 'var(--space-3) var(--space-4)',
              background: 'transparent',
              border: '1px solid oklch(from var(--color-text) l c h / 0.15)',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)', cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
