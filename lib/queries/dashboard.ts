import { prisma } from '@/lib/db'
import { cache } from 'react'

/**
 * Returns KPI snapshot for the authenticated user's dashboard.
 * Counts are scoped to personal projects; revenue is pulled from Stripe
 * subscription data stored in the DB (no live Stripe call here).
 */
export const getDashboardKPIs = cache(async (userId: string) => {
  const [projectCount, archivedCount, teamMember, subscription] =
    await Promise.all([
      prisma.project.count({
        where: { userId, status: 'active' },
      }),
      prisma.project.count({
        where: { userId, status: 'archived' },
      }),
      prisma.teamMember.findFirst({
        where: { userId },
        include: { team: { include: { members: true } } },
      }),
      prisma.subscription.findUnique({
        where: { userId },
        select: {
          status: true,
          currentPeriodEnd: true,
          cancelAtPeriodEnd: true,
        },
      }),
    ])

  const teamSize = teamMember?.team.members.length ?? 0

  return {
    activeProjects: projectCount,
    archivedProjects: archivedCount,
    teamSize,
    subscriptionStatus: subscription?.status ?? null,
    currentPeriodEnd: subscription?.currentPeriodEnd ?? null,
    cancelAtPeriodEnd: subscription?.cancelAtPeriodEnd ?? false,
  }
})

/**
 * Returns the 20 most recent AuditLog entries for the user,
 * used to power the Activity Feed.
 */
export const getRecentActivity = cache(async (userId: string) => {
  const logs = await prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: {
      id: true,
      action: true,
      resource: true,
      resourceId: true,
      createdAt: true,
    },
  })
  return logs
})
