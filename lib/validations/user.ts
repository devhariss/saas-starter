import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  image: z.string().url().optional().nullable(),
})

export const deleteAccountSchema = z.object({
  confirmation: z.literal('DELETE', {
    errorMap: () => ({ message: 'Please type DELETE to confirm' }),
  }),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>
