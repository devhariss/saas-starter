'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  BarChart2,
  Users,
  Settings2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings2 },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen border-r border-[oklch(from_var(--color-text)_l_c_h_/_0.10)] bg-[var(--color-surface)] transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-[oklch(from_var(--color-text)_l_c_h_/_0.08)]', collapsed && 'justify-center')}>
        <Link href="/dashboard" aria-label="SaasStarter home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="11" height="11" rx="2" fill="currentColor" className="text-[var(--color-primary)]" />
            <rect x="15" y="2" width="11" height="11" rx="2" fill="currentColor" className="opacity-40 text-[var(--color-primary)]" />
            <rect x="2" y="15" width="11" height="11" rx="2" fill="currentColor" className="opacity-40 text-[var(--color-primary)]" />
            <rect x="15" y="15" width="11" height="11" rx="2" fill="currentColor" className="opacity-20 text-[var(--color-primary)]" />
          </svg>
        </Link>
        {!collapsed && (
          <span className="ml-2 font-semibold text-[var(--color-text)] text-sm tracking-tight">
            SaasStarter
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto" aria-label="Sidebar navigation">
        <ul role="list" className="space-y-0.5 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors',
                    active
                      ? 'bg-[oklch(from_var(--color-primary)_l_c_h_/_0.10)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
                  )}
                >
                  <Icon size={18} aria-hidden="true" className="shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className={cn('border-t border-[oklch(from_var(--color-text)_l_c_h_/_0.08)] p-3', collapsed ? 'flex flex-col items-center gap-2' : '')}>
        {!collapsed && session?.user && (
          <div className="flex items-center gap-3 mb-2 px-1">
            <div className="size-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[var(--color-text)] truncate">{session.user.name}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--color-primary)] bg-[oklch(from_var(--color-primary)_l_c_h_/_0.10)] px-1.5 py-0.5 rounded-full">
                <Zap size={9} aria-hidden="true" />Pro
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          aria-label="Sign out"
          className={cn(
            'flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors rounded-[var(--radius-md)] px-3 py-2 w-full',
            collapsed && 'justify-center px-0 w-auto'
          )}
        >
          <LogOut size={15} aria-hidden="true" />
          {!collapsed && 'Sign out'}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-20 size-6 rounded-full bg-[var(--color-surface)] border border-[oklch(from_var(--color-text)_l_c_h_/_0.12)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] shadow-sm transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} aria-hidden="true" /> : <ChevronLeft size={12} aria-hidden="true" />}
      </button>
    </aside>
  )
}
