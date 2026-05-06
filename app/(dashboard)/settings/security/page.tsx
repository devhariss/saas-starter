import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings — Security' };

export default function SecurityPage() {
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
        Security
      </h1>
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', fontSize: 'var(--text-base)' }}>Change password</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          If you signed in with OAuth (Google or GitHub), you don&apos;t have a password set.
          You can add one or use magic link to sign in.
        </p>
        <button
          style={{
            alignSelf: 'flex-start',
            background: 'var(--color-surface-offset)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-6)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          Send magic link
        </button>
      </div>
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Two-factor authentication</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          2FA adds an extra layer of security. Coming soon.
        </p>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            background: 'oklch(from var(--color-warning) l c h / 0.12)',
            color: 'var(--color-warning)',
            fontWeight: 500,
          }}
        >
          Coming soon
        </span>
      </div>
    </div>
  );
}
