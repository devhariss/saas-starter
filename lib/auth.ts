import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import { prisma } from '@/lib/db'
import { resend, FROM_EMAIL, FROM_NAME } from '@/lib/resend'
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
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
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
        ;(session.user as typeof session.user & { role: string; subscriptionStatus: string | null }).role =
          dbUser?.role ?? 'USER'
        ;(session.user as typeof session.user & { role: string; subscriptionStatus: string | null }).subscriptionStatus =
          dbUser?.subscription?.status ?? null
      }
      return session
    },
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      })
      if (dbUser?.role === 'BANNED') return false
      return true
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email && user.name) {
        try {
          await resend.emails.send({
            from: `${FROM_NAME} <${FROM_EMAIL}>`,
            to: user.email,
            subject: `Welcome to ${FROM_NAME}!`,
            html: await render(WelcomeEmail({ name: user.name, email: user.email })),
          })
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') console.error('Welcome email failed:', error)
        }
      }
    },
    async signIn({ user }) {
      try {
        await prisma.auditLog.create({
          data: {
            userId: user.id!,
            action: 'sign_in',
            resource: 'auth',
            resourceId: user.id!,
            metadata: {},
            ipHash: 'unknown',
          },
        })
      } catch (_) {}
    },
  },
})
