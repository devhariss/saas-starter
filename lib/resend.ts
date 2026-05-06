import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'noreply@saas-starter.com'

export const FROM_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'SaasStarter'
