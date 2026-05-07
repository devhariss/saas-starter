'use client'

import dynamic from 'next/dynamic'
import { SkeletonCard } from '@/components/shared/SkeletonCard'

export function AreaChartWrapper() {
  // dynamic() must be called inside a 'use client' component function,
  // not at module scope, to satisfy the Next.js no-restricted-syntax ESLint rule.
  const AreaChart = dynamic(
    () => import('@/components/dashboard/AreaChart'),
    {
      loading: () => <SkeletonCard className="h-64 w-full" />,
      ssr: false,
    }
  )
  return <AreaChart />
}
