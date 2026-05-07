'use client'

import { Bell, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useUIStore } from '@/store/useUIStore'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { getInitials } from '@/lib/utils'
import Link from 'next/link'

/** Header reads user from session hook — no prop needed. */
export function Header() {
  const { unreadCount, setCommandOpen } = useUIStore()
  const { user } = useCurrentUser()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'oklch(from var(--color-bg) l c h / 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid oklch(from var(--color-text) l c h / 0.08)',
        padding: '0 var(--space-6)',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <Link
          href="/dashboard"
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--color-text)',
            textDecoration: 'none',
          }}
        >
          SaasStarter
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <button
          onClick={() => setCommandOpen(true)}
          aria-label="Open search (Cmd+K)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--color-surface-2)',
            border: '1px solid oklch(from var(--color-text) l c h / 0.08)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-xs)',
            cursor: 'pointer',
            minWidth: 160,
          }}
        >
          <Search size={14} aria-hidden="true" />
          <span>Search…</span>
          <kbd
            style={{
              marginLeft: 'auto',
              fontSize: 10,
              padding: '1px 5px',
              background: 'var(--color-surface-offset)',
              borderRadius: 4,
              color: 'var(--color-text-faint)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        <div style={{ position: 'relative' }}>
          <button
            aria-label={`Notifications — ${unreadCount} unread`}
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            <Bell size={18} aria-hidden="true" />
          </button>
          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--color-error)',
                border: '2px solid var(--color-bg)',
              }}
            />
          )}
        </div>

        <ThemeToggle />

        <Link
          href="/settings"
          aria-label="Account settings"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: '#fff',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          {getInitials(user?.name ?? user?.email ?? 'U')}
        </Link>
      </div>
    </header>
  )
}
