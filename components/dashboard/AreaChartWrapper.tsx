'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/shared/SkeletonCard'

const DashboardAreaChart = dynamic(
  () => import('@/components/dashboard/AreaChart'),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  }
)

export function AreaChartWrapper() {
  return <DashboardAreaChart />
}
