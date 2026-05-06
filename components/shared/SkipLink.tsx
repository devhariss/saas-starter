export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100%',
        left: 'var(--space-4)',
        zIndex: 9999,
        padding: 'var(--space-3) var(--space-6)',
        background: 'var(--color-primary)',
        color: '#fff',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'top 0.15s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = 'var(--space-4)'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100%'
      }}
    >
      Skip to main content
    </a>
  )
}
