'use client'

import { useSession } from 'next-auth/react'

export function useSubscription() {
  const { data: session } = useSession()
  const status = session?.user?.subscriptionStatus ?? null

  return {
    status,
    isActive: status === 'active' || status === 'trialing',
    isPro: status === 'active',
    isFree: !status || status === 'canceled',
  }
}
