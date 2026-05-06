import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createBillingPortalSession } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sub = await prisma.subscription.findUnique({ where: { userId: session.user.id! } })
  if (!sub?.stripeCustomerId) return NextResponse.json({ error: 'No billing account' }, { status: 400 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const portalSession = await createBillingPortalSession(sub.stripeCustomerId, `${appUrl}/settings/billing`)

  return NextResponse.json({ url: portalSession.url })
}
