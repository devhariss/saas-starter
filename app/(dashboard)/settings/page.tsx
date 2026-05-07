import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Profile settings' }

export default function SettingsPage() {
  return (
    <main id="main-content" style={{ padding: 'var(--space-8)', maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>Profile</h1>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>Update your name and email address.</p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <label htmlFor="name" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}>Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid oklch(from var(--color-text) l c h / 0.15)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: 'var(--text-sm)' }} defaultValue="Mohammed Hariss" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <label htmlFor="email" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}>Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid oklch(from var(--color-text) l c h / 0.15)', background: 'var(--color-surface)', color: 'var(--color-text)', fontSize: 'var(--text-sm)' }} />
        </div>
        <button type="submit" style={{ alignSelf: 'flex-start', padding: 'var(--space-2) var(--space-6)', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>Save changes</button>
      </form>
    </main>
  )
}
