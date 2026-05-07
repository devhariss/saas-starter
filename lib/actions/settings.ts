'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(64, 'Name too long'),
})

export type UpdateProfileState = {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

/**
 * Server Action: update the current user's display name.
 * Email is intentionally excluded — email changes require re-verification.
 */
export async function updateProfile(
  _prev: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthenticated' }

  const parsed = profileSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name },
  })

  revalidatePath('/settings')
  return { success: true }
}
