import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Projects' }

const DEMO_PROJECTS = [
  { id: '1', name: 'Marketing Site Revamp', slug: 'marketing-site-revamp', status: 'active', updatedAt: '2 hours ago' },
  { id: '2', name: 'API v2 Launch', slug: 'api-v2-launch', status: 'active', updatedAt: '1 day ago' },
  { id: '3', name: 'Mobile App Beta', slug: 'mobile-app-beta', status: 'archived', updatedAt: '3 weeks ago' },
]

export default function ProjectsPage() {
  return (
    <main id="main-content" style={{ padding: 'var(--space-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)' }}>Projects</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>{DEMO_PROJECTS.length} projects</p>
        </div>
        <button style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 500 }} aria-label="Create a new project">New project</button>
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
        {DEMO_PROJECTS.map(p => (
          <Link key={p.id} href={`/projects/${p.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid oklch(from var(--color-text) l c h / 0.08)', background: 'var(--color-surface)', textDecoration: 'none', transition: 'box-shadow 0.15s ease' }}>
            <div>
              <p style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--color-text)' }}>{p.name}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>Updated {p.updatedAt}</p>
            </div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: p.status === 'active' ? 'oklch(from var(--color-success) l c h / 0.12)' : 'oklch(from var(--color-text-muted) l c h / 0.10)', color: p.status === 'active' ? 'var(--color-success)' : 'var(--color-text-muted)' }}>{p.status}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
