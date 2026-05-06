import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { InvoicePaidEmail } from '@/emails/InvoicePaidEmail'
import React from 'react'
import type Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string)
        const userId = sub.metadata.userId
        if (userId) {
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              stripeSubscriptionId: sub.id,
              stripePriceId: sub.items.data[0].price.id,
              status: sub.status as 'active',
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            },
            create: {
              userId,
              stripeCustomerId: sub.customer as string,
              stripeSubscriptionId: sub.id,
              stripePriceId: sub.items.data[0].price.id,
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
          update: {
            status: sub.status as 'active',
            stripePriceId: sub.items.data[0].price.id,
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          },
          create: {
            userId,
            stripeCustomerId: sub.customer as string,
            stripeSubscriptionId: sub.id,
            stripePriceId: sub.items.data[0].price.id,
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
      const customerId = invoice.customer as string
      const sub = await prisma.subscription.findFirst({ where: { stripeCustomerId: customerId }, include: { user: true } })
      if (sub?.user?.email && sub.user.name) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.user.email,
          subject: 'Your invoice has been paid',
          react: React.createElement(InvoicePaidEmail, {
            name: sub.user.name,
            amount: `$${((invoice.amount_paid ?? 0) / 100).toFixed(2)}`,
            date: new Date((invoice.created ?? 0) * 1000).toLocaleDateString(),
            invoiceUrl: invoice.hosted_invoice_url ?? '#',
          }),
        })
      }
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
