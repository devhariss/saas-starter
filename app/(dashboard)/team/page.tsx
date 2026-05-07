import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Team' }

export default function TeamPage() {
  const members = [
    { name: 'Aisha Karim', email: 'aisha@example.com', role: 'OWNER', joined: 'Jan 1, 2026' },
    { name: 'Marcus Chen', email: 'marcus@example.com', role: 'ADMIN', joined: 'Feb 5, 2026' },
    { name: 'Sofia Ramos', email: 'sofia@example.com', role: 'MEMBER', joined: 'Mar 12, 2026' },
  ]
  return (
    <main id="main-content" style={{ padding: 'var(--space-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)' }}>Team</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>Manage members and roles.</p>
        </div>
        <button
          style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500 }}
          aria-label="Invite a new team member"
        >
          Invite member
        </button>
      </div>
      <div style={{ border: '1px solid oklch(from var(--color-text) l c h / 0.08)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid oklch(from var(--color-text) l c h / 0.08)' }}>
              {['Name', 'Email', 'Role', 'Joined'].map(h => (
                <th key={h} scope="col" style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.email} style={{ background: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-surface)', borderBottom: '1px solid oklch(from var(--color-text) l c h / 0.06)' }}>
                <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{m.name}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{m.email}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'oklch(from var(--color-primary) l c h / 0.12)', color: 'var(--color-primary)' }}>{m.role}</span></td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{m.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
