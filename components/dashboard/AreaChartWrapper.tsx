'use client'

import dynamic from 'next/dynamic'
import { SkeletonCard } from '@/components/shared/SkeletonCard'

const AreaChart = dynamic(
  () => import('@/components/dashboard/AreaChart'),
  {
    loading: () => <SkeletonCard className="h-64 w-full" />,
    ssr: false,
  }
)

export function AreaChartWrapper() {
  return <AreaChart />
}
