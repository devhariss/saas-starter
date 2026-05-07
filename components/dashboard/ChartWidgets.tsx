'use client'

/**
 * ChartWidgets.tsx — client boundary for all chart dynamic imports.
 *
 * Rule: ANY component that uses `next/dynamic` with `ssr: false` MUST live
 * in a 'use client' file. Server Components cannot use `ssr: false`.
 * Add new chart wrappers here — never inline dynamic() with ssr:false in a page.
 */

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/shared/SkeletonCard'

const chartSkeleton = <Skeleton className="h-72 w-full rounded-lg" />
const smallChartSkeleton = <Skeleton className="h-64 w-full rounded-lg" />

export const BarChartWidget = dynamic(
  () => import('@/components/dashboard/BarChart').then((m) => m.BarChartWidget),
  { loading: () => chartSkeleton, ssr: false }
)

export const AreaChartWidget = dynamic(
  () => import('@/components/dashboard/AreaChart').then((m) => m.AreaChartWidget),
  { loading: () => chartSkeleton, ssr: false }
)

// Re-export the MRR area chart used on the main dashboard page
export { AreaChartWrapper } from '@/components/dashboard/AreaChartWrapper'

// Add future chart wrappers below this line — never in page.tsx files
// export const LineChartWidget = dynamic(..., { ssr: false })
// export const PieChartWidget = dynamic(..., { ssr: false })
