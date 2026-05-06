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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
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
      async sendVerificationRequest({ identifier, url }) {
        const html = await render(MagicLinkEmail({ url, email: identifier }))
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'noreply@yourcompany.com',
          to: identifier,
          subject: 'Sign in to SaasStarter',
          html,
        })
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      const dbUser = await prisma.user.findUnique({ where: { email: user.email } })
      if (dbUser?.role === 'BANNED') return false
      return true
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        })
        ;(session.user as typeof session.user & { role: string }).role =
          dbUser?.role ?? 'USER'
        const subscription = await prisma.subscription.findFirst({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          select: { status: true },
        })
        ;(
          session.user as typeof session.user & {
            role: string
            subscriptionStatus: string | null
          }
        ).subscriptionStatus = subscription?.status ?? null
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email && user.name) {
        const html = await render(WelcomeEmail({ name: user.name, email: user.email }))
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'noreply@yourcompany.com',
          to: user.email,
          subject: 'Welcome to SaasStarter!',
          html,
        })
      }
    },
    async signIn({ user }) {
      if (user.id) {
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: 'USER_SIGN_IN',
            resource: 'User',
            resourceId: user.id,
            metadata: {},
            ipHash: 'unknown',
          },
        })
      }
    },
  },
})
