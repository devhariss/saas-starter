import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
})

export const updateNotificationsSchema = z.object({
  marketingEmails: z.boolean(),
  securityAlerts: z.boolean(),
  productUpdates: z.boolean(),
  billingAlerts: z.boolean(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UpdateNotificationsInput = z.infer<typeof updateNotificationsSchema>
