'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { getConsent, setConsent, type ConsentState } from './ConsentManager'

interface Props {
  onClose: () => void
}

const categories = [
  {
    key: 'essential' as const,
    label: 'Essential',
    description: 'Required for the site to function. Auth sessions, CSRF tokens, and consent state. Cannot be disabled.',
    locked: true,
  },
  {
    key: 'analytics' as const,
    label: 'Analytics',
    description: 'Helps us understand how visitors use the site. No personal data is shared with third parties without consent.',
    locked: false,
  },
  {
    key: 'marketing' as const,
    label: 'Marketing',
    description: 'Used to deliver relevant advertisements and track campaign effectiveness.',
    locked: false,
  },
  {
    key: 'functional' as const,
    label: 'Functional',
    description: 'Enables enhanced functionality like saved preferences and in-app chat.',
    locked: false,
  },
]

export function CookiePreferences({ onClose }: Props) {
  const existing = getConsent()
  const [prefs, setPrefs] = useState({
    analytics: existing?.analytics ?? false,
    marketing: existing?.marketing ?? false,
    functional: existing?.functional ?? false,
  })
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()
    return () => prev?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
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
      aria-labelledby="cookie-prefs-title"
      ref={dialogRef}
      tabIndex={-1}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'oklch(0 0 0 / 0.5)',
        padding: 'var(--space-4)',
      }}
    >
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        width: '100%', maxWidth: '540px',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h2 id="cookie-prefs-title" style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>Cookie Preferences</h2>
          <button onClick={onClose} aria-label="Close cookie preferences" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 'var(--space-1)', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {categories.map((cat) => (
            <div key={cat.key} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-2)', border: '1px solid oklch(from var(--color-text) l c h / 0.06)' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 var(--space-1)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{cat.label}</p>
                <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{cat.description}</p>
              </div>
              <button
                role="switch"
                aria-checked={cat.locked ? true : prefs[cat.key as keyof typeof prefs]}
                aria-label={`Toggle ${cat.label} cookies`}
                disabled={cat.locked}
                onClick={() => {
                  if (!cat.locked) {
                    setPrefs((p) => ({ ...p, [cat.key]: !p[cat.key as keyof typeof prefs] }))
                  }
                }}
                style={{
                  width: '44px', height: '26px', borderRadius: 'var(--radius-full)',
                  border: 'none', cursor: cat.locked ? 'default' : 'pointer',
                  background: (cat.locked || prefs[cat.key as keyof typeof prefs]) ? 'var(--color-primary)' : 'var(--color-surface-offset)',
                  position: 'relative', flexShrink: 0,
                  opacity: cat.locked ? 0.6 : 1,
                  transition: 'background 0.2s',
                }}
              >
                <span style={{
                  position: 'absolute', top: '3px',
                  left: (cat.locked || prefs[cat.key as keyof typeof prefs]) ? '21px' : '3px',
                  width: '20px', height: '20px',
                  borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-6)' }}>
          <button
            onClick={save}
            style={{ flex: 1, padding: 'var(--space-3)', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer', minHeight: '44px' }}
          >Save preferences</button>
          <button
            onClick={onClose}
            style={{ padding: 'var(--space-3) var(--space-4)', background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid oklch(from var(--color-text) l c h / 0.12)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', cursor: 'pointer', minHeight: '44px' }}
          >Cancel</button>
        </div>
      </div>
    </div>
  )
}
