import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your SaasStarter account.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Sign in — SaasStarter',
        }}
      />
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left panel — dark brand side */}
        <div
          className="hidden lg:flex flex-col justify-between p-12"
          style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
          aria-hidden="true"
        >
          <div>
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
          </div>
          <div>
            <blockquote
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-display)',
                marginBottom: 'var(--space-4)',
              }}
            >
              &ldquo;We shipped our MVP in 3 days instead of 3 months. The auth and billing were already wired up.&rdquo;
            </blockquote>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              Priya Mehra · CTO at NexaFlow
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {['Auth in 5 minutes', 'Stripe billing wired up', 'Lighthouse 100 out of the box'].map(
              (feat) => (
                <div
                  key={feat}
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-text-muted)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="var(--color-primary)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{feat}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right panel — form */}
        <div
          className="flex items-center justify-center p-6 lg:p-12"
          style={{ background: 'var(--color-bg)' }}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
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
                Welcome back
              </h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                Sign in to continue to SaasStarter
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
