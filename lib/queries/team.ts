import { prisma } from '@/lib/db'
import { cache } from 'react'
import type { TeamRole } from '@prisma/client'

export type TeamMemberWithUser = {
  id: string
  role: TeamRole
  joinedAt: Date
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export type TeamWithMembers = {
  id: string
  name: string
  slug: string
  ownerId: string
  createdAt: Date
  members: TeamMemberWithUser[]
  pendingInvites: number
}

/**
 * Returns the first team the user owns or belongs to, with all members
 * and a count of pending invites. Returns null if they have no team.
 */
export const getTeamForUser = cache(
  async (userId: string): Promise<TeamWithMembers | null> => {
    // Prefer the team they own; fall back to any membership.
    const owned = await prisma.team.findFirst({
      where: { ownerId: userId },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
          orderBy: { joinedAt: 'asc' },
        },
        invites: { where: { expiresAt: { gt: new Date() } } },
      },
    })

    if (owned) {
      return {
        id: owned.id,
        name: owned.name,
        slug: owned.slug,
        ownerId: owned.ownerId,
        createdAt: owned.createdAt,
        members: owned.members,
        pendingInvites: owned.invites.length,
      }
    }

    const membership = await prisma.teamMember.findFirst({
      where: { userId },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: {
                  select: { id: true, name: true, email: true, image: true },
                },
              },
              orderBy: { joinedAt: 'asc' },
            },
            invites: { where: { expiresAt: { gt: new Date() } } },
          },
        },
      },
    })

    if (!membership) return null

    const { team } = membership
    return {
      id: team.id,
      name: team.name,
      slug: team.slug,
      ownerId: team.ownerId,
      createdAt: team.createdAt,
      members: team.members,
      pendingInvites: team.invites.length,
    }
  }
)
