import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { InvoicePaidEmail } from '@/emails/InvoicePaidEmail'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode === 'subscription' && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string)
          const userId = sub.metadata.userId
          if (userId) {
            await prisma.subscription.upsert({
              where: { userId },
              create: {
                userId,
                stripeCustomerId: sub.customer as string,
                stripePriceId: sub.items.data[0]?.price.id,
                stripeSubscriptionId: sub.id,
                status: sub.status as 'active',
                currentPeriodStart: new Date(sub.current_period_start * 1000),
                currentPeriodEnd: new Date(sub.current_period_end * 1000),
              },
              update: {
                stripeCustomerId: sub.customer as string,
                stripePriceId: sub.items.data[0]?.price.id,
                stripeSubscriptionId: sub.id,
                status: sub.status as 'active',
                currentPeriodStart: new Date(sub.current_period_start * 1000),
                currentPeriodEnd: new Date(sub.current_period_end * 1000),
              },
            })
          }
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        const userId = sub.metadata.userId
        if (userId) {
          await prisma.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: sub.customer as string,
              stripePriceId: sub.items.data[0]?.price.id,
              stripeSubscriptionId: sub.id,
              status: sub.status as 'active',
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              cancelAtPeriodEnd: sub.cancel_at_period_end,
            },
            update: {
              stripePriceId: sub.items.data[0]?.price.id,
              status: sub.status as 'active',
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              cancelAtPeriodEnd: sub.cancel_at_period_end,
            },
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: 'canceled' },
        })
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customer = await stripe.customers.retrieve(invoice.customer as string)
        if (customer && !customer.deleted) {
          const user = await prisma.user.findFirst({
            where: { email: (customer as Stripe.Customer).email ?? '' },
          })
          if (user?.email) {
            await resend.emails.send({
              from: FROM_EMAIL,
              to: user.email,
              subject: `Receipt: ${invoice.amount_paid ? `$${(invoice.amount_paid / 100).toFixed(2)}` : ''}`,
              react: InvoicePaidEmail({
                name: user.name ?? 'there',
                amount: `$${((invoice.amount_paid ?? 0) / 100).toFixed(2)}`,
                invoiceId: invoice.id ?? '',
                date: new Date((invoice.created ?? 0) * 1000).toLocaleDateString(),
                planName: 'Pro',
              }),
            })
          }
        }
        break
      }

      case 'invoice.payment_failed':
        break

      default:
        break
    }
  } catch (err) {
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
