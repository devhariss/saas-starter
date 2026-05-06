import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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

  const user1 = await prisma.user.upsert({
    where: { email: 'alex.johnson@example.com' },
    update: {},
    create: { name: 'Alex Johnson', email: 'alex.johnson@example.com', emailVerified: new Date() },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'maria.garcia@example.com' },
    update: {},
    create: { name: 'Maria Garcia', email: 'maria.garcia@example.com', emailVerified: new Date() },
  })

  const team = await prisma.team.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: { name: 'Acme Corp', slug: 'acme-corp', ownerId: admin.id },
  })

  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team.id, userId: admin.id } },
    update: {},
    create: { teamId: team.id, userId: admin.id, role: 'OWNER' },
  })

  await prisma.teamMember.upsert({
    where: { teamId_userId: { teamId: team.id, userId: user1.id } },
    update: {},
    create: { teamId: team.id, userId: user1.id, role: 'MEMBER' },
  })

  for (const proj of [
    { name: 'Marketing Site', slug: 'marketing-site', description: 'Company marketing website rebuild' },
    { name: 'API Gateway', slug: 'api-gateway', description: 'Internal API gateway service' },
    { name: 'Analytics Dashboard', slug: 'analytics-dashboard', description: 'Real-time analytics platform' },
  ]) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: { ...proj, userId: admin.id, teamId: team.id },
    })
  }

  await prisma.subscription.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      status: 'active',
      stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? 'price_demo',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  const auditActions = ['USER_CREATED', 'SIGN_IN', 'PROJECT_CREATED', 'SUBSCRIPTION_UPGRADED', 'INVOICE_PAID', 'SETTINGS_UPDATED', 'TEAM_MEMBER_INVITED', 'SIGN_IN', 'PROJECT_ARCHIVED', 'DATA_EXPORTED']
  for (let i = 0; i < 10; i++) {
    await prisma.auditLog.create({
      data: {
        userId: [admin.id, user1.id, user2.id][i % 3],
        action: auditActions[i],
        resource: 'user',
        resourceId: admin.id,
        metadata: { source: 'seed' },
        ipHash: `hash_${i}`,
        createdAt: new Date(Date.now() - i * 3600000),
      },
    })
  }

  for (let i = 0; i < 5; i++) {
    await prisma.consentLog.create({
      data: {
        ipHash: `consent_hash_${i}`,
        categories: { essential: true, analytics: i % 2 === 0, marketing: false, functional: true },
        action: i % 3 === 0 ? 'revoked' : 'granted',
        createdAt: new Date(Date.now() - i * 7200000),
      },
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Seed complete')
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
