import { NextResponse } from 'next/server'
import { auth, signOut } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { resend, FROM_EMAIL } from '@/lib/resend'

export async function DELETE() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: session.user.id! } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  await prisma.user.delete({ where: { id: user.id } })

  if (user.email) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: 'Your account has been deleted',
      html: `<p>Hi ${user.name ?? 'there'}, your SaasStarter account and all associated data have been permanently deleted as requested.</p><p>If this was a mistake, please contact <a href="mailto:support@saas-starter.com">support@saas-starter.com</a>.</p>`,
    })
  }

  await signOut()
  return NextResponse.json({ success: true })
}
