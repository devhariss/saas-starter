import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createBillingPortalSession } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  if (!subscription?.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 404 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const url = await createBillingPortalSession(
    subscription.stripeCustomerId,
    `${appUrl}/dashboard/settings/billing`
  )

  return NextResponse.json({ url })
}
