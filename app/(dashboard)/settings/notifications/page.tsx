import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings — Notifications' };

const prefs = [
  { id: 'billing', label: 'Billing updates', description: 'Invoice paid, payment failed, plan changes' },
  { id: 'team', label: 'Team activity', description: 'New members, role changes, invitations' },
  { id: 'security', label: 'Security alerts', description: 'New login, password changed' },
  { id: 'product', label: 'Product updates', description: 'New features and release notes' },
];

export default function NotificationsPage() {
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
        Notifications
      </h1>
      <fieldset
        style={{
          border: 'none',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <legend className="sr-only">Email notification preferences</legend>
        {prefs.map((pref, i) => (
          <label
            key={pref.id}
            htmlFor={pref.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-4)',
              borderBottom: i < prefs.length - 1 ? '1px solid var(--color-border)' : 'none',
              cursor: 'pointer',
            }}
          >
            <div>
              <p style={{ fontWeight: 500, color: 'var(--color-text)', fontSize: 'var(--text-sm)' }}>{pref.label}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>{pref.description}</p>
            </div>
            <input
              id={pref.id}
              type="checkbox"
              defaultChecked
              style={{ width: '44px', height: '44px', accentColor: 'var(--color-primary)' }}
            />
          </label>
        ))}
      </fieldset>
    </div>
  );
}
