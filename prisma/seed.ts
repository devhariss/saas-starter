import { PrismaClient, UserRole, SubscriptionStatus, ProjectStatus, TeamMemberRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Alex Rivera',
      email: 'admin@example.com',
      emailVerified: new Date(),
      role: UserRole.ADMIN,
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
      role: UserRole.USER,
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Martinez',
      email: 'bob@example.com',
      emailVerified: new Date(),
      role: UserRole.USER,
    },
  })

  // Team
  const team = await prisma.team.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme-corp',
      ownerId: admin.id,
      members: {
        create: [
          { userId: admin.id, role: TeamMemberRole.OWNER },
          { userId: alice.id, role: TeamMemberRole.ADMIN },
          { userId: bob.id, role: TeamMemberRole.MEMBER },
        ],
      },
    },
  })

  // Active subscription for admin
  await prisma.subscription.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      stripeCustomerId: 'cus_seed_admin',
      stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? 'price_pro',
      stripeSubscriptionId: 'sub_seed_admin',
      status: SubscriptionStatus.active,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    },
  })

  // Projects
  const projectData = [
    {
      name: 'Analytics Dashboard',
      slug: 'analytics-dashboard',
      description: 'Real-time analytics and reporting dashboard.',
      userId: admin.id,
      teamId: team.id,
      status: ProjectStatus.active,
    },
    {
      name: 'Customer Portal',
      slug: 'customer-portal',
      description: 'Self-service portal for enterprise customers.',
      userId: alice.id,
      teamId: team.id,
      status: ProjectStatus.active,
    },
    {
      name: 'Onboarding Flow',
      slug: 'onboarding-flow',
      description: 'Guided onboarding for new users.',
      userId: bob.id,
      teamId: team.id,
      status: ProjectStatus.archived,
    },
  ]

  for (const project of projectData) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    })
  }

  // Audit log entries
  const auditActions = [
    { action: 'USER_SIGN_IN', resource: 'auth' },
    { action: 'PROJECT_CREATED', resource: 'project' },
    { action: 'SUBSCRIPTION_UPGRADED', resource: 'subscription' },
    { action: 'TEAM_MEMBER_INVITED', resource: 'team' },
    { action: 'INVOICE_PAID', resource: 'billing' },
    { action: 'USER_SIGN_IN', resource: 'auth' },
    { action: 'PROJECT_ARCHIVED', resource: 'project' },
    { action: 'SETTINGS_UPDATED', resource: 'user' },
    { action: 'DATA_EXPORTED', resource: 'user' },
    { action: 'USER_SIGN_IN', resource: 'auth' },
  ]

  for (let i = 0; i < auditActions.length; i++) {
    await prisma.auditLog.create({
      data: {
        ...auditActions[i],
        userId: [admin.id, alice.id, bob.id][i % 3],
        resourceId: `seed_${i}`,
        metadata: { seeded: true },
        ipHash: `hash_${i}`,
        createdAt: new Date(Date.now() - i * 3600000),
      },
    })
  }

  // Consent logs
  for (let i = 0; i < 5; i++) {
    await prisma.consentLog.create({
      data: {
        ipHash: `consent_hash_${i}`,
        categories: { essential: true, analytics: i % 2 === 0, marketing: false, functional: i % 2 === 0 },
        action: i % 3 === 0 ? 'revoked' : 'granted',
        createdAt: new Date(Date.now() - i * 86400000),
      },
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('Database seeded successfully.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
