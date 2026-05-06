import { PrismaClient, UserRole, SubscriptionStatus, ProjectStatus, TeamMemberRole, ConsentAction } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@saas-starter.dev" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@saas-starter.dev",
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  });

  // Regular users
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      name: "Alice Johnson",
      email: "alice@example.com",
      role: UserRole.USER,
      emailVerified: new Date(),
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob Smith",
      email: "bob@example.com",
      role: UserRole.USER,
      emailVerified: new Date(),
    },
  });

  // Subscription for Alice
  await prisma.subscription.upsert({
    where: { userId: alice.id },
    update: {},
    create: {
      userId: alice.id,
      stripeCustomerId: "cus_demo_alice",
      stripePriceId: "price_demo_pro",
      stripeSubscriptionId: "sub_demo_alice",
      status: SubscriptionStatus.active,
      currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    },
  });

  // Team
  const team = await prisma.team.upsert({
    where: { slug: "acme-corp" },
    update: {},
    create: {
      name: "Acme Corp",
      slug: "acme-corp",
      ownerId: alice.id,
      members: {
        create: [
          { userId: alice.id, role: TeamMemberRole.OWNER },
          { userId: bob.id, role: TeamMemberRole.MEMBER },
        ],
      },
    },
  });

  // Projects
  const projectNames = [
    { name: "Marketing Site", slug: "marketing-site", userId: alice.id, teamId: team.id },
    { name: "API Backend", slug: "api-backend", userId: alice.id, teamId: team.id },
    { name: "Mobile App", slug: "mobile-app", userId: bob.id, teamId: null },
  ];

  for (const p of projectNames) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: `The ${p.name} project`,
        userId: p.userId,
        teamId: p.teamId,
        status: ProjectStatus.active,
      },
    });
  }

  // Audit logs
  const auditEntries = [
    { userId: alice.id, action: "user.signin", resource: "session", metadata: { provider: "google" } },
    { userId: alice.id, action: "project.created", resource: "project", metadata: { name: "Marketing Site" } },
    { userId: bob.id, action: "user.signin", resource: "session", metadata: { provider: "github" } },
    { userId: alice.id, action: "subscription.activated", resource: "subscription", metadata: { plan: "pro" } },
    { userId: admin.id, action: "admin.login", resource: "session", metadata: {} },
    { userId: alice.id, action: "project.created", resource: "project", metadata: { name: "API Backend" } },
    { userId: bob.id, action: "project.created", resource: "project", metadata: { name: "Mobile App" } },
    { userId: alice.id, action: "team.invite_sent", resource: "team", metadata: { invitee: "bob@example.com" } },
    { userId: bob.id, action: "team.joined", resource: "team", metadata: { teamName: "Acme Corp" } },
    { userId: alice.id, action: "settings.updated", resource: "user", metadata: { field: "name" } },
  ];

  for (const entry of auditEntries) {
    await prisma.auditLog.create({
      data: {
        ...entry,
        ipHash: "a3b4c5d6e7f8a1b2c3d4e5f6a7b8c9d0",
      },
    });
  }

  // Consent logs
  const consentEntries = [
    { ipHash: "hash_001", categories: { essential: true, analytics: true, marketing: false, functional: true }, action: ConsentAction.granted },
    { ipHash: "hash_002", categories: { essential: true, analytics: false, marketing: false, functional: false }, action: ConsentAction.granted },
    { ipHash: "hash_003", categories: { essential: true, analytics: true, marketing: true, functional: true }, action: ConsentAction.granted },
    { ipHash: "hash_004", categories: { essential: true, analytics: true, marketing: false, functional: false }, action: ConsentAction.revoked },
    { ipHash: "hash_005", categories: { essential: true, analytics: false, marketing: false, functional: false }, action: ConsentAction.granted },
  ];

  for (const entry of consentEntries) {
    await prisma.consentLog.create({ data: entry });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("✅ Seed completed:", { admin: admin.email, alice: alice.email, bob: bob.email, team: team.slug });
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
