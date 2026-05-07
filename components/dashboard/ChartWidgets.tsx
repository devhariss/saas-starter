'use client'

/**
 * ChartWidgets.tsx — client boundary for all chart dynamic imports.
 * All dynamic() calls with ssr:false must live in 'use client' files.
 */

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/shared/SkeletonCard'

// BarChart — actual export from BarChart.tsx is DashboardBarChart
export const BarChartWidget = dynamic(
  () => import('@/components/dashboard/BarChart').then((m) => m.DashboardBarChart),
  { loading: () => <Skeleton className="h-72 w-full" />, ssr: false }
)

// AreaChart — actual export from AreaChart.tsx is DashboardAreaChart
export const AreaChartWidget = dynamic(
  () => import('@/components/dashboard/AreaChart').then((m) => m.DashboardAreaChart),
  { loading: () => <Skeleton className="h-64 w-full" />, ssr: false }
)

export { AreaChartWrapper } from '@/components/dashboard/AreaChartWrapper'
