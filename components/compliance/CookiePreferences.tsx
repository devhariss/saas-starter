'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { setConsent, getConsent } from './ConsentManager'

interface Props { onClose: () => void }

export function CookiePreferences({ onClose }: Props) {
  const existing = getConsent()
  const [analytics, setAnalytics] = useState(existing?.analytics ?? false)
  const [marketing, setMarketing] = useState(existing?.marketing ?? false)
  const [functional, setFunctional] = useState(existing?.functional ?? false)

  const save = () => {
    setConsent({ essential: true, analytics, marketing, functional, timestamp: new Date().toISOString() })
    onClose()
  }

  const categories = [
    { key: 'essential', label: 'Essential', description: 'Required for the site to function (auth session, CSRF, consent record). Cannot be disabled.', locked: true, value: true, onChange: () => {} },
    { key: 'analytics', label: 'Analytics', description: 'Help us understand how you use the product. No personal data sold.', locked: false, value: analytics, onChange: setAnalytics },
    { key: 'marketing', label: 'Marketing', description: 'Used to show relevant content and measure campaign effectiveness.', locked: false, value: marketing, onChange: setMarketing },
    { key: 'functional', label: 'Functional', description: 'Enable enhanced functionality like live chat and preferences memory.', locked: false, value: functional, onChange: setFunctional },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'oklch(0 0 0 / 0.5)', padding: 'var(--space-4)',
      }}
    >
      <div
        style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)', width: 'min(540px, 100%)', maxHeight: '90vh', overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)', position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)' }}>Cookie Preferences</h2>
          <button onClick={onClose} aria-label="Close cookie preferences" style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {categories.map((cat) => (
            <div key={cat.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 4 }}>{cat.label}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{cat.description}</p>
              </div>
              <button
                role="switch"
                aria-checked={cat.value}
                aria-label={`Toggle ${cat.label} cookies`}
                disabled={cat.locked}
                onClick={() => !cat.locked && cat.onChange(!cat.value)}
                style={{
                  flexShrink: 0, width: 44, height: 24, borderRadius: 'var(--radius-full)',
                  background: cat.value ? 'var(--color-primary)' : 'var(--color-surface-offset)',
                  border: 'none', cursor: cat.locked ? 'not-allowed' : 'pointer',
                  opacity: cat.locked ? 0.6 : 1, position: 'relative', transition: 'background 0.2s',
                }}
              >
                <span style={{
                  position: 'absolute', top: 3, left: cat.value ? 22 : 3,
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s', display: 'block',
                }} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={save}
          style={{
            marginTop: 'var(--space-6)', width: '100%', padding: 'var(--space-3)',
            background: 'var(--color-primary)', color: '#fff', border: 'none',
            borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
}
