import { NextResponse } from 'next/server'
import { auth, signOut } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { resend } from '@/lib/resend'

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Cascade delete — Prisma schema handles related records
  await prisma.user.delete({ where: { id: session.user.id } })

  // Send confirmation email
  if (user.email) {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@saas-starter.com',
      to: user.email,
      subject: 'Your account has been deleted',
      html: `<p>Hi ${user.name ?? 'there'},</p><p>Your SaasStarter account and all associated data have been permanently deleted as requested.</p><p>If you did not request this, please contact us immediately at privacy@saas-starter.com.</p>`,
    })
  }

  await signOut({ redirect: false })
  return NextResponse.json({ success: true })
}
