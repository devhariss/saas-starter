import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="SaasStarter home"
      style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", textDecoration: "none" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
        <path
          d="M8 22L14 10L20 18L23 14L26 22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="10" r="2" fill="currentColor" />
        <circle cx="20" cy="18" r="1.5" fill="currentColor" />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "var(--text-sm)",
          color: "var(--color-text)",
          letterSpacing: "-0.01em",
        }}
      >
        SaasStarter
      </span>
    </Link>
  );
}
