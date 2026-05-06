import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'
import { checkoutSchema } from '@/lib/validations/billing'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = checkoutSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const checkoutSession = await createCheckoutSession(
    session.user.id!,
    session.user.email!,
    parsed.data.priceId,
    `${appUrl}/dashboard?checkout=success`,
    `${appUrl}/pricing?checkout=canceled`
  )

  return NextResponse.json({ url: checkoutSession.url })
}
