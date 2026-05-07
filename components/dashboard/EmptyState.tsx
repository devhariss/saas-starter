import { FolderOpen } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Create your first item to get started.',
  actionLabel = 'Get started',
  actionHref = '#',
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-8 text-center rounded-[var(--radius-lg)] border border-dashed border-[oklch(from_var(--color-text)_l_c_h_/_0.15)] bg-[var(--color-surface)]"
      role="status"
    >
      <FolderOpen
        size={40}
        className="text-[var(--color-text-faint)] mb-4"
        aria-hidden="true"
      />
      <h3 className="text-sm font-semibold text-[var(--color-text)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-xs mb-6">{description}</p>
      <Link
        href={actionHref}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        {actionLabel}
      </Link>
    </div>
  )
}
