'use client'

import { useQuery } from '@tanstack/react-query'

interface SubscriptionData {
  status: string | null
  plan: 'free' | 'pro' | 'team'
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

async function fetchSubscription(): Promise<SubscriptionData> {
  const res = await fetch('/api/user/subscription')
  if (!res.ok) throw new Error('Failed to fetch subscription')
  return res.json() as Promise<SubscriptionData>
}

export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: fetchSubscription,
    staleTime: 1000 * 60 * 5,
  })
}
