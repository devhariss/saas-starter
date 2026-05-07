'use client'

import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jun', mrr: 7200 },
  { month: 'Jul', mrr: 8100 },
  { month: 'Aug', mrr: 7900 },
  { month: 'Sep', mrr: 8800 },
  { month: 'Oct', mrr: 9400 },
  { month: 'Nov', mrr: 9100 },
  { month: 'Dec', mrr: 9900 },
  { month: 'Jan', mrr: 10600 },
  { month: 'Feb', mrr: 10200 },
  { month: 'Mar', mrr: 11300 },
  { month: 'Apr', mrr: 11800 },
  { month: 'May', mrr: 12480 },
]

export default function MRRAreaChart() {
  return (
    <section
      aria-label="Revenue over time chart"
      className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.08)] p-5"
    >
      <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">Revenue over time</h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ReAreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.20} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(from var(--color-text) l c h / 0.06)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip
              formatter={(v: number) => [`$${v.toLocaleString()}`, 'MRR']}
              contentStyle={{
                background: 'var(--color-surface-2)',
                border: '1px solid oklch(from var(--color-text) l c h / 0.10)',
                borderRadius: 'var(--radius-md)',
                fontSize: 12,
              }}
              itemStyle={{ color: 'var(--color-text)' }}
              labelStyle={{ color: 'var(--color-text-muted)', fontWeight: 500 }}
            />
            <Area
              type="monotone"
              dataKey="mrr"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#mrrGrad)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </ReAreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
