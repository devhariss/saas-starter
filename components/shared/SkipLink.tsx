export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only"
      style={{
        position: "fixed",
        top: "var(--space-4)",
        left: "var(--space-4)",
        zIndex: 9999,
        padding: "var(--space-2) var(--space-4)",
        background: "var(--color-primary)",
        color: "white",
        borderRadius: "var(--radius-md)",
        fontWeight: 600,
        fontSize: "var(--text-sm)",
        textDecoration: "none",
      }}
    >
      Skip to main content
    </a>
  );
}
