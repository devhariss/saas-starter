'use client'

import dynamic from 'next/dynamic'
import { SkeletonCard } from '@/components/shared/SkeletonCard'

const DashboardAreaChart = dynamic(
  () => import('@/components/dashboard/AreaChart').then((m) => m.DashboardAreaChart),
  {
    loading: () => <SkeletonCard className="h-64 w-full" />,
    ssr: false,
  }
)

export function AreaChartWrapper() {
  return <DashboardAreaChart />
}
