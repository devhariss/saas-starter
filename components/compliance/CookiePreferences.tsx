'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { getConsent, type ConsentState } from './ConsentManager'

interface Props {
  onSave: (state: ConsentState) => void
  onClose: () => void
}

const CATEGORIES = [
  {
    id: 'essential' as const,
    label: 'Essential',
    description:
      'Required for the website to function. Cannot be disabled. Includes authentication sessions, CSRF protection, and consent storage.',
    locked: true,
  },
  {
    id: 'analytics' as const,
    label: 'Analytics',
    description:
      'Help us understand how visitors interact with our website. Data is aggregated and anonymised. We use PostHog for analytics.',
    locked: false,
  },
  {
    id: 'marketing' as const,
    label: 'Marketing',
    description:
      'Used to deliver personalised advertisements and track campaign effectiveness. Currently no marketing cookies are active.',
    locked: false,
  },
  {
    id: 'functional' as const,
    label: 'Functional',
    description:
      'Enable enhanced functionality such as remembering preferences, live chat support, and embedded media.',
    locked: false,
  },
]

export default function CookiePreferences({ onSave, onClose }: Props) {
  const initialState = getConsent()
  const [state, setState] = useState<ConsentState>(initialState)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const toggle = (cat: keyof Omit<ConsentState, 'essential'>) => {
    setState((s) => ({ ...s, [cat]: !s[cat] }))
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
        padding: 'var(--space-4)',
        background: 'oklch(0 0 0 / 0.5)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={dialogRef}
        style={{
          width: 'min(100%, 36rem)',
          background: 'var(--color-bg)',
          border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-6)',
            borderBottom: '1px solid oklch(from var(--color-text) l c h / 0.08)',
          }}
        >
          <h2 id="prefs-title" style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>
            Cookie Preferences
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close preferences"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-md)',
              border: 'none', background: 'transparent', color: 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid oklch(from var(--color-text) l c h / 0.08)',
                background: 'var(--color-surface)',
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                  {cat.label}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {cat.description}
                </p>
              </div>
              <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                {cat.locked ? (
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-faint)',
                      fontStyle: 'italic',
                    }}
                  >
                    Always on
                  </span>
                ) : (
                  <button
                    role="switch"
                    aria-checked={state[cat.id]}
                    aria-label={`Toggle ${cat.label} cookies`}
                    onClick={() => toggle(cat.id as keyof Omit<ConsentState, 'essential'>)}
                    style={{
                      width: '2.75rem',
                      height: '1.5rem',
                      borderRadius: 'var(--radius-full)',
                      border: 'none',
                      background: state[cat.id] ? 'var(--color-primary)' : 'var(--color-surface-offset)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 180ms ease',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 var(--space-1)',
                    }}
                  >
                    <span
                      style={{
                        width: '1.125rem',
                        height: '1.125rem',
                        borderRadius: 'var(--radius-full)',
                        background: '#fff',
                        boxShadow: 'var(--shadow-sm)',
                        transform: state[cat.id] ? 'translateX(1.25rem)' : 'translateX(0)',
                        transition: 'transform 180ms ease',
                        display: 'block',
                      }}
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            padding: 'var(--space-6)',
            borderTop: '1px solid oklch(from var(--color-text) l c h / 0.08)',
          }}
        >
          <button
            onClick={() => onSave(state)}
            style={{
              flex: 1,
              padding: 'var(--space-3) var(--space-4)',
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
            Save preferences
          </button>
          <button
            onClick={onClose}
            style={{
              padding: 'var(--space-3) var(--space-4)',
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
        </div>
      </div>
    </div>
  )
}
