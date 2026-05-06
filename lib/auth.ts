import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { prisma } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/resend";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: "/login",
    error: "/login",
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
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@saas-starter.dev",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as { role?: string }).role ?? "USER";

        const subscription = await prisma.subscription.findUnique({
          where: { userId: user.id },
          select: { status: true },
        });
        session.user.subscriptionStatus = subscription?.status ?? null;
      }
      return session;
    },
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: { role: true },
      });
      if (dbUser?.role === "BANNED") return false;
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email && user.name) {
        await sendWelcomeEmail({ to: user.email, name: user.name });
      }
    },
    async signIn({ user }) {
      if (user.id) {
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "user.signin",
            resource: "session",
            metadata: {},
          },
        }).catch(() => null);
      }
    },
  },
});
