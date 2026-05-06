'use client'

import {
  AreaChart as ReAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const mockData = [
  { month: 'Jun', mrr: 4800 }, { month: 'Jul', mrr: 5900 }, { month: 'Aug', mrr: 6200 },
  { month: 'Sep', mrr: 7100 }, { month: 'Oct', mrr: 7800 }, { month: 'Nov', mrr: 8400 },
  { month: 'Dec', mrr: 9200 }, { month: 'Jan', mrr: 9800 }, { month: 'Feb', mrr: 10400 },
  { month: 'Mar', mrr: 11100 }, { month: 'Apr', mrr: 11800 }, { month: 'May', mrr: 12480 },
]

export function DashboardAreaChart() {
  return (
    <section
      style={{
        background: 'var(--color-surface)',
        border: '1px solid oklch(from var(--color-text) l c h / 0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
      }}
      aria-label="Revenue over time chart"
    >
      <h2 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-6)' }}>Revenue over time</h2>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReAreaChart data={mockData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(from var(--color-text) l c h / 0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-faint)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'var(--color-text-faint)' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip
              contentStyle={{ background: 'var(--color-surface-2)', border: '1px solid oklch(from var(--color-text) l c h / 0.10)', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, 'MRR']}
            />
            <Area type="monotone" dataKey="mrr" stroke="var(--color-primary)" strokeWidth={2} fill="url(#mrrGradient)" />
          </ReAreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
