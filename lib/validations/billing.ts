import { z } from 'zod'

export const checkoutSchema = z.object({
  priceId: z.string().startsWith('price_', 'Invalid price ID'),
})

export const portalSchema = z.object({
  returnUrl: z.string().url('Invalid return URL'),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
export type PortalInput = z.infer<typeof portalSchema>
