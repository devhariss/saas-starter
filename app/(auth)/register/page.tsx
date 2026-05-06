import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create your free SaasStarter account.',
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div
        className="hidden lg:flex flex-col justify-between p-12"
        style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            color: 'var(--color-text)',
          }}
        >
          SaasStarter
        </span>
        <div>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Ship your SaaS in days, not months.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            Production-ready starter with auth, billing, and analytics already wired up.
          </p>
        </div>
        <div />
      </div>
      <div
        className="flex items-center justify-center p-6 lg:p-12"
        style={{ background: 'var(--color-bg)' }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Create your account
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              Free forever. No credit card required.
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
