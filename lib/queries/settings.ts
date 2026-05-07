import { prisma } from '@/lib/db'
import { cache } from 'react'

export type UserProfile = {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
  createdAt: Date
}

export type SubscriptionDetails = {
  status: string
  stripePriceId: string | null
  currentPeriodEnd: Date | null
  cancelAtPeriodEnd: boolean
} | null

/**
 * Returns the user's profile and subscription in one round-trip.
 * Safe to call from Server Components; uses React cache for deduplication.
 */
export const getUserSettings = cache(
  async (userId: string): Promise<{ profile: UserProfile; subscription: SubscriptionDetails }> => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        subscription: {
          select: {
            status: true,
            stripePriceId: true,
            currentPeriodEnd: true,
            cancelAtPeriodEnd: true,
          },
        },
      },
    })

    return {
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
      },
      subscription: user.subscription
        ? {
            status: user.subscription.status,
            stripePriceId: user.subscription.stripePriceId,
            currentPeriodEnd: user.subscription.currentPeriodEnd,
            cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
          }
        : null,
    }
  }
)
