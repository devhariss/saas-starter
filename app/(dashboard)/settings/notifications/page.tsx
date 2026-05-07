import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Notification settings' }

const prefs = [
  { id: 'email_product', label: 'Product updates', description: 'New features, improvements, and announcements.' },
  { id: 'email_billing', label: 'Billing alerts', description: 'Invoices, failed payments, and subscription changes.' },
  { id: 'email_security', label: 'Security alerts', description: 'New sign-ins and password changes.' },
  { id: 'email_team', label: 'Team activity', description: 'New members and role changes in your team.' },
]

export default function NotificationsPage() {
  return (
    <main id="main-content" style={{ padding: 'var(--space-8)', maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>Notifications</h1>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>Choose which emails you&apos;d like to receive.</p>
      <fieldset style={{ border: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <legend className="sr-only">Email notification preferences</legend>
        {prefs.map(p => (
          <label key={p.id} htmlFor={p.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid oklch(from var(--color-text) l c h / 0.08)', background: 'var(--color-surface)', cursor: 'pointer' }}>
            <input id={p.id} name={p.id} type="checkbox" defaultChecked style={{ marginTop: '2px', accentColor: 'var(--color-primary)', width: '16px', height: '16px', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{p.label}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>{p.description}</p>
            </div>
          </label>
        ))}
      </fieldset>
      <button type="button" style={{ marginTop: 'var(--space-6)', padding: 'var(--space-2) var(--space-6)', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>Save preferences</button>
    </main>
  )
}
