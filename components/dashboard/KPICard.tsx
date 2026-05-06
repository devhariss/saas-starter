'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface KPICardProps {
  title: string
  value: string
  change: number
  changeLabel?: string
  sparkline?: number[]
}

export function KPICard({ title, value, change, changeLabel, sparkline }: KPICardProps) {
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'var(--color-success)' : trend === 'down' ? 'var(--color-error)' : 'var(--color-text-muted)'

  const chartData = (sparkline ?? []).map((v, i) => ({ i, v }))

  return (
    <article
      style={{
        background: 'var(--color-surface)',
        border: '1px solid oklch(from var(--color-text) l c h / 0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</span>
        {sparkline && (
          <div style={{ width: 80, height: 36 }} aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
        <TrendIcon size={14} color={trendColor} aria-hidden="true" />
        <span style={{ fontSize: 'var(--text-xs)', color: trendColor, fontVariantNumeric: 'tabular-nums' }}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        {changeLabel && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)' }}> {changeLabel}</span>}
      </div>
    </article>
  )
}
