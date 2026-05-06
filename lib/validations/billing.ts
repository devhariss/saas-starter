import { z } from 'zod'

export const checkoutSchema = z.object({
  priceId: z.string().startsWith('price_', 'Invalid price ID'),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
