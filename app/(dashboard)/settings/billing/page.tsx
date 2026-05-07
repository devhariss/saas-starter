import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Billing' }

export default function BillingPage() {
  return (
    <main id="main-content" style={{ padding: 'var(--space-8)', maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>Billing</h1>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>Manage your subscription and payment method.</p>
      <div style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid oklch(from var(--color-text) l c h / 0.08)', background: 'var(--color-surface)', marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div>
            <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text)' }}>Pro Plan</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>$29 / month &mdash; renews June 6, 2026</p>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'oklch(from var(--color-success) l c h / 0.12)', color: 'var(--color-success)' }}>Active</span>
        </div>
        <form action="/api/stripe/portal" method="POST">
          <button type="submit" style={{ padding: 'var(--space-2) var(--space-4)', border: '1px solid oklch(from var(--color-text) l c h / 0.15)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-text)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>Manage subscription</button>
        </form>
      </div>
    </main>
  )
}
