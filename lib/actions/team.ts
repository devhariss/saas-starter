'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import crypto from 'crypto'

const inviteSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['ADMIN', 'MEMBER']),
})

const createTeamSchema = z.object({
  name: z.string().min(1).max(64),
})

export type TeamActionState = {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function uniqueTeamSlug(base: string): Promise<string> {
  let slug = slugify(base)
  let i = 0
  while (await prisma.team.findUnique({ where: { slug } })) {
    i++
    slug = `${slugify(base)}-${i}`
  }
  return slug
}

/**
 * Server Action: create a new team and make the current user its OWNER member.
 */
export async function createTeam(
  _prev: TeamActionState,
  formData: FormData
): Promise<TeamActionState> {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthenticated' }

  const parsed = createTeamSchema.safeParse({ name: formData.get('name') })
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors }

  const existing = await prisma.team.findFirst({ where: { ownerId: session.user.id } })
  if (existing) return { error: 'You already own a team.' }

  const slug = await uniqueTeamSlug(parsed.data.name)

  const team = await prisma.team.create({
    data: {
      name: parsed.data.name,
      slug,
      ownerId: session.user.id,
      members: {
        create: { userId: session.user.id, role: 'OWNER' },
      },
    },
  })

  revalidatePath('/team')
  return { success: true }
}

/**
 * Server Action: invite someone to the team by email.
 * Persists a TeamInvite row — the actual email send happens via
 * the /api/team/invite route so we can use Resend there.
 */
export async function inviteMember(
  teamId: string,
  _prev: TeamActionState,
  formData: FormData
): Promise<TeamActionState> {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthenticated' }

  const parsed = inviteSchema.safeParse({
    email: formData.get('email'),
    role: formData.get('role'),
  })
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors }

  const team = await prisma.team.findUnique({ where: { id: teamId } })
  if (!team || team.ownerId !== session.user.id) return { error: 'Not authorized' }

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await prisma.teamInvite.upsert({
    where: { token: `${teamId}-${parsed.data.email}` },
    update: { token, expiresAt, role: parsed.data.role },
    create: {
      teamId,
      email: parsed.data.email,
      role: parsed.data.role,
      token,
      expiresAt,
    },
  })

  revalidatePath('/team')
  return { success: true }
}

/**
 * Server Action: remove a team member (owner only).
 */
export async function removeMember(memberId: string): Promise<void> {
  const session = await auth()
  if (!session?.user?.id) return

  const member = await prisma.teamMember.findUnique({
    where: { id: memberId },
    include: { team: true },
  })
  if (!member || member.team.ownerId !== session.user.id) return
  if (member.userId === session.user.id) return // can't remove yourself

  await prisma.teamMember.delete({ where: { id: memberId } })
  revalidatePath('/team')
}
