import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { resend } from '@/lib/resend'
import { InvoicePaidEmail } from '@/emails/InvoicePaidEmail'

export const config = { api: { bodyParser: false } }

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.subscription && session.customer) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string)
          await prisma.subscription.upsert({
            where: { stripeCustomerId: session.customer as string },
            create: {
              userId: session.metadata?.userId ?? '',
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: sub.id,
              stripePriceId: sub.items.data[0].price.id,
              status: sub.status as never,
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              cancelAtPeriodEnd: sub.cancel_at_period_end,
            },
            update: {
              stripeSubscriptionId: sub.id,
              stripePriceId: sub.items.data[0].price.id,
              status: sub.status as never,
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              cancelAtPeriodEnd: sub.cancel_at_period_end,
            },
          })
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: {
            status: sub.status as never,
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            stripePriceId: sub.items.data[0].price.id,
          },
        })
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
        const customer = await prisma.subscription.findUnique({
          where: { stripeCustomerId: invoice.customer as string },
          include: { user: true },
        })
        if (customer?.user?.email) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL ?? 'noreply@saas-starter.com',
            to: customer.user.email,
            subject: 'Payment received — thank you!',
            react: InvoicePaidEmail({
              name: customer.user.name ?? 'there',
              amount: ((invoice.amount_paid ?? 0) / 100).toFixed(2),
              invoiceUrl: invoice.hosted_invoice_url ?? '#',
              date: new Date(invoice.created * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            }),
          })
        }
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await prisma.subscription.updateMany({
          where: { stripeCustomerId: invoice.customer as string },
          data: { status: 'past_due' },
        })
        break
      }
      default:
        break
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('Webhook handler error:', err)
  }

  return NextResponse.json({ received: true })
}
