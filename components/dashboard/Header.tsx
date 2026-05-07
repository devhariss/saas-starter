'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Search, ChevronRight, Home } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

interface BreadcrumbItem { label: string; href?: string }

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[]
}

export default function Header({ breadcrumbs = [] }: HeaderProps) {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <header className="sticky top-0 z-40 h-14 flex items-center justify-between gap-4 px-4 md:px-6 bg-[var(--color-surface)] border-b border-[oklch(from_var(--color-text)_l_c_h_/_0.08)]">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] min-w-0">
        <Link href="/dashboard" aria-label="Dashboard home" className="hover:text-[var(--color-text)] transition-colors">
          <Home size={14} aria-hidden="true" />
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1 min-w-0">
            <ChevronRight size={12} aria-hidden="true" className="shrink-0" />
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[var(--color-text)] transition-colors truncate">{crumb.label}</Link>
            ) : (
              <span className="text-[var(--color-text)] font-medium truncate" aria-current="page">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <button
          aria-label="Open search (Ctrl+K)"
          onClick={() => {}}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-2)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.10)] rounded-[var(--radius-md)] hover:border-[var(--color-primary)] transition-colors"
        >
          <Search size={13} aria-hidden="true" />
          Search
          <kbd className="ml-1 px-1 py-0.5 text-[10px] bg-[var(--color-surface-offset)] rounded font-mono">⌘K</kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            aria-label="Notifications (3 unread)"
            className="relative size-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            <Bell size={17} aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[var(--color-primary)]"
            />
          </button>
        </div>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User menu */}
        <div className="relative">
          <button
            aria-label="User menu"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen(o => !o)}
            className="size-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            {initials}
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} aria-hidden="true" />
              <div
                role="menu"
                aria-label="User menu"
                className="absolute right-0 top-11 z-50 w-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.10)] shadow-lg py-1"
              >
                {session?.user && (
                  <div className="px-3 py-2 border-b border-[oklch(from_var(--color-text)_l_c_h_/_0.08)]">
                    <p className="text-xs font-medium text-[var(--color-text)] truncate">{session.user.name}</p>
                    <p className="text-[11px] text-[var(--color-text-muted)] truncate">{session.user.email}</p>
                  </div>
                )}
                {[
                  { label: 'Profile', href: '/settings' },
                  { label: 'Billing', href: '/settings/billing' },
                  { label: 'Security', href: '/settings/security' },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-[oklch(from_var(--color-text)_l_c_h_/_0.08)] mt-1 pt-1">
                  <button
                    role="menuitem"
                    onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/login' }) }}
                    className="w-full text-left px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-surface-2)] transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
