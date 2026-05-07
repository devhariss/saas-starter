import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Security settings' }

export default function SecurityPage() {
  return (
    <main id="main-content" style={{ padding: 'var(--space-8)', maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-8)' }}>Security</h1>
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>Change password</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>Applies to email/password accounts only.</p>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {[{ id: 'current', label: 'Current password' }, { id: 'new', label: 'New password' }, { id: 'confirm', label: 'Confirm new password' }].map(f => (
            <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <label htmlFor={f.id} style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{f.label}</label>
              <input id={f.id} name={f.id} type="password" autoComplete={f.id === 'current' ? 'current-password' : 'new-password'} style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid oklch(from var(--color-text) l c h / 0.15)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: 'var(--text-sm)' }} />
            </div>
          ))}
          <button type="submit" style={{ alignSelf: 'flex-start', padding: 'var(--space-2) var(--space-6)', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>Update password</button>
        </form>
      </section>
      <section>
        <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>Two-factor authentication</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>Add an extra layer of security to your account. Coming soon.</p>
        <button disabled style={{ padding: 'var(--space-2) var(--space-4)', border: '1px solid oklch(from var(--color-text) l c h / 0.15)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 500, cursor: 'not-allowed' }}>Enable 2FA</button>
      </section>
    </main>
  )
}
