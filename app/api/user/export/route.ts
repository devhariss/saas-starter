import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      accounts: { select: { provider: true, type: true } },
      subscription: { select: { status: true, stripePriceId: true, currentPeriodEnd: true } },
      projects: { select: { id: true, name: true, slug: true, status: true, createdAt: true } },
      teamMembers: { include: { team: { select: { name: true, slug: true } } } },
      auditLogs: { select: { action: true, resource: true, createdAt: true }, take: 100 },
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
      role: user.role,
      createdAt: user.createdAt,
    },
    connectedProviders: user.accounts.map((a) => a.provider),
    subscription: user.subscription,
    projects: user.projects,
    teamMemberships: user.teamMembers.map((m) => ({ team: m.team.name, role: m.role, joinedAt: m.joinedAt })),
    recentActivity: user.auditLogs,
  }

  return new Response(JSON.stringify(exportData, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="user-data-${user.id}.json"`,
    },
  })
}
