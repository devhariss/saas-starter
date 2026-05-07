'use client'

import { useState, useEffect, useRef } from 'react'
import { getConsent, setConsent, type ConsentState } from './ConsentManager'
import { Lock, X } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'essential' as const,
    label: 'Essential',
    description: 'Required for the site to function. Cannot be disabled. Includes session cookies and CSRF tokens.',
    locked: true,
  },
  {
    id: 'analytics' as const,
    label: 'Analytics',
    description: 'Help us understand how visitors use the site so we can improve it. No personal data is sold.',
    locked: false,
  },
  {
    id: 'marketing' as const,
    label: 'Marketing',
    description: 'Used to show relevant ads and measure campaign performance across external platforms.',
    locked: false,
  },
  {
    id: 'functional' as const,
    label: 'Functional',
    description: 'Enable enhanced functionality like remembering your preferences and settings.',
    locked: false,
  },
]

interface CookiePreferencesProps {
  onClose: () => void
}

export function CookiePreferences({ onClose }: CookiePreferencesProps) {
  const existing = getConsent()
  const [state, setState] = useState<ConsentState>({
    essential: true,
    analytics: existing?.analytics ?? false,
    marketing: existing?.marketing ?? false,
    functional: existing?.functional ?? false,
  })
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const save = () => { setConsent(state); onClose() }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      ref={dialogRef}
      style={{
        position: 'fixed', inset: 0, background: 'oklch(0 0 0 / 0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, padding: 'var(--space-4)',
      }}
    >
      <div
        style={{
          width: 'min(520px, 100%)',
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid oklch(from var(--color-text) l c h / 0.08)' }}>
          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
            Cookie preferences
          </h2>
          <button ref={closeRef} onClick={onClose} aria-label="Close preferences" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.75rem', height: '2.75rem' }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: 'var(--space-4) var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 var(--space-1)' }}>
                  {cat.label}{cat.locked && <Lock size={12} style={{ display: 'inline', marginLeft: 4, verticalAlign: 'middle', color: 'var(--color-text-faint)' }} />}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {cat.description}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={state[cat.id]}
                aria-label={`Toggle ${cat.label} cookies`}
                disabled={cat.locked}
                onClick={() => !cat.locked && setState((s) => ({ ...s, [cat.id]: !s[cat.id] }))}
                style={{
                  width: '2.5rem', height: '1.5rem', borderRadius: 'var(--radius-full)',
                  background: state[cat.id] ? 'var(--color-primary)' : 'var(--color-surface-offset)',
                  border: 'none', cursor: cat.locked ? 'not-allowed' : 'pointer',
                  position: 'relative', flexShrink: 0, transition: 'background 0.2s',
                  opacity: cat.locked ? 0.5 : 1,
                }}
              >
                <span style={{
                  position: 'absolute', top: '2px',
                  left: state[cat.id] ? 'calc(100% - 1.25rem - 2px)' : '2px',
                  width: '1.25rem', height: '1.25rem', borderRadius: '50%',
                  background: '#fff', transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}
        </div>
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid oklch(from var(--color-text) l c h / 0.08)', display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: 'var(--space-2) var(--space-4)', background: 'transparent', border: '1px solid oklch(from var(--color-text) l c h / 0.12)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={save} style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-primary)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
            Save preferences
          </button>
        </div>
      </div>
    </div>
  )
}
