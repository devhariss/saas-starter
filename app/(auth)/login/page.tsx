import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your SaasStarter account.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: 'var(--color-surface)', borderRight: '1px solid oklch(from var(--color-text) l c h / 0.08)' }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', fontSize: 'var(--text-lg)' }}>
          SaasStarter
        </div>
        <div>
          <blockquote style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-display)', color: 'var(--color-text)', lineHeight: 1.4, marginBottom: 'var(--space-4)' }}>
            &ldquo;We went from idea to live product in under a week. The auth, billing, and compliance were all pre-built.&rdquo;
          </blockquote>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            Priya Mehta &mdash; Co-founder, NexaFlow
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {['Auth in 5 minutes', 'Stripe billing included', 'GDPR & CCPA compliant'].map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f}
            </div>
          ))}
        </div>
      </div>
      {/* Right panel */}
      <main id="main-content" className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{ background: 'var(--color-bg)' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: 'var(--color-primary)' }}>Sign up free</Link>
          </p>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
