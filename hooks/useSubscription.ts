'use client'

import { useSession } from 'next-auth/react'

export function useSubscription() {
  const { data: session } = useSession()
  const status = (session?.user as { subscriptionStatus?: string })?.subscriptionStatus ?? null
  return {
    status,
    isPro: status === 'active' || status === 'trialing',
    isFree: !status || status === 'canceled',
  }
}
