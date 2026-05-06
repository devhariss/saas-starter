import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
})

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
