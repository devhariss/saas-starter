'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string
  change: number
  changeLabel?: string
  sparklineData?: { v: number }[]
  trend?: 'up' | 'down' | 'neutral'
}

export default function KPICard({
  title,
  value,
  change,
  changeLabel,
  sparklineData = [],
  trend = 'neutral',
}: KPICardProps) {
  const isPositive = trend === 'up'
  const isNegative = trend === 'down'

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus
  const trendColor = isPositive
    ? 'text-[var(--color-success)]'
    : isNegative
    ? 'text-[var(--color-error)]'
    : 'text-[var(--color-text-muted)]'
  const sparkColor = isPositive
    ? 'var(--color-success)'
    : isNegative
    ? 'var(--color-error)'
    : 'var(--color-text-faint)'

  return (
    <article className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.08)] p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-text)] tabular-nums">{value}</p>
        </div>
        {sparklineData.length > 0 && (
          <div className="w-20 h-10 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={sparkColor}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
        <TrendIcon size={13} aria-hidden="true" />
        <span aria-label={`${change > 0 ? '+' : ''}${change}% ${changeLabel ?? ''}`}>
          {change > 0 ? '+' : ''}{change}%
          {changeLabel && <span className="ml-1 font-normal text-[var(--color-text-faint)]">{changeLabel}</span>}
        </span>
      </div>
    </article>
  )
}
