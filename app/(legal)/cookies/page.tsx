import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How SaasStarter uses cookies and how you can manage them.',
};

const cookies = [
  { name: '__session', provider: 'SaasStarter', category: 'Essential', purpose: 'Stores your authenticated session token', duration: 'Session' },
  { name: 'csrf_token', provider: 'SaasStarter', category: 'Essential', purpose: 'Protects against cross-site request forgery', duration: 'Session' },
  { name: 'consent_state', provider: 'SaasStarter', category: 'Essential', purpose: 'Stores your cookie consent preferences', duration: '365 days' },
  { name: 'consent_date', provider: 'SaasStarter', category: 'Essential', purpose: 'Stores when consent was last given', duration: '365 days' },
  { name: 'gpc_detected', provider: 'SaasStarter', category: 'Essential', purpose: 'Records Global Privacy Control detection', duration: 'Session' },
  { name: 'ph_*', provider: 'PostHog', category: 'Analytics', purpose: 'Product analytics - session and event tracking', duration: '1 year' },
];

export default function CookiesPage() {
  return (
    <article
      style={{
        maxWidth: '960px',
        marginInline: 'auto',
        paddingInline: 'var(--space-6)',
        paddingBlock: 'var(--space-24)',
        color: 'var(--color-text)',
        fontSize: 'var(--text-base)',
        lineHeight: 1.8,
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          marginBottom: 'var(--space-2)',
        }}
      >
        Cookie Policy
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-10)' }}>
        Version 1.0 &mdash; Effective date: 1 May 2026
      </p>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They allow the site to
          remember information about your visit, such as your preferred language and login state.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-6)' }}>Cookie inventory</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['Name', 'Provider', 'Category', 'Purpose', 'Duration'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      textAlign: 'left',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cookies.map((c) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'monospace', color: 'var(--color-primary)', fontSize: 'var(--text-xs)' }}>{c.name}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>{c.provider}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 500,
                        background: c.category === 'Essential' ? 'oklch(from var(--color-success) l c h / 0.12)' : 'oklch(from var(--color-primary) l c h / 0.12)',
                        color: c.category === 'Essential' ? 'var(--color-success)' : 'var(--color-primary)',
                      }}
                    >
                      {c.category}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-muted)' }}>{c.purpose}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', whiteSpace: 'nowrap', color: 'var(--color-text-muted)' }}>{c.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Third-party cookies</h2>
        <p>
          We currently use no third-party advertising or tracking cookies. PostHog analytics cookies are
          only set if you have granted analytics consent.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Managing cookies</h2>
        <p style={{ marginBottom: 'var(--space-3)' }}>
          You can manage your cookie preferences at any time via our{' '}
          <a href="#" style={{ color: 'var(--color-primary)' }} id="open-cookie-preferences">
            cookie preferences centre
          </a>.
          You can also control cookies through your browser settings:
        </p>
        <ul style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              Safari
            </a>
          </li>
          <li>
            <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              Edge
            </a>
          </li>
        </ul>
        <p style={{ marginTop: 'var(--space-4)' }}>
          Note that disabling essential cookies will prevent the Service from functioning correctly.
        </p>
      </section>
    </article>
  );
}
