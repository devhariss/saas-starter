'use client'

/**
 * ChartWidgets.tsx — client boundary for all chart dynamic imports.
 * All dynamic() calls with ssr:false must live in 'use client' files.
 */

import dynamic from 'next/dynamic'
import { SkeletonCard } from '@/components/shared/SkeletonCard'

export const BarChartWidget = dynamic(
  () => import('@/components/dashboard/BarChart').then((m) => m.BarChartWidget),
  { loading: () => <SkeletonCard className="h-72 w-full" />, ssr: false }
)

export const AreaChartWidget = dynamic(
  () => import('@/components/dashboard/AreaChart').then((m) => m.AreaChartWidget),
  { loading: () => <SkeletonCard className="h-64 w-full" />, ssr: false }
)

export { AreaChartWrapper } from '@/components/dashboard/AreaChartWrapper'
