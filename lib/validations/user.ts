import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
})

export const deleteAccountSchema = z.object({
  confirmation: z.literal('delete my account'),
})

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>
