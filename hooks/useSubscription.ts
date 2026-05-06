'use client'

import { useSession } from 'next-auth/react'

type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'canceled'
  | 'past_due'
  | 'incomplete'
  | null

export function useSubscription() {
  const { data: session } = useSession()
  const status = ((session?.user as { subscriptionStatus?: string | null })?.subscriptionStatus ?? null) as SubscriptionStatus

  return {
    status,
    isActive: status === 'active' || status === 'trialing',
    isPro: status === 'active' || status === 'trialing',
    isCanceled: status === 'canceled',
    isPastDue: status === 'past_due',
  }
}
