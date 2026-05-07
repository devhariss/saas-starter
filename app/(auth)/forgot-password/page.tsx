import type { Metadata } from 'next'
import Link from 'next/link'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset your SaasStarter account password.',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--color-bg)' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
          Reset your password
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
          Enter your email and we&apos;ll send you a magic link to sign in.
        </p>
        <ForgotPasswordForm />
        <p style={{ marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          <Link href="/login" style={{ color: 'var(--color-primary)' }}>← Back to sign in</Link>
        </p>
      </div>
    </main>
  )
}
