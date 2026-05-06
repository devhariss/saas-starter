import { Resend as ResendClient } from 'resend'

export const resend = new ResendClient(process.env.RESEND_API_KEY!)
