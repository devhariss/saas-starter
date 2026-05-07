import { Star } from "lucide-react";

const logos = [
  { name: "Vercel", initials: "▲", mono: true },
  { name: "Supabase", initials: "SB", mono: false },
  { name: "Stripe", initials: "S", mono: true },
  { name: "Resend", initials: "RE", mono: false },
  { name: "Prisma", initials: "Δ", mono: true },
  { name: "NexaFlow", initials: "NF", mono: false },
  { name: "Gridcraft", initials: "GC", mono: false },
];

const testimonials = [
  {
    quote:
      "We went from idea to paying customers in 11 days. The auth and billing setup alone saved us a week of work.",
    name: "Sarah Chen",
    role: "CTO at NexaFlow",
    initials: "SC",
    hue: 285,
    stars: 5,
  },
  {
    quote:
      "The Lighthouse scores are real. Zero regressions in production. This is the template I wish I had three startups ago.",
    name: "Marcus Reid",
    role: "Founder at Gridcraft",
    initials: "MR",
    hue: 192,
    stars: 5,
  },
  {
    quote:
      "GDPR compliance was the part I was dreading most. It's just done. Cookie consent, data export, deletion — all there.",
    name: "Priya Sharma",
    role: "Head of Eng at TrustLayer",
    initials: "PS",
    hue: 145,
    stars: 5,
  },
];

export function SocialProof() {
  return (
    <section
      className="py-24"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Logo bar */}
        <p
          className="text-center uppercase tracking-widest mb-8"
          style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}
        >
          Trusted by teams building in public
        </p>

        <div
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 mb-20"
          aria-label="Partner logos"
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 transition-all hover:opacity-100"
              style={{ color: "var(--color-text-faint)", opacity: 0.6 }}
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: "var(--color-surface-offset)",
                  color: "var(--color-text-muted)",
                }}
              >
                {logo.initials}
              </div>
              <span
                className="text-[var(--text-sm)] font-semibold"
                style={{ color: "var(--color-text-muted)" }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 rounded-[var(--radius-xl)] p-6"
          style={{
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
          }}
        >
          {[
            { value: "2,400+", label: "developers using this" },
            { value: "11 days", label: "avg. time to first paying user" },
            { value: "100", label: "Lighthouse score" },
            { value: "MIT", label: "open source license" },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-2">
              <p
                className="font-display font-semibold mb-1"
                style={{ fontSize: "var(--text-xl)", color: "var(--color-primary)" }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`rounded-[var(--radius-xl)] p-6 flex flex-col gap-5 ${
                i === 1 ? "md:mt-8" : ""
              }`}
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5" aria-label={`${t.stars} out of 5 stars`}>
                {[...Array(t.stars)].map((_, s) => (
                  <Star
                    key={s}
                    size={13}
                    aria-hidden="true"
                    style={{ fill: "oklch(0.75 0.18 75)", color: "oklch(0.75 0.18 75)" }}
                  />
                ))}
              </div>

              <blockquote>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="flex items-center gap-3 mt-auto">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                  style={{
                    background: `oklch(0.52 0.18 ${t.hue})`,
                    color: "#fff",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="font-medium"
                    style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}
                  >
                    {t.name}
                  </p>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
