'use client'

import { useSession } from 'next-auth/react'

type SubscriptionStatus = 'active' | 'trialing' | 'canceled' | 'past_due' | 'incomplete' | null

export function useSubscription() {
  const { data: session } = useSession()
  const status = (session?.user as { subscriptionStatus?: SubscriptionStatus })?.subscriptionStatus ?? null

  return {
    status,
    isActive: status === 'active' || status === 'trialing',
    isPro: status === 'active',
    isFree: !status || status === 'canceled' || status === 'incomplete',
  }
}
