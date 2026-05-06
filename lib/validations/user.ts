import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  image: z.string().url().optional().or(z.literal('')),
})

export const deleteAccountSchema = z.object({
  confirmation: z.string().refine((v) => v === 'DELETE', {
    message: 'Please type DELETE to confirm',
  }),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>
