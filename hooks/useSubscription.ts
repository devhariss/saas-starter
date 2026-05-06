'use client'

import { useQuery } from '@tanstack/react-query'

interface SubscriptionData {
  status: string | null
  stripePriceId: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

async function fetchSubscription(): Promise<SubscriptionData> {
  const res = await fetch('/api/user/subscription')
  if (!res.ok) throw new Error('Failed to fetch subscription')
  return res.json()
}

export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: fetchSubscription,
    staleTime: 60 * 1000,
  })
}
