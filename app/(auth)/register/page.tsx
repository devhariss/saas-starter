import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create your free SaasStarter account.',
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: 'var(--color-surface)', borderRight: '1px solid oklch(from var(--color-text) l c h / 0.08)' }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', fontSize: 'var(--text-lg)' }}>
          SaasStarter
        </div>
        <div>
          <p style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)', color: 'var(--color-text)', lineHeight: 1.3, marginBottom: 'var(--space-4)' }}>
            Ship your SaaS in days,<br />not months.
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', maxWidth: '36ch' }}>
            A production-ready Next.js 15 starter with auth, billing, and analytics. Start building immediately.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {['No credit card required', '30-day money-back guarantee', 'Cancel anytime'].map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f}
            </div>
          ))}
        </div>
      </div>
      <main id="main-content" className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{ background: 'var(--color-bg)' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
            Create your account
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
          </p>
          <RegisterForm />
        </div>
      </main>
    </div>
  )
}
