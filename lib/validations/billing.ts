import { z } from 'zod'

export const checkoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
})

export const portalSchema = z.object({
  returnUrl: z.string().url('Must be a valid URL'),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
export type PortalInput = z.infer<typeof portalSchema>
