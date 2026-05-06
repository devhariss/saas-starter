import { FolderOpen } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: 'var(--space-16) var(--space-8)',
        color: 'var(--color-text-muted)',
      }}
      role="status"
    >
      <FolderOpen size={48} style={{ color: 'var(--color-text-faint)', marginBottom: 'var(--space-4)' }} aria-hidden="true" />
      <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>{title}</h3>
      <p style={{ fontSize: 'var(--text-sm)', maxWidth: '36ch', marginBottom: actionLabel ? 'var(--space-6)' : 0 }}>{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          style={{
            display: 'inline-block', padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-primary)', color: '#fff',
            borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)',
            fontWeight: 600, textDecoration: 'none',
          }}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
