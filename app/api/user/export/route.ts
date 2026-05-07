import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      accounts: { select: { provider: true, type: true } },
      subscription: {
        select: { status: true, currentPeriodStart: true, currentPeriodEnd: true, cancelAtPeriodEnd: true },
      },
      projects: { select: { name: true, slug: true, status: true, createdAt: true } },
      auditLogs: { select: { action: true, resource: true, createdAt: true }, take: 100, orderBy: { createdAt: 'desc' } },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const exportData = {
    exportedAt: new Date().toISOString(),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      createdAt: user.createdAt,
    },
    connectedAccounts: user.accounts,
    subscription: user.subscription,
    projects: user.projects,
    activityLog: user.auditLogs,
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="saas-starter-data-export-${user.id}.json"`,
    },
  })
}
