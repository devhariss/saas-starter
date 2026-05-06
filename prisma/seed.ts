import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saas-starter.dev' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@saas-starter.dev',
      emailVerified: new Date(),
      role: 'ADMIN',
    },
  })

  // Regular users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@acmecorp.io' },
    update: {},
    create: {
      name: 'Alice Chen',
      email: 'alice@acmecorp.io',
      emailVerified: new Date(),
      role: 'USER',
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@nexaflow.io' },
    update: {},
    create: {
      name: 'Bob Martinez',
      email: 'bob@nexaflow.io',
      emailVerified: new Date(),
      role: 'USER',
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
  const projects = [
    {
      name: 'Marketing Site',
      slug: 'marketing-site',
      description: 'Public-facing marketing website with blog and pricing.',
      userId: alice.id,
      teamId: team.id,
    },
    {
      name: 'API Platform',
      slug: 'api-platform',
      description: 'Internal REST and GraphQL API serving all products.',
      userId: alice.id,
      teamId: team.id,
    },
    {
      name: 'Mobile App',
      slug: 'mobile-app',
      description: 'React Native app for iOS and Android.',
      userId: bob.id,
      teamId: team.id,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: { ...project, status: 'active' },
    })
  }

  // Subscription for alice
  await prisma.subscription.upsert({
    where: { userId: alice.id },
    update: {},
    create: {
      userId: alice.id,
      stripeCustomerId: 'cus_demo_alice',
      stripePriceId: 'price_demo_pro',
      stripeSubscriptionId: 'sub_demo_alice',
      status: 'active',
      currentPeriodStart: new Date('2026-04-01'),
      currentPeriodEnd: new Date('2026-05-01'),
      cancelAtPeriodEnd: false,
    },
  })

  // Audit logs
  const actions = [
    { action: 'sign_in', resource: 'auth', userId: alice.id },
    { action: 'create_project', resource: 'project', userId: alice.id },
    { action: 'invite_member', resource: 'team', userId: alice.id },
    { action: 'sign_in', resource: 'auth', userId: bob.id },
    { action: 'update_profile', resource: 'user', userId: bob.id },
    { action: 'upgrade_subscription', resource: 'billing', userId: alice.id },
    { action: 'sign_in', resource: 'auth', userId: admin.id },
    { action: 'create_project', resource: 'project', userId: bob.id },
    { action: 'sign_in', resource: 'auth', userId: alice.id },
    { action: 'export_data', resource: 'user', userId: alice.id },
  ]

  for (let i = 0; i < actions.length; i++) {
    await prisma.auditLog.create({
      data: {
        ...actions[i],
        resourceId: actions[i].userId,
        metadata: {},
        ipHash: `hash_demo_${i}`,
        createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 2),
      },
    })
  }

  // Consent logs
  const consentEntries = [
    { action: 'granted', categories: { essential: true, analytics: true, marketing: false, functional: true } },
    { action: 'revoked', categories: { essential: true, analytics: false, marketing: false, functional: false } },
    { action: 'granted', categories: { essential: true, analytics: true, marketing: true, functional: true } },
    { action: 'granted', categories: { essential: true, analytics: false, marketing: false, functional: false } },
    { action: 'revoked', categories: { essential: true, analytics: false, marketing: false, functional: false } },
  ]

  for (let i = 0; i < consentEntries.length; i++) {
    await prisma.consentLog.create({
      data: {
        ipHash: `consent_hash_demo_${i}`,
        categories: consentEntries[i].categories,
        action: consentEntries[i].action as 'granted' | 'revoked',
        createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24),
      },
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Seed complete')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
