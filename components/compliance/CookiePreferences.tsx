'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { getConsent, setConsent } from './ConsentManager'

interface Props { onClose: () => void }

const categories = [
  {
    id: 'essential' as const,
    label: 'Essential',
    description: 'Required for the website to function. Cannot be disabled. Includes auth session, CSRF protection, and consent records.',
    locked: true,
  },
  {
    id: 'analytics' as const,
    label: 'Analytics',
    description: 'Helps us understand how visitors interact with the site so we can improve it. No data is sold to third parties.',
    locked: false,
  },
  {
    id: 'marketing' as const,
    label: 'Marketing',
    description: 'Used to deliver relevant ads and track campaign effectiveness. We currently use no marketing cookies.',
    locked: false,
  },
  {
    id: 'functional' as const,
    label: 'Functional',
    description: 'Enables enhanced features such as remembering your preferences and settings.',
    locked: false,
  },
]

export default function CookiePreferences({ onClose }: Props) {
  const existing = getConsent()
  const [prefs, setPrefs] = useState({
    analytics: existing?.analytics ?? false,
    marketing: existing?.marketing ?? false,
    functional: existing?.functional ?? false,
  })
  const dialogRef = useRef<HTMLDivElement>(null)

  // Focus trap
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const focusable = el.querySelectorAll<HTMLElement>('button, input, [tabindex]:not([tabindex="-1"])')
    focusable[0]?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSave = () => {
    setConsent(prefs)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Cookie preferences">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-lg mx-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.10)] shadow-xl p-6"
      >
        <div className="flex items-start justify-between mb-5">
          <h2 className="text-base font-semibold text-[var(--color-text)]">Cookie preferences</h2>
          <button
            onClick={onClose}
            aria-label="Close cookie preferences"
            className="size-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <fieldset className="space-y-4">
          <legend className="sr-only">Cookie categories</legend>
          {categories.map(cat => (
            <div key={cat.id} className="flex items-start gap-4 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-2)]">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text)]">{cat.label}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">{cat.description}</p>
              </div>
              <div className="shrink-0 mt-0.5">
                {cat.locked ? (
                  <span className="text-xs text-[var(--color-text-faint)] font-medium">Always on</span>
                ) : (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      role="switch"
                      aria-label={`${cat.label} cookies`}
                      checked={prefs[cat.id as keyof typeof prefs]}
                      onChange={e => setPrefs(p => ({ ...p, [cat.id]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[var(--color-surface-offset)] peer-checked:bg-[var(--color-primary)] rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:size-4 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                )}
              </div>
            </div>
          ))}
        </fieldset>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.15)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  )
}
