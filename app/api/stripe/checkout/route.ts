import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createCheckoutSession, getOrCreateStripeCustomer } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { priceId } = body as { priceId: string }

  if (!priceId) {
    return NextResponse.json({ error: 'priceId is required' }, { status: 400 })
  }

  // Ensure the Stripe customer record exists before creating checkout
  await getOrCreateStripeCustomer(session.user.id)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const checkoutUrl = await createCheckoutSession(
    session.user.id,
    priceId,
    `${appUrl}/dashboard?checkout=success`,
    `${appUrl}/pricing?checkout=cancelled`
  )

  return NextResponse.json({ url: checkoutUrl })
}
