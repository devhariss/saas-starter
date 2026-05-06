import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'All your projects in one place.',
};

const projects = [
  { id: '1', name: 'API Gateway', status: 'active', updatedAt: '2026-05-04', members: 3 },
  { id: '2', name: 'Auth Service', status: 'active', updatedAt: '2026-05-02', members: 2 },
  { id: '3', name: 'Analytics Dashboard', status: 'active', updatedAt: '2026-04-28', members: 4 },
  { id: '4', name: 'Legacy Import Tool', status: 'archived', updatedAt: '2026-03-15', members: 1 },
];

export default function ProjectsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--color-text)',
          }}
        >
          Projects
        </h1>
        <button
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-4)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          New project
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-6)',
              textDecoration: 'none',
              transition: 'background var(--transition-interactive)',
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {project.name}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Updated{' '}
                {new Date(project.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                &nbsp;&middot;&nbsp;{project.members} member{project.members !== 1 ? 's' : ''}
              </p>
            </div>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                padding: '2px 10px',
                borderRadius: 'var(--radius-full)',
                background:
                  project.status === 'active'
                    ? 'oklch(from var(--color-success) l c h / 0.12)'
                    : 'oklch(from var(--color-text-muted) l c h / 0.12)',
                color:
                  project.status === 'active' ? 'var(--color-success)' : 'var(--color-text-muted)',
              }}
            >
              {project.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
