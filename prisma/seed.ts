import { PrismaClient, UserRole, TeamMemberRole, ProjectStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saas-starter.dev' },
    update: {},
    create: {
      name: 'Alex Admin',
      email: 'admin@saas-starter.dev',
      role: UserRole.ADMIN,
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
      role: UserRole.USER,
      emailVerified: new Date(),
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Kumar',
      email: 'bob@example.com',
      role: UserRole.USER,
      emailVerified: new Date(),
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
      members: {
        create: [
          { userId: alice.id, role: TeamMemberRole.OWNER },
          { userId: bob.id, role: TeamMemberRole.MEMBER },
        ],
      },
    },
  })

  // Subscription for Alice
  await prisma.subscription.upsert({
    where: { userId: alice.id },
    update: {},
    create: {
      userId: alice.id,
      stripeCustomerId: 'cus_demo_alice',
      stripePriceId: 'price_demo_pro',
      stripeSubscriptionId: 'sub_demo_alice',
      status: 'active',
      currentPeriodStart: new Date('2026-05-01'),
      currentPeriodEnd: new Date('2026-06-01'),
      cancelAtPeriodEnd: false,
    },
  })

  // Projects
  const projectData = [
    { name: 'Customer Portal', slug: 'customer-portal', description: 'Self-service portal for enterprise clients', status: ProjectStatus.active },
    { name: 'Analytics Dashboard', slug: 'analytics-dashboard', description: 'Real-time metrics and reporting', status: ProjectStatus.active },
    { name: 'Legacy API', slug: 'legacy-api', description: 'V1 REST API — migration in progress', status: ProjectStatus.archived },
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
    { action: 'SIGN_IN', resource: 'auth', resourceId: alice.id },
    { action: 'PROJECT_CREATED', resource: 'project', resourceId: 'customer-portal' },
    { action: 'SUBSCRIPTION_UPGRADED', resource: 'subscription', resourceId: 'sub_demo_alice' },
    { action: 'TEAM_MEMBER_INVITED', resource: 'team', resourceId: team.id },
    { action: 'INVOICE_PAID', resource: 'billing', resourceId: 'inv_demo_001' },
    { action: 'SETTINGS_UPDATED', resource: 'user', resourceId: alice.id },
    { action: 'SIGN_IN', resource: 'auth', resourceId: bob.id },
    { action: 'PROJECT_CREATED', resource: 'project', resourceId: 'analytics-dashboard' },
    { action: 'PASSWORD_CHANGED', resource: 'auth', resourceId: bob.id },
    { action: 'SIGN_IN', resource: 'auth', resourceId: admin.id },
  ]

  for (let i = 0; i < auditActions.length; i++) {
    const log = auditActions[i]
    await prisma.auditLog.create({
      data: {
        userId: i % 2 === 0 ? alice.id : bob.id,
        action: log.action,
        resource: log.resource,
        resourceId: log.resourceId,
        metadata: {},
        ipHash: 'hash_demo_' + i,
        createdAt: new Date(Date.now() - i * 3600000),
      },
    })
  }

  // Consent logs
  const ipHashes = ['hash_ip_001', 'hash_ip_002', 'hash_ip_003', 'hash_ip_004', 'hash_ip_005']
  for (let i = 0; i < ipHashes.length; i++) {
    await prisma.consentLog.create({
      data: {
        ipHash: ipHashes[i],
        categories: { essential: true, analytics: i % 2 === 0, marketing: false, functional: i % 3 === 0 },
        action: 'granted',
        createdAt: new Date(Date.now() - i * 86400000),
      },
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('Seed complete — admin, alice, bob, 1 team, 3 projects, 1 subscription')
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
