'use client'

/**
 * ChartWidgets.tsx — client boundary for all chart dynamic imports.
 *
 * dynamic() with ssr:false must be called inside a 'use client' component
 * function body, not at module scope, to satisfy Next.js ESLint rules.
 */

import dynamic from 'next/dynamic'
import { SkeletonCard } from '@/components/shared/SkeletonCard'

export function BarChartWidget() {
  const Chart = dynamic(
    () => import('@/components/dashboard/BarChart').then((m) => m.BarChartWidget),
    { loading: () => <SkeletonCard className="h-72 w-full" />, ssr: false }
  )
  return <Chart />
}

export function AreaChartWidget() {
  const Chart = dynamic(
    () => import('@/components/dashboard/AreaChart').then((m) => m.AreaChartWidget),
    { loading: () => <SkeletonCard className="h-64 w-full" />, ssr: false }
  )
  return <Chart />
}

// Re-export the MRR area chart used on the main dashboard page
export { AreaChartWrapper } from '@/components/dashboard/AreaChartWrapper'
