import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import { prisma } from '@/lib/db'
import { resend } from '@/lib/resend'
import { MagicLinkEmail } from '@/emails/MagicLinkEmail'
import { WelcomeEmail } from '@/emails/WelcomeEmail'
import { render } from '@react-email/render'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@yourcompany.com',
      async sendVerificationRequest({ identifier: email, url }) {
        const html = await render(MagicLinkEmail({ url, email }))
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'noreply@yourcompany.com',
          to: email,
          subject: 'Sign in to SaasStarter',
          html,
        })
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: user.id },
        select: { status: true, stripePriceId: true },
      })
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: (user as { role?: string }).role ?? 'USER',
          subscriptionStatus: subscription?.status ?? null,
        },
      }
    },
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: { role: true },
      })
      if (dbUser?.role === 'BANNED') return false
      return true
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.email) return
      const html = await render(WelcomeEmail({ name: user.name ?? 'there', email: user.email }))
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'noreply@yourcompany.com',
        to: user.email,
        subject: 'Welcome to SaasStarter!',
        html,
      }).catch(() => {})
    },
    async signIn({ user }) {
      if (!user.id) return
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'USER_SIGN_IN',
          resource: 'auth',
          resourceId: user.id,
          metadata: {},
          ipHash: 'server-event',
        },
      }).catch(() => {})
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})
