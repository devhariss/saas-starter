import { PrismaClient, Role, TeamRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saas-starter.dev' },
    update: {},
    create: {
      name: 'Alex Admin',
      email: 'admin@saas-starter.dev',
      role: Role.ADMIN,
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
      role: Role.USER,
      emailVerified: new Date(),
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Nakamura',
      email: 'bob@example.com',
      role: Role.USER,
      emailVerified: new Date(),
    },
  })

  // Subscription for alice
  await prisma.subscription.upsert({
    where: { userId: alice.id },
    update: {},
    create: {
      userId: alice.id,
      stripeCustomerId: 'cus_seed_alice',
      stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? 'price_seed_pro',
      stripeSubscriptionId: 'sub_seed_alice',
      status: 'active',
      currentPeriodStart: new Date('2026-04-01'),
      currentPeriodEnd: new Date('2026-05-01'),
      cancelAtPeriodEnd: false,
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
          { userId: alice.id, role: TeamRole.OWNER },
          { userId: bob.id, role: TeamRole.MEMBER },
        ],
      },
    },
  })

  // Projects
  const projectData = [
    { name: 'API Gateway', slug: 'api-gateway', description: 'Central API routing layer', userId: alice.id, teamId: team.id },
    { name: 'Analytics Dashboard', slug: 'analytics-dashboard', description: 'Real-time usage analytics', userId: alice.id, teamId: team.id },
    { name: 'Auth Service', slug: 'auth-service', description: 'OAuth + magic link authentication', userId: bob.id, teamId: team.id },
  ]

  for (const p of projectData) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, status: 'active' } })
  }

  // Audit logs
  const auditEvents = [
    { action: 'USER_SIGN_IN', resource: 'auth', resourceId: alice.id },
    { action: 'SUBSCRIPTION_CREATED', resource: 'subscription', resourceId: 'sub_seed_alice' },
    { action: 'PROJECT_CREATED', resource: 'project', resourceId: 'api-gateway' },
    { action: 'USER_SIGN_IN', resource: 'auth', resourceId: bob.id },
    { action: 'TEAM_MEMBER_ADDED', resource: 'team', resourceId: team.id },
    { action: 'PROJECT_CREATED', resource: 'project', resourceId: 'analytics-dashboard' },
    { action: 'INVOICE_PAID', resource: 'billing', resourceId: 'inv_seed_001' },
    { action: 'PROJECT_CREATED', resource: 'project', resourceId: 'auth-service' },
    { action: 'SETTINGS_UPDATED', resource: 'user', resourceId: alice.id },
    { action: 'USER_SIGN_IN', resource: 'auth', resourceId: alice.id },
  ]

  for (const event of auditEvents) {
    await prisma.auditLog.create({
      data: { ...event, userId: alice.id, metadata: {}, ipHash: 'seed_hash_placeholder' },
    })
  }

  // Consent logs
  const consentEntries = [
    { ipHash: 'hash_001', categories: { essential: true, analytics: true, marketing: false, functional: true }, action: 'granted' as const },
    { ipHash: 'hash_002', categories: { essential: true, analytics: false, marketing: false, functional: false }, action: 'granted' as const },
    { ipHash: 'hash_003', categories: { essential: true, analytics: true, marketing: true, functional: true }, action: 'granted' as const },
    { ipHash: 'hash_001', categories: { essential: true, analytics: false, marketing: false, functional: false }, action: 'revoked' as const },
    { ipHash: 'hash_004', categories: { essential: true, analytics: true, marketing: false, functional: false }, action: 'granted' as const },
  ]

  for (const entry of consentEntries) {
    await prisma.consentLog.create({ data: entry })
  }

  console.log('Seed complete ✓')
  console.log(`Admin: ${admin.email}`)
  console.log(`Users: ${alice.email}, ${bob.email}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
