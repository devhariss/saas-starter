import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saas-starter.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@saas-starter.com',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  // Regular users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice Chen',
      email: 'alice@example.com',
      emailVerified: new Date(),
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Martinez',
      email: 'bob@example.com',
      emailVerified: new Date(),
    },
  })

  // Subscription for alice
  await prisma.subscription.upsert({
    where: { userId: alice.id },
    update: {},
    create: {
      userId: alice.id,
      stripeCustomerId: 'cus_demo_alice',
      stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? 'price_demo',
      stripeSubscriptionId: 'sub_demo_alice',
      status: 'active',
      currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
  })

  // Team
  const team = await prisma.team.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme-corp',
      ownerId: alice.id,
    },
  })

  // Team members
  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team.id, userId: alice.id } },
    update: {},
    create: { teamId: team.id, userId: alice.id, role: 'OWNER' },
  })
  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team.id, userId: bob.id } },
    update: {},
    create: { teamId: team.id, userId: bob.id, role: 'MEMBER' },
  })

  // Projects
  const projectData = [
    { name: 'Marketing Site Revamp', slug: 'marketing-site-revamp', description: 'Redesign the company marketing site with new brand guidelines.' },
    { name: 'API v2 Migration', slug: 'api-v2-migration', description: 'Migrate all endpoints to the new REST + GraphQL hybrid API.' },
    { name: 'Analytics Dashboard', slug: 'analytics-dashboard', description: 'Build real-time analytics dashboard for product metrics.' },
  ]

  for (const p of projectData) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, userId: alice.id, teamId: team.id },
    })
  }

  // Audit logs
  const auditActions = [
    'USER_CREATED', 'USER_SIGNED_IN', 'PROJECT_CREATED',
    'SUBSCRIPTION_UPGRADED', 'TEAM_CREATED', 'MEMBER_INVITED',
    'INVOICE_PAID', 'PASSWORD_CHANGED', 'EXPORT_REQUESTED', 'SETTINGS_UPDATED',
  ]

  for (const action of auditActions) {
    await prisma.auditLog.create({
      data: {
        userId: alice.id,
        action,
        resource: 'user',
        resourceId: alice.id,
        metadata: { demo: true },
        ipHash: 'hash_demo',
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      },
    })
  }

  // Consent logs
  for (let i = 0; i < 5; i++) {
    await prisma.consentLog.create({
      data: {
        ipHash: `hash_demo_${i}`,
        categories: { essential: true, analytics: i % 2 === 0, marketing: false, functional: true },
        action: i % 3 === 0 ? 'revoked' : 'granted',
        createdAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000),
      },
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Seed complete: admin, 2 users, 1 team, 3 projects, subscriptions, audit logs')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
