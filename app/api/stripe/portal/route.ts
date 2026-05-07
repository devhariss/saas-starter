import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createBillingPortalSession } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
    select: { stripeCustomerId: true },
  })

  if (!subscription?.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 404 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const portalSession = await createBillingPortalSession(
    subscription.stripeCustomerId,
    `${appUrl}/dashboard/settings/billing`
  )

  return NextResponse.json({ url: portalSession.url })
}
