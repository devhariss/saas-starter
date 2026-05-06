'use client'

import { useQuery } from '@tanstack/react-query'

interface SubscriptionData {
  status: string | null
  stripePriceId: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

export function useSubscription() {
  const { data, isLoading, error } = useQuery<SubscriptionData>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const res = await fetch('/api/user/subscription')
      if (!res.ok) throw new Error('Failed to fetch subscription')
      return res.json() as Promise<SubscriptionData>
    },
  })

  const isPro =
    data?.status === 'active' &&
    data.stripePriceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID

  const isTeam =
    data?.status === 'active' &&
    data.stripePriceId === process.env.NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID

  return {
    subscription: data ?? null,
    isLoading,
    error,
    isPro,
    isTeam,
    isActive: data?.status === 'active' || data?.status === 'trialing',
  }
}
