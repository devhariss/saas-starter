import { PrismaClient, Role, TeamRole, ConsentAction } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@saas-starter.dev' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@saas-starter.dev',
      emailVerified: new Date(),
      role: Role.ADMIN,
    },
  })

  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      emailVerified: new Date(),
      role: Role.USER,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      emailVerified: new Date(),
      role: Role.USER,
    },
  })

  await prisma.subscription.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      stripeCustomerId: 'cus_demo_alice',
      stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? 'price_demo',
      stripeSubscriptionId: 'sub_demo_alice',
      status: 'active',
      currentPeriodStart: new Date('2026-04-01'),
      currentPeriodEnd: new Date('2026-05-01'),
    },
  })

  const team = await prisma.team.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme-corp',
      ownerId: user1.id,
    },
  })

  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team.id, userId: user1.id } },
    update: {},
    create: { teamId: team.id, userId: user1.id, role: TeamRole.OWNER },
  })

  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team.id, userId: user2.id } },
    update: {},
    create: { teamId: team.id, userId: user2.id, role: TeamRole.MEMBER },
  })

  const projectSlugs = ['saas-dashboard', 'marketing-site', 'api-backend']
  for (const slug of projectSlugs) {
    await prisma.project.upsert({
      where: { slug },
      update: {},
      create: {
        name: slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '),
        slug,
        description: `Demo project: ${slug}`,
        userId: user1.id,
        teamId: team.id,
        status: 'active',
      },
    })
  }

  const auditActions = [
    { action: 'sign_in', resource: 'session' },
    { action: 'project_created', resource: 'project' },
    { action: 'subscription_upgraded', resource: 'subscription' },
    { action: 'team_member_invited', resource: 'team' },
    { action: 'profile_updated', resource: 'user' },
    { action: 'sign_in', resource: 'session' },
    { action: 'invoice_paid', resource: 'invoice' },
    { action: 'project_created', resource: 'project' },
    { action: 'sign_in', resource: 'session' },
    { action: 'settings_updated', resource: 'user' },
  ]

  for (const entry of auditActions) {
    await prisma.auditLog.create({
      data: {
        userId: user1.id,
        action: entry.action,
        resource: entry.resource,
        resourceId: user1.id,
        metadata: {},
        ipHash: 'sha256_demo_hash',
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      },
    })
  }

  const consentEntries = [
    { action: ConsentAction.granted, categories: { essential: true, analytics: true, marketing: false, functional: true } },
    { action: ConsentAction.revoked, categories: { essential: true, analytics: false, marketing: false, functional: false } },
    { action: ConsentAction.granted, categories: { essential: true, analytics: true, marketing: true, functional: true } },
    { action: ConsentAction.granted, categories: { essential: true, analytics: false, marketing: false, functional: false } },
    { action: ConsentAction.revoked, categories: { essential: true, analytics: false, marketing: false, functional: false } },
  ]

  for (const entry of consentEntries) {
    await prisma.consentLog.create({
      data: {
        ipHash: 'sha256_demo_consent_hash',
        categories: entry.categories,
        action: entry.action,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      },
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Seed complete')
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
