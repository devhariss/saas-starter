interface SkeletonCardProps {
  lines?: number;
  showAvatar?: boolean;
}

export function SkeletonCard({ lines = 3, showAvatar = false }: SkeletonCardProps) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      style={{
        padding: "var(--space-4)",
        background: "var(--color-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
      }}
    >
      {showAvatar && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
          <div
            className="skeleton skeleton-avatar"
            style={{ width: 40, height: 40, borderRadius: "var(--radius-full)", background: "var(--color-surface-offset)" }}
          />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ height: "0.875rem", width: "40%", marginBottom: "var(--space-1)", borderRadius: "var(--radius-sm)" }} />
            <div className="skeleton" style={{ height: "0.75rem", width: "25%", borderRadius: "var(--radius-sm)" }} />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            height: "0.875rem",
            width: i === lines - 1 ? "60%" : "100%",
            marginBottom: i < lines - 1 ? "var(--space-2)" : 0,
            borderRadius: "var(--radius-sm)",
            background: "var(--color-surface-offset)",
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
