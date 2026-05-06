'use client'

import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockData = [
  { day: 'Mon', signups: 24 }, { day: 'Tue', signups: 38 }, { day: 'Wed', signups: 31 },
  { day: 'Thu', signups: 45 }, { day: 'Fri', signups: 52 }, { day: 'Sat', signups: 19 }, { day: 'Sun', signups: 14 },
]

export function DashboardBarChart() {
  return (
    <section
      style={{
        background: 'var(--color-surface)',
        border: '1px solid oklch(from var(--color-text) l c h / 0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
      }}
      aria-label="Signups per day chart"
    >
      <h2 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-6)' }}>Signups this week</h2>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={mockData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(from var(--color-text) l c h / 0.06)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--color-text-faint)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-faint)' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--color-surface-2)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [v, 'Signups']}
            />
            <Bar dataKey="signups" fill="var(--color-primary)" radius={[4, 4, 0, 0]} opacity={0.85} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
