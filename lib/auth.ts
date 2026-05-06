import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'
import { prisma } from './db'
import { resend, FROM_EMAIL } from './resend'
import { WelcomeEmail } from '@/emails/WelcomeEmail'
import React from 'react'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  pages: { signIn: '/login', error: '/login' },
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
      from: FROM_EMAIL,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: (user as { role?: string }).role ?? 'USER',
        },
      }
    },
    signIn({ user }) {
      if ((user as { role?: string }).role === 'BANNED') return false
      return true
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email && user.name) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: 'Welcome to SaasStarter',
          react: React.createElement(WelcomeEmail, { name: user.name }),
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
      await prisma.auditLog.create({
        data: {
          userId: user.id!,
          action: 'SIGN_IN',
          resource: 'user',
          resourceId: user.id!,
          metadata: {},
          ipHash: '',
        },
      })
    },
  },
})
