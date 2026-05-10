# 🚀 SaaS Starter

A **production-ready Next.js 15 SaaS boilerplate** with everything you need to ship fast — auth, billing, email, compliance, analytics, and a beautiful dark-first UI. Stop building infrastructure. Start building your product.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=flat-square&logo=prisma)
![Stripe](https://img.shields.io/badge/Stripe-billing-635BFF?style=flat-square&logo=stripe)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- **Authentication** — NextAuth v5 (Auth.js) with Google & GitHub OAuth + credentials
- **Database** — PostgreSQL via Prisma ORM, compatible with Neon & Supabase
- **Stripe Billing** — Pro & Team subscription tiers with webhook handling
- **Transactional Email** — Resend + React Email templates
- **Compliance** — GDPR / CCPA / DPDPA consent logging with SHA-256 IP hashing
- **Analytics** — PostHog (consent-gated, privacy-friendly)
- **Dark-first UI** — Radix UI primitives + Tailwind CSS + `next-themes`
- **State management** — Zustand + TanStack Query
- **Forms** — React Hook Form + Zod validation
- **Charts** — Recharts for dashboard analytics
- **SEO** — Auto-generated sitemap, robots.txt, and PWA manifest
- **Lighthouse 100** — Performance, accessibility, best practices, SEO all targeted at 100
- **Testing** — Vitest (unit), Playwright + axe-core (e2e + accessibility)
- **Code quality** — ESLint, Prettier, Husky git hooks, lint-staged

---

## 🗂️ Project Structure

```
saas-starter/
├── app/
│   ├── (auth)/          # Login, register, forgot password pages
│   ├── (dashboard)/     # Protected app pages for logged-in users
│   ├── (marketing)/     # Landing page, pricing, features
│   ├── (legal)/         # Privacy policy, terms of service, cookie policy
│   └── api/             # API routes (auth, stripe webhooks, etc.)
├── components/          # Reusable UI components (shadcn/ui style)
├── emails/              # React Email templates
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, Stripe, Prisma client, auth config
├── prisma/              # Database schema & migrations
├── store/               # Zustand global state
└── types/               # TypeScript type definitions
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database (or a free [Neon](https://neon.tech) / [Supabase](https://supabase.com) instance)
- Stripe account
- Resend account
- Google & GitHub OAuth apps (optional but recommended)

### 1. Clone the repo

```bash
git clone https://github.com/devhariss/saas-starter.git
cd saas-starter
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in all the required values in `.env.local` (see [Environment Variables](#-environment-variables) below).

### 3. Set up the database

```bash
npm run db:migrate    # Run migrations
npm run db:seed       # (Optional) Seed demo data
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live! 🎉

---

## 🔑 Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SaasStarter

# Database
DATABASE_URL=postgresql://user:password@host:5432/saas_starter?sslmode=require

# Auth (generate secret: openssl rand -base64 32)
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_PRICE_ID=price_...

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourcompany.com

# Compliance
CONSENT_LOG_SALT=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 💳 Stripe Setup

1. Create two products in your [Stripe Dashboard](https://dashboard.stripe.com/products) — **Pro** and **Team**
2. Copy the **Price IDs** (starting with `price_`) into your `.env.local`
3. Set up a webhook endpoint pointing to `https://yourdomain.com/api/stripe/webhook`
4. Add the following events to your webhook: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

To test webhooks locally, use the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 🧪 Testing

```bash
npm run test          # Unit tests (Vitest)
npm run test:watch    # Unit tests in watch mode
npm run test:e2e      # End-to-end tests (Playwright)
npm run typecheck     # TypeScript type checking
npm run lint          # ESLint
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/devhariss/saas-starter)

1. Push your repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

This is a standard Next.js app — it deploys to any platform that supports Node.js: Railway, Render, Fly.io, AWS, etc.

---

## 📦 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 4.x + Radix UI |
| Database | PostgreSQL + Prisma 6 |
| Auth | NextAuth v5 (Auth.js) |
| Payments | Stripe |
| Email | Resend + React Email |
| State | Zustand + TanStack Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Testing | Vitest + Playwright |
| Analytics | PostHog |

---

## 🛠️ Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run analyze       # Analyze bundle size
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to DB (no migrations)
npm run db:migrate    # Run migrations
npm run db:seed       # Seed the database
```

---

## 📄 License

MIT — feel free to use this for your own SaaS products.

---

Built with ❤️ by [Mohammed Hariss](https://github.com/devhariss)
