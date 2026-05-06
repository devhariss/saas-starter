import type { Metadata } from 'next';
import { auth } from '@/lib/auth';

export const metadata: Metadata = { title: 'Settings — Profile' };

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: '640px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
        }}
      >
        Profile
      </h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <label
            htmlFor="name"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            defaultValue={user?.name ?? ''}
            style={{
              padding: 'var(--space-3)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text)',
              width: '100%',
              minHeight: '44px',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <label
            htmlFor="email"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            defaultValue={user?.email ?? ''}
            disabled
            style={{
              padding: 'var(--space-3)',
              background: 'var(--color-surface-offset)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              width: '100%',
              minHeight: '44px',
              cursor: 'not-allowed',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
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
          Save changes
        </button>
      </form>
    </div>
  );
}
