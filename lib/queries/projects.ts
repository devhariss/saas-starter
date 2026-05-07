import { prisma } from '@/lib/db'
import { cache } from 'react'
import type { ProjectStatus } from '@prisma/client'

export type ProjectWithMeta = {
  id: string
  name: string
  slug: string
  description: string | null
  status: ProjectStatus
  createdAt: Date
  updatedAt: Date
  teamId: string | null
}

/**
 * List all projects belonging to the user, optionally filtered by status.
 * Uses `cache()` so repeated calls within a single React render tree are
 * deduplicated (Next.js 15 / React 19 server component pattern).
 */
export const getProjectsForUser = cache(
  async (userId: string): Promise<ProjectWithMeta[]> => {
    return prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        teamId: true,
      },
    })
  }
)

/**
 * Fetch a single project by slug, verifying the user owns it (or is a
 * member of the owning team). Returns null when the record is not found
 * or the user does not have access — the page should 404 in both cases.
 */
export const getProjectBySlug = cache(
  async (slug: string, userId: string): Promise<ProjectWithMeta | null> => {
    const project = await prisma.project.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        teamId: true,
        userId: true,
      },
    })
    if (!project) return null

    // Owner check
    if (project.userId === userId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId: _uid, ...rest } = project
      return rest
    }

    // Team member check
    if (project.teamId) {
      const membership = await prisma.teamMember.findUnique({
        where: { teamId_userId: { teamId: project.teamId, userId } },
      })
      if (membership) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId: _uid, ...rest } = project
        return rest
      }
    }

    return null
  }
)
