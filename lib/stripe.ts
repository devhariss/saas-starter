import Stripe from 'stripe'
import { prisma } from '@/lib/db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const sub = await prisma.subscription.findUnique({ where: { userId } })
  if (sub?.stripeCustomerId) return sub.stripeCustomerId

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } })
  const customer = await stripe.customers.create({
    email: user.email!,
    name: user.name ?? undefined,
    metadata: { userId },
  })
  return customer.id
}

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const customerId = await getOrCreateStripeCustomer(userId)
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId },
  })
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
