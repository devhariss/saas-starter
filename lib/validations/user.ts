import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
})

export const updateNotificationsSchema = z.object({
  emailMarketing: z.boolean(),
  emailSecurity: z.boolean(),
  emailUpdates: z.boolean(),
  pushAll: z.boolean(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UpdateNotificationsInput = z.infer<typeof updateNotificationsSchema>
