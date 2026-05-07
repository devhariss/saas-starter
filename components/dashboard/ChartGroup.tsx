'use client'

import dynamic from 'next/dynamic'

// ssr:false is only allowed in Client Components
const MRRAreaChart = dynamic(() => import('@/components/dashboard/AreaChart'), {
  loading: () => (
    <div
      className="h-56 rounded-[var(--radius-lg)] bg-[var(--color-surface-2)] animate-pulse"
      aria-hidden="true"
    />
  ),
  ssr: false,
})

const SignupsBarChart = dynamic(() => import('@/components/dashboard/BarChart'), {
  loading: () => (
    <div
      className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-surface-2)] animate-pulse"
      aria-hidden="true"
    />
  ),
  ssr: false,
})

export function ChartGroup() {
  return (
    <div className="space-y-4">
      <MRRAreaChart />
      <SignupsBarChart />
    </div>
  )
}
