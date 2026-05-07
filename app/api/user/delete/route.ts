import { NextResponse } from 'next/server'
import { auth, signOut } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { resend, FROM_EMAIL } from '@/lib/resend'

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, email, name } = session.user

  await prisma.user.delete({ where: { id } })

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Your SaasStarter account has been deleted',
    html: `<p>Hi ${name ?? 'there'},</p><p>Your account and all associated data have been permanently deleted as requested.</p><p>If you believe this was a mistake, contact us at privacy@yourcompany.com within 30 days.</p>`,
  })

  return NextResponse.json({ success: true })
}
