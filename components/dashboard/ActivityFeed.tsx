import { formatDistanceToNow } from 'date-fns'

const activities = [
  { id: 1, type: 'signup', text: 'Sarah Kim signed up', time: new Date(Date.now() - 5 * 60000) },
  { id: 2, type: 'upgrade', text: 'Alex Rivera upgraded to Pro', time: new Date(Date.now() - 22 * 60000) },
  { id: 3, type: 'project', text: 'New project "Apollo" created', time: new Date(Date.now() - 44 * 60000) },
  { id: 4, type: 'payment', text: 'Invoice #1084 paid — $29', time: new Date(Date.now() - 1.2 * 3600000) },
  { id: 5, type: 'signup', text: 'James Park signed up', time: new Date(Date.now() - 2 * 3600000) },
  { id: 6, type: 'upgrade', text: 'Priya Nair upgraded to Team', time: new Date(Date.now() - 3.5 * 3600000) },
  { id: 7, type: 'project', text: 'Project "Helios" archived', time: new Date(Date.now() - 5 * 3600000) },
  { id: 8, type: 'payment', text: 'Invoice #1083 paid — $79', time: new Date(Date.now() - 7 * 3600000) },
  { id: 9, type: 'signup', text: 'Dana Osei signed up', time: new Date(Date.now() - 9 * 3600000) },
  { id: 10, type: 'upgrade', text: 'Liam Chen upgraded to Pro', time: new Date(Date.now() - 14 * 3600000) },
  { id: 11, type: 'payment', text: 'Invoice #1082 paid — $29', time: new Date(Date.now() - 20 * 3600000) },
  { id: 12, type: 'signup', text: 'Mia Torres signed up', time: new Date(Date.now() - 23 * 3600000) },
]

const colorMap: Record<string, string> = {
  signup: 'bg-[oklch(from_var(--color-success)_l_c_h_/_0.15)] text-[var(--color-success)]',
  upgrade: 'bg-[oklch(from_var(--color-primary)_l_c_h_/_0.12)] text-[var(--color-primary)]',
  project: 'bg-[oklch(from_var(--color-secondary)_l_c_h_/_0.12)] text-[var(--color-secondary)]',
  payment: 'bg-[oklch(from_var(--color-warning)_l_c_h_/_0.12)] text-[var(--color-warning)]',
}

const dotMap: Record<string, string> = {
  signup: 'bg-[var(--color-success)]',
  upgrade: 'bg-[var(--color-primary)]',
  project: 'bg-[var(--color-secondary)]',
  payment: 'bg-[var(--color-warning)]',
}

export default function ActivityFeed() {
  return (
    <section
      aria-label="Activity feed"
      aria-live="polite"
      className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.08)] p-5"
    >
      <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">Recent activity</h2>
      <ol className="space-y-3">
        {activities.map(item => (
          <li key={item.id} className="flex items-start gap-3">
            <span className={`mt-1 size-2 rounded-full shrink-0 ${dotMap[item.type]}`} aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm text-[var(--color-text)] leading-snug">{item.text}</p>
              <time
                dateTime={item.time.toISOString()}
                className="text-xs text-[var(--color-text-faint)]"
              >
                {formatDistanceToNow(item.time, { addSuffix: true })}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
