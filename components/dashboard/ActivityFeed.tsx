import { formatRelativeTime, getInitials } from '@/lib/utils'

const activities = [
  { id: '1', user: 'Alex Johnson', action: 'signed up', time: new Date(Date.now() - 900000).toISOString() },
  { id: '2', user: 'Maria Garcia', action: 'upgraded to Pro', time: new Date(Date.now() - 1800000).toISOString() },
  { id: '3', user: 'Sam Lee', action: 'created a new project', time: new Date(Date.now() - 3600000).toISOString() },
  { id: '4', user: 'Jordan Smith', action: 'paid invoice #1042', time: new Date(Date.now() - 7200000).toISOString() },
  { id: '5', user: 'Casey Williams', action: 'invited 2 team members', time: new Date(Date.now() - 10800000).toISOString() },
  { id: '6', user: 'Taylor Brown', action: 'updated billing settings', time: new Date(Date.now() - 14400000).toISOString() },
  { id: '7', user: 'Morgan Davis', action: 'signed up', time: new Date(Date.now() - 18000000).toISOString() },
  { id: '8', user: 'Riley Wilson', action: 'archived a project', time: new Date(Date.now() - 21600000).toISOString() },
  { id: '9', user: 'Drew Martinez', action: 'upgraded to Team', time: new Date(Date.now() - 25200000).toISOString() },
  { id: '10', user: 'Jamie Anderson', action: 'requested data export', time: new Date(Date.now() - 28800000).toISOString() },
  { id: '11', user: 'Avery Thomas', action: 'signed up', time: new Date(Date.now() - 32400000).toISOString() },
  { id: '12', user: 'Chris Jackson', action: 'paid invoice #1041', time: new Date(Date.now() - 36000000).toISOString() },
]

export function ActivityFeed() {
  return (
    <section
      style={{
        background: 'var(--color-surface)',
        border: '1px solid oklch(from var(--color-text) l c h / 0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        height: '100%',
      }}
      aria-label="Recent activity"
      aria-live="polite"
    >
      <h2 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>Recent Activity</h2>
      <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {activities.map((a) => (
          <li key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-surface-offset)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', flexShrink: 0 }}>
              {getInitials(a.user)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text)', lineHeight: 1.4 }}>
                <strong>{a.user}</strong> {a.action}
              </p>
              <time dateTime={a.time} style={{ fontSize: 11, color: 'var(--color-text-faint)' }}>
                {formatRelativeTime(a.time)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
