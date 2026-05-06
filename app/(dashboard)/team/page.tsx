import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Manage your team members and roles.',
};

const members = [
  { id: '1', name: 'Ayaan Khan', email: 'ayaan@example.com', role: 'OWNER', joinedAt: '2026-01-15' },
  { id: '2', name: 'Priya Mehra', email: 'priya@example.com', role: 'ADMIN', joinedAt: '2026-02-01' },
  { id: '3', name: 'Jordan Lee', email: 'jordan@example.com', role: 'MEMBER', joinedAt: '2026-03-10' },
];

export default function TeamPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--color-text)',
          }}
        >
          Team
        </h1>
        <button
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-4)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          Invite member
        </button>
      </div>
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              {['Member', 'Role', 'Joined'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: 'var(--space-3) var(--space-6)',
                    textAlign: 'left',
                    color: 'var(--color-text-muted)',
                    fontWeight: 500,
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--space-4) var(--space-6)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {m.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p style={{ fontWeight: 500, color: 'var(--color-text)' }}>{m.name}</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{m.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: 'var(--space-4) var(--space-6)' }}>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 500,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'oklch(from var(--color-primary) l c h / 0.12)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {m.role}
                  </span>
                </td>
                <td style={{ padding: 'var(--space-4) var(--space-6)', color: 'var(--color-text-muted)' }}>
                  {new Date(m.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
