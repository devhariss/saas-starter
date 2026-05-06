'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { getConsent, setConsent, type ConsentState } from './ConsentManager'

interface CookiePreferencesProps {
  onClose: () => void
  onSave: () => void
}

const CATEGORIES: { key: keyof ConsentState; label: string; description: string; locked?: boolean }[] = [
  {
    key: 'essential',
    label: 'Essential',
    description: 'Required for the website to function. Cannot be disabled. Includes session tokens, CSRF protection, and consent records.',
    locked: true,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    description: 'Helps us understand how you use the product so we can improve it. Data is anonymized and never sold.',
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Allows us to show relevant content and measure campaign performance. Disabled by default.',
  },
  {
    key: 'functional',
    label: 'Functional',
    description: 'Enables enhanced features like remembering your preferences and in-app notifications.',
  },
]

export default function CookiePreferences({ onClose, onSave }: CookiePreferencesProps) {
  const [prefs, setPrefs] = useState<ConsentState>(getConsent)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const toggle = (key: keyof ConsentState) => {
    if (key === 'essential') return
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
  }

  const handleSave = () => {
    setConsent(prefs)
    onSave()
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prefs-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'oklch(0 0 0 / 0.5)',
        padding: 'var(--space-4)',
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: 'min(520px, 100%)',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2
            id="prefs-title"
            style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)' }}
          >
            Cookie Preferences
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close preferences"
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend className="sr-only">Cookie category preferences</legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {CATEGORIES.map((cat) => (
              <label
                key={cat.key}
                htmlFor={`cookie-${cat.key}`}
                style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid oklch(from var(--color-text) l c h / 0.08)',
                  background: 'var(--color-surface-2)',
                  cursor: cat.locked ? 'default' : 'pointer',
                }}
              >
                <input
                  id={`cookie-${cat.key}`}
                  type="checkbox"
                  checked={prefs[cat.key]}
                  disabled={cat.locked}
                  onChange={() => toggle(cat.key)}
                  style={{ marginTop: '3px', flexShrink: 0, width: '18px', height: '18px' }}
                />
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
                    {cat.label}
                    {cat.locked && (
                      <span
                        style={{
                          marginLeft: 'var(--space-2)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-faint)',
                          fontWeight: 400,
                        }}
                      >
                        (always on)
                      </span>
                    )}
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)', maxWidth: 'none' }}>
                    {cat.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: 'var(--space-2) var(--space-5)',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              border: '1px solid oklch(from var(--color-text) l c h / 0.12)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: 'var(--space-2) var(--space-6)',
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
            Save preferences
          </button>
        </div>
      </div>
    </div>
  )
}
