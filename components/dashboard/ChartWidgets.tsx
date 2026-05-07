'use client'

/**
 * ChartWidgets.tsx — client boundary for all chart dynamic imports.
 *
 * Rule: ANY component that uses `next/dynamic` with `ssr: false` MUST live
 * in a 'use client' file. Server Components cannot use `ssr: false`.
 */

import dynamic from 'next/dynamic'
import { SkeletonCard } from '@/components/shared/SkeletonCard'

const chartSkeleton = <SkeletonCard className="h-72 w-full" />
const smallChartSkeleton = <SkeletonCard className="h-64 w-full" />

export const BarChartWidget = dynamic(
  () => import('@/components/dashboard/BarChart').then((m) => m.BarChartWidget),
  { loading: () => chartSkeleton, ssr: false }
)

export const AreaChartWidget = dynamic(
  () => import('@/components/dashboard/AreaChart').then((m) => m.AreaChartWidget),
  { loading: () => smallChartSkeleton, ssr: false }
)

// Re-export the MRR area chart used on the main dashboard page
export { AreaChartWrapper } from '@/components/dashboard/AreaChartWrapper'
