import Stripe from 'stripe'
import { prisma } from '@/lib/db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
})

export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const subscription = await prisma.subscription.findFirst({
    where: { userId },
    select: { stripeCustomerId: true },
  })
  if (subscription?.stripeCustomerId) return subscription.stripeCustomerId

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { email: true, name: true },
  })

  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    metadata: { userId },
  })

  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeCustomerId: customer.id,
      status: 'incomplete',
    },
    update: { stripeCustomerId: customer.id },
  })

  return customer.id
}

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const customerId = await getOrCreateStripeCustomer(userId)
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { email: true },
  })

  return stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: user.email ?? undefined,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    subscription_data: { metadata: { userId } },
  })
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}
