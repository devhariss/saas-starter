import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Extends the built-in Session.user type to include fields
   * we add in the session callback inside lib/auth.ts.
   */
  interface Session {
    user: {
      id: string
      role: string
      subscriptionStatus: string | null
    } & DefaultSession['user']
  }

  /** Extends the built-in User type so Prisma role field is recognised. */
  interface User {
    role?: string
  }
}
