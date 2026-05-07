'use client'

/**
 * ChartWidgets.tsx — client boundary for all chart dynamic imports.
 * All dynamic() calls with ssr:false must live in 'use client' files.
 */

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/shared/SkeletonCard'

// Both BarChart and AreaChart use `export default` — no .then() resolver needed
export const BarChartWidget = dynamic(
  () => import('@/components/dashboard/BarChart'),
  { loading: () => <Skeleton className="h-72 w-full" />, ssr: false }
)

export const AreaChartWidget = dynamic(
  () => import('@/components/dashboard/AreaChart'),
  { loading: () => <Skeleton className="h-64 w-full" />, ssr: false }
)

export { AreaChartWrapper } from '@/components/dashboard/AreaChartWrapper'
