import { z } from 'zod'

export const checkoutSchema = z.object({
  priceId: z.string().startsWith('price_'),
})

export const portalSchema = z.object({
  returnUrl: z.string().url().optional(),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
export type PortalInput = z.infer<typeof portalSchema>
