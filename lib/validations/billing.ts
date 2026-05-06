import { z } from 'zod'

export const checkoutSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
})

export const billingPortalSchema = z.object({
  returnUrl: z.string().url('Invalid return URL'),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
export type BillingPortalInput = z.infer<typeof billingPortalSchema>
