import { z } from 'zod'

export const checkoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
})

export const cancelSubscriptionSchema = z.object({
  confirm: z.literal(true),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
