import Stripe from 'stripe'
import { prisma } from './db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  })
  if (!user) throw new Error('User not found')

  if (user.subscription?.stripeCustomerId) {
    return user.subscription.stripeCustomerId
  }

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
): Promise<string> {
  const customerId = await getOrCreateStripeCustomer(userId)
  const user = await prisma.user.findUnique({ where: { id: userId } })

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: user?.email ?? undefined,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    subscription_data: { metadata: { userId } },
  })

  return session.url!
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  return session.url
}
