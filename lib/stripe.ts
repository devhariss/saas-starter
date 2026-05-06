import Stripe from 'stripe'
import { db } from '@/lib/db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  })

  if (!user) throw new Error('User not found')

  if (user.subscription?.stripeCustomerId) {
    return user.subscription.stripeCustomerId
  }

  const customer = await stripe.customers.create({
    email: user.email,
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
  const user = await db.user.findUnique({ where: { id: userId } })

  return stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: user?.subscription?.stripeCustomerId ? undefined : user?.email ?? undefined,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    subscription_data: { metadata: { userId } },
  })
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
