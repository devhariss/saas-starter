import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Project' };

const projects: Record<string, { name: string; description: string; status: string; createdAt: string }> = {
  '1': { name: 'API Gateway', description: 'Central API routing and rate limiting service.', status: 'active', createdAt: '2026-01-15' },
  '2': { name: 'Auth Service', description: 'Authentication microservice built with NextAuth v5.', status: 'active', createdAt: '2026-02-10' },
  '3': { name: 'Analytics Dashboard', description: 'Real-time product analytics with Recharts.', status: 'active', createdAt: '2026-03-05' },
  '4': { name: 'Legacy Import Tool', description: 'One-time data migration utility.', status: 'archived', createdAt: '2025-11-01' },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects[id];
  if (!project) notFound();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {project.name}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          {project.description}
        </p>
      </div>
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
        }}
      >
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          Status: <strong style={{ color: 'var(--color-text)' }}>{project.status}</strong>
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
          Created:{' '}
          <strong style={{ color: 'var(--color-text)' }}>
            {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </strong>
        </p>
      </div>
    </div>
  );
}
