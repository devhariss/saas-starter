import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import { resend } from '@/lib/resend'
import { MagicLinkEmail } from '@/emails/MagicLinkEmail'

export const { handlers, auth, signIn, signOut } = NextAuth({
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
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@saas-starter.com',
      sendVerificationRequest: async ({ identifier, url }) => {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'noreply@saas-starter.com',
          to: identifier,
          subject: 'Sign in to SaasStarter',
          react: MagicLinkEmail({ url, email: identifier }),
        })
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            role: true,
            subscription: { select: { status: true } },
          },
        })
        ;(session.user as { role?: string }).role = dbUser?.role ?? 'USER'
        ;(session.user as { subscriptionStatus?: string }).subscriptionStatus =
          dbUser?.subscription?.status ?? null
      }
      return session
    },
    async signIn({ user }) {
      if (!user.email) return false
      const dbUser = await prisma.user.findUnique({ where: { email: user.email } })
      if (dbUser?.role === 'BANNED') return false
      return true
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'noreply@saas-starter.com',
          to: user.email,
          subject: 'Welcome to SaasStarter!',
          react: (await import('@/emails/WelcomeEmail')).WelcomeEmail({
            name: user.name ?? 'there',
          }),
        })
      }
      await prisma.auditLog.create({
        data: {
          userId: user.id!,
          action: 'USER_CREATED',
          resource: 'user',
          resourceId: user.id!,
          metadata: {},
          ipHash: '',
        },
      })
    },
    async signIn({ user }) {
      if (user.id) {
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: 'USER_SIGNED_IN',
            resource: 'user',
            resourceId: user.id,
            metadata: {},
            ipHash: '',
          },
        })
      }
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})
