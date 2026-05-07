import { useCurrentUser } from './useCurrentUser'

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'canceled'
  | 'past_due'
  | 'incomplete'
  | null

export function useSubscription() {
  const { user } = useCurrentUser()
  const status = (user?.subscriptionStatus as SubscriptionStatus) ?? null
  return {
    status,
    isActive: status === 'active' || status === 'trialing',
    isPro: status === 'active',
    isFree: !status || status === 'canceled' || status === 'incomplete',
  }
}
