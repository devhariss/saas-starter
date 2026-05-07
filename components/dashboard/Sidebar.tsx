'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  BarChart2,
  Users,
  Settings2,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { LogoWithText, Logo } from '@/components/shared/Logo'
import { useUIStore } from '@/store/useUIStore'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { getInitials } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/team', label: 'Team', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings2 },
]

/** Sidebar reads user from session hook — no prop needed. */
export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { user } = useCurrentUser()

  return (
    <aside
      style={{
        width: sidebarCollapsed ? 64 : 240,
        minHeight: '100dvh',
        background: 'var(--color-surface)',
        borderRight: '1px solid oklch(from var(--color-text) l c h / 0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
      }}
      aria-label="Main navigation"
    >
      <div
        style={{
          padding: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid oklch(from var(--color-text) l c h / 0.08)',
          minHeight: 60,
        }}
      >
        {sidebarCollapsed ? <Logo size={24} /> : <LogoWithText />}
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            padding: 6,
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
          }}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav
        style={{ flex: 1, padding: 'var(--space-3)' }}
        aria-label="Dashboard navigation"
      >
        <ul
          role="list"
          style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  title={sidebarCollapsed ? label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    fontWeight: active ? 600 : 400,
                    color: active
                      ? 'var(--color-primary)'
                      : 'var(--color-text-muted)',
                    background: active
                      ? 'oklch(from var(--color-primary) l c h / 0.08)'
                      : 'transparent',
                    transition: 'background 0.15s, color 0.15s',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  }}
                >
                  <Icon size={18} aria-hidden="true" />
                  {!sidebarCollapsed && <span>{label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div
        style={{
          padding: 'var(--space-3)',
          borderTop: '1px solid oklch(from var(--color-text) l c h / 0.08)',
        }}
      >
        {!sidebarCollapsed && user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-2)',
              padding: 'var(--space-2)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {getInitials(user.name ?? user.email ?? 'U')}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.name}
              </p>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  background: 'oklch(from var(--color-primary) l c h / 0.12)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Pro
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          aria-label="Sign out"
          title={sidebarCollapsed ? 'Sign out' : undefined}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
          }}
        >
          <LogOut size={16} aria-hidden="true" />
          {!sidebarCollapsed && 'Sign out'}
        </button>
      </div>
    </aside>
  )
}
