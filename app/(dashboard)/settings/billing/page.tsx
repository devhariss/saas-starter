import type { Metadata } from 'next';
import { auth } from '@/lib/auth';

export const metadata: Metadata = { title: 'Settings — Billing' };

export default async function BillingPage() {
  const session = await auth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '640px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
        }}
      >
        Billing
      </h1>
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: 'var(--text-base)' }}>Pro Plan</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>$29 / month &middot; renews June 1, 2026</p>
          </div>
          <span
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'oklch(from var(--color-success) l c h / 0.12)',
              color: 'var(--color-success)',
            }}
          >
            Active
          </span>
        </div>
        <form action="/api/stripe/portal" method="POST">
          <input type="hidden" name="userId" value={session?.user?.id ?? ''} />
          <button
            type="submit"
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2) var(--space-6)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              cursor: 'pointer',
              minHeight: '44px',
            }}
          >
            Manage billing
          </button>
        </form>
      </div>
    </div>
  );
}
