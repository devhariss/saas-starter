import Stripe from 'stripe'
import { prisma } from '@/lib/db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
})

export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { email: true, name: true },
  })

  const existing = await prisma.subscription.findUnique({
    where: { userId },
    select: { stripeCustomerId: true },
  })

  if (existing?.stripeCustomerId) return existing.stripeCustomerId

  const customer = await stripe.customers.create({
    email: user.email!,
    name: user.name ?? undefined,
    metadata: { userId },
  })

  await prisma.subscription.upsert({
    where: { userId },
    create: { userId, stripeCustomerId: customer.id, status: 'incomplete' },
    update: { stripeCustomerId: customer.id },
  })

  return customer.id
}

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { email: true },
  })
  const customerId = await getOrCreateStripeCustomer(userId)

  return stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: user.email ?? undefined,
    mode: 'subscription',
    payment_method_types: ['card'],
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
