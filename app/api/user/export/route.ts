import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id! },
    include: { subscription: true, projects: true, teamMembers: { include: { team: true } }, auditLogs: { take: 100, orderBy: { createdAt: 'desc' } } },
  })

  return new Response(JSON.stringify(user, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="user-data-${new Date().toISOString().split('T')[0]}.json"`,
    },
  })
}
