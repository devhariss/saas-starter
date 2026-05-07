import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
})

export const deleteAccountSchema = z.object({
  confirmation: z.literal('DELETE', {
    errorMap: () => ({ message: 'Type DELETE to confirm' }),
  }),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>
