import Stripe from 'stripe'
import { prisma } from './db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export async function getOrCreateStripeCustomer(userId: string, email: string): Promise<string> {
  const subscription = await prisma.subscription.findUnique({ where: { userId } })
  if (subscription?.stripeCustomerId) return subscription.stripeCustomerId

  const customer = await stripe.customers.create({ email, metadata: { userId } })

  await prisma.subscription.upsert({
    where: { userId },
    update: { stripeCustomerId: customer.id },
    create: { userId, stripeCustomerId: customer.id, status: 'incomplete' },
  })

  return customer.id
}

export async function createCheckoutSession(
  userId: string,
  email: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const customerId = await getOrCreateStripeCustomer(userId, email)
  return stripe.checkout.sessions.create({
    customer: customerId,
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

export async function createBillingPortalSession(customerId: string, returnUrl: string): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl })
}
