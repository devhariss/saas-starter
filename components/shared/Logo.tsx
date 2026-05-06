import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SaasStarter logo"
      role="img"
      className={cn('text-[var(--color-primary)]', className)}
    >
      <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor" />
      <rect x="18" y="2" width="12" height="12" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="2" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="18" y="18" width="12" height="12" rx="3" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function LogoWithText({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Logo size={28} />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          color: 'var(--color-text)',
          letterSpacing: '-0.01em',
        }}
      >
        SaasStarter
      </span>
    </span>
  )
}
