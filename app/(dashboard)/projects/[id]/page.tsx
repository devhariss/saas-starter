import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Project detail' }

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <main id="main-content" style={{ padding: 'var(--space-8)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>Project #{params.id}</h1>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)' }}>Project detail view. Connect to your Prisma DB to load real project data.</p>
    </main>
  )
}
