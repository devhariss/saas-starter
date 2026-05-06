export function SocialProof() {
  const logos = [
    { name: "Acme Corp", initials: "AC" },
    { name: "NexaFlow", initials: "NF" },
    { name: "TrustLayer", initials: "TL" },
    { name: "Gridcraft", initials: "GC" },
    { name: "Vaultify", initials: "VF" },
  ];

  const testimonials = [
    {
      quote:
        "We went from idea to paying customers in 11 days. The auth and billing setup alone saved us a week of work.",
      name: "Sarah Chen",
      role: "CTO at NexaFlow",
      initials: "SC",
    },
    {
      quote:
        "The Lighthouse scores are real. Zero regressions in production. This is the template I wish I had three startups ago.",
      name: "Marcus Reid",
      role: "Founder at Gridcraft",
      initials: "MR",
    },
    {
      quote:
        "GDPR compliance was the part I was dreading most. It's just done. Cookie consent, data export, deletion — all there.",
      name: "Priya Sharma",
      role: "Head of Engineering at TrustLayer",
      initials: "PS",
    },
  ];

  return (
    <section className="py-20 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Logo bar */}
        <p className="text-[var(--text-xs)] text-[var(--color-text-faint)] uppercase tracking-widest text-center mb-8">
          Trusted by teams building in public
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-20" aria-label="Companies using SaasStarter">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  width="28"
                  height="28"
                  rx="6"
                  fill="currentColor"
                  fillOpacity="0.1"
                />
                <text
                  x="14"
                  y="18"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="currentColor"
                >
                  {logo.initials}
                </text>
              </svg>
              <span className="text-[var(--text-sm)] font-medium">{logo.name}</span>
            </div>
          ))}
        </div>

        {/* Staggered testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[var(--shadow-sm)] ${
                i === 1 ? "md:mt-6" : ""
              }`}
            >
              <blockquote>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--text-xs)] font-semibold text-[var(--color-text)]"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">{t.name}</p>
                  <p className="text-[var(--text-xs)] text-[var(--color-text-faint)]">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
