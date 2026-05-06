export function Features() {
  return (
    <section id="features" className="py-24 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12">
          <p className="text-[var(--text-sm)] font-medium text-[var(--color-primary)] mb-3">
            Built for speed
          </p>
          <h2
            className="font-display font-semibold text-[var(--color-text)] mb-4 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)" }}
          >
            Everything wired up on day one
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-text-muted)] max-w-[52ch]">
            Skip the boilerplate. Auth, billing, email, and compliance are
            production-ready. Your first commit ships features, not scaffolding.
          </p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Wide card: Auth */}
          <div className="md:col-span-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-sm)]">
            <p className="text-[var(--text-xs)] font-medium text-[var(--color-primary)] uppercase tracking-widest mb-3">
              Authentication
            </p>
            <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] mb-3">
              Auth in 5 minutes
            </h3>
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-6 max-w-[52ch]">
              NextAuth.js v5 ships with Google OAuth, GitHub OAuth, and
              passwordless magic links — all backed by Prisma with session
              persistence. No JWT juggling.
            </p>
            <pre className="rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-border)] p-4 text-[var(--text-xs)] text-[var(--color-text-muted)] overflow-x-auto">
              <code>{`// lib/auth.ts — already done
export const { auth, handlers, signIn, signOut } =
  NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub, Resend],
    session: { strategy: "database" },
  });`}</code>
            </pre>
          </div>

          {/* Tall card: Billing */}
          <div className="md:row-span-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-sm)]">
            <p className="text-[var(--text-xs)] font-medium text-[var(--color-secondary)] uppercase tracking-widest mb-3">
              Billing
            </p>
            <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] mb-3">
              Stripe billing, done.
            </h3>
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-6">
              Subscriptions, webhooks, the billing portal, and Stripe Tax are
              all hooked up. Upgrade/downgrade just works.
            </p>
            <ul className="space-y-3">
              {[
                "Checkout sessions with tax",
                "Webhook sync to Prisma",
                "Billing portal redirect",
                "Invoice emails via Resend",
                "Subscription status in session",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[var(--text-sm)] text-[var(--color-text-muted)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 flex-shrink-0 text-[var(--color-success)]"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Two small cards */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
            <p className="text-[var(--text-xs)] font-medium text-[var(--color-warning)] uppercase tracking-widest mb-3">
              Performance
            </p>
            <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text)] mb-2">
              100/100 Lighthouse
            </h3>
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
              Optimised for Core Web Vitals. Server components by default,
              dynamic imports, and ISR caching preconfigured.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
            <p className="text-[var(--text-xs)] font-medium text-[var(--color-success)] uppercase tracking-widest mb-3">
              Compliance
            </p>
            <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text)] mb-2">
              GDPR-ready out of the box
            </h3>
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
              Cookie consent with GPC detection, data export/delete endpoints,
              and full legal pages: Privacy Policy, ToS, Cookie Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
