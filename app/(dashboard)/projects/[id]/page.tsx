import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  return { title: `Project ${id}` }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main id="main-content" style={{ padding: 'var(--space-8)' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 600,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Project #{id}
      </h1>
      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-muted)',
        }}
      >
        Project detail view. Connect to your Prisma DB to load real project
        data.
      </p>
    </main>
  )
}
