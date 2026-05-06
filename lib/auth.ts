import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import { db } from '@/lib/db'
import { resend } from '@/lib/resend'
import MagicLinkEmail from '@/emails/MagicLinkEmail'
import WelcomeEmail from '@/emails/WelcomeEmail'
import { render } from '@react-email/render'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
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
      async sendVerificationRequest({ identifier, url }) {
        const html = await render(<MagicLinkEmail magicLink={url} />)
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
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          include: { subscription: true },
        })
        if (dbUser) {
          session.user.role = dbUser.role
          session.user.subscriptionStatus = dbUser.subscription?.status ?? null
        }
      }
      return session
    },
    async signIn({ user }) {
      const dbUser = await db.user.findUnique({ where: { email: user.email! } })
      if (dbUser?.role === 'BANNED') return false
      return true
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email && user.name) {
        const html = await render(<WelcomeEmail userName={user.name} />)
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
        await db.auditLog.create({
          data: {
            userId: user.id,
            action: 'USER_SIGN_IN',
            resource: 'auth',
            resourceId: user.id,
            metadata: {},
            ipHash: 'unknown',
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
