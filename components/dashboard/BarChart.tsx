'use client'

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Mon', signups: 12 },
  { day: 'Tue', signups: 19 },
  { day: 'Wed', signups: 15 },
  { day: 'Thu', signups: 27 },
  { day: 'Fri', signups: 24 },
  { day: 'Sat', signups: 8 },
  { day: 'Sun', signups: 6 },
]

export default function SignupsBarChart() {
  return (
    <section
      aria-label="Signups per day chart"
      className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.08)] p-5"
    >
      <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">Signups this week</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(from var(--color-text) l c h / 0.06)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              tickLine={false}
              axisLine={false}
              width={24}
            />
            <Tooltip
              formatter={(v: number) => [v, 'Signups']}
              contentStyle={{
                background: 'var(--color-surface-2)',
                border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
                borderRadius: 'var(--radius-md)',
                fontSize: 12,
              }}
              itemStyle={{ color: 'var(--color-text)' }}
              labelStyle={{ color: 'var(--color-text-muted)', fontWeight: 500 }}
            />
            <Bar
              dataKey="signups"
              fill="var(--color-primary)"
              radius={[3, 3, 0, 0]}
              maxBarSize={32}
            />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
