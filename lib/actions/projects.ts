'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const createSchema = z.object({
  name: z.string().min(1, 'Name is required').max(64, 'Name too long'),
  description: z.string().max(256, 'Description too long').optional(),
})

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = slugify(base)
  let i = 0
  while (await prisma.project.findUnique({ where: { slug } })) {
    i++
    slug = `${slugify(base)}-${i}`
  }
  return slug
}

export type CreateProjectState = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

/**
 * Server Action: create a new project for the current user.
 * Validates with Zod, auto-generates a unique slug, and redirects
 * to the project detail page on success.
 */
export async function createProject(
  _prev: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthenticated' }

  const raw = {
    name: formData.get('name') as string,
    description: (formData.get('description') as string) || undefined,
  }

  const parsed = createSchema.safeParse(raw)
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const slug = await uniqueSlug(parsed.data.name)

  const project = await prisma.project.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      slug,
      userId: session.user.id,
      status: 'active',
    },
  })

  revalidatePath('/projects')
  redirect(`/projects/${project.slug}`)
}

/**
 * Server Action: archive or restore a project.
 */
export async function toggleProjectStatus(projectId: string): Promise<void> {
  const session = await auth()
  if (!session?.user?.id) return

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { userId: true, status: true, slug: true },
  })
  if (!project || project.userId !== session.user.id) return

  await prisma.project.update({
    where: { id: projectId },
    data: {
      status: project.status === 'active' ? 'archived' : 'active',
      updatedAt: new Date(),
    },
  })

  revalidatePath('/projects')
  revalidatePath(`/projects/${project.slug}`)
}
