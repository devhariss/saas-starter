import { Star, Quote } from "lucide-react";

/* ─── Data ──────────────────────────────────────────── */

interface Logo {
  name: string;
  initials: string;
  hue: number;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  hue: number;
  stars: number;
}

interface Stat {
  value: string;
  label: string;
  hue: number;
}

const logos: Logo[] = [
  { name: "Vercel",    initials: "▲",  hue: 270 },
  { name: "Supabase",  initials: "SB", hue: 155 },
  { name: "Stripe",    initials: "S",  hue: 250 },
  { name: "Resend",    initials: "RE", hue: 20  },
  { name: "Prisma",    initials: "Δ",  hue: 220 },
  { name: "NexaFlow",  initials: "NF", hue: 285 },
  { name: "Gridcraft", initials: "GC", hue: 192 },
  { name: "TrustLayer",initials: "TL", hue: 145 },
];

const stats: Stat[] = [
  { value: "2,400+",  label: "developers using this",        hue: 285 },
  { value: "11 days", label: "avg. time to first paying user", hue: 192 },
  { value: "100",     label: "Lighthouse score",              hue: 145 },
  { value: "MIT",     label: "open source license",           hue: 75  },
];

const testimonials: Testimonial[] = [
  {
    quote: "We went from idea to paying customers in 11 days. The auth and billing setup alone saved us a week of work.",
    name: "Sarah Chen",
    role: "CTO at NexaFlow",
    initials: "SC",
    hue: 285,
    stars: 5,
  },
  {
    quote: "The Lighthouse scores are real. Zero regressions in production. This is the template I wish I had three startups ago.",
    name: "Marcus Reid",
    role: "Founder at Gridcraft",
    initials: "MR",
    hue: 192,
    stars: 5,
  },
  {
    quote: "GDPR compliance was the part I was dreading most. It's just done. Cookie consent, data export, deletion — all there.",
    name: "Priya Sharma",
    role: "Head of Eng at TrustLayer",
    initials: "PS",
    hue: 145,
    stars: 5,
  },
];

/* ─── Marquee animation (injected once) ─────────────── */

const marqueeStyle = `
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }
`;

/* ─── Component ─────────────────────────────────────── */

export function SocialProof() {
  // Duplicate logos for seamless loop
  const loopLogos = [...logos, ...logos];

  return (
    <section
      className="relative overflow-hidden py-28"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Injected keyframes */}
      <style>{marqueeStyle}</style>

      {/* Subtle section orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse, oklch(0.52 0.22 285 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-6">

        {/* ── Section label ── */}
        <p
          className="text-center uppercase tracking-[0.2em] mb-10"
          style={{ fontSize: "11px", color: "var(--color-text-faint)" }}
        >
          Trusted by teams building in public
        </p>

        {/* ── Logo marquee ── */}
        <div className="relative mb-24 overflow-hidden">
          {/* Fade edges */}
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--color-bg), transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--color-bg), transparent)",
            }}
          />

          <div className="marquee-track" aria-label="Partner logos">
            {loopLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex items-center gap-2.5 mx-8 select-none"
              >
                {/* Icon badge */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{
                    background: `oklch(0.52 0.18 ${logo.hue} / 0.12)`,
                    border: `1px solid oklch(0.52 0.18 ${logo.hue} / 0.22)`,
                    color: `oklch(0.72 0.15 ${logo.hue})`,
                  }}
                >
                  {logo.initials}
                </div>
                <span
                  className="font-semibold whitespace-nowrap"
                  style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div
          className="relative grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-24"
          style={{
            background: "oklch(0.52 0.22 285 / 0.12)",
            boxShadow: "0 0 0 1px oklch(0.52 0.22 285 / 0.14), 0 8px 32px oklch(0 0 0 / 0.20)",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center justify-center py-10 px-6 text-center overflow-hidden"
              style={{ background: "oklch(0.11 0.008 285)" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, oklch(0.52 0.20 ${stat.hue} / 0.10) 0%, transparent 70%)`,
                }}
              />
              {/* Top glow line on hover */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, transparent, oklch(0.68 0.20 ${stat.hue}) 50%, transparent)`,
                }}
              />
              <p
                className="font-display font-bold tabular-nums leading-none mb-2"
                style={{
                  fontSize: "clamp(2rem, 1rem + 2vw, 3rem)",
                  color: `oklch(0.78 0.18 ${stat.hue})`,
                }}
              >
                {stat.value}
              </p>
              <p
                className="leading-snug"
                style={{ fontSize: "var(--text-xs)", color: "oklch(0.50 0.06 285)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Section heading ── */}
        <div className="text-center mb-14">
          <p
            className="uppercase tracking-[0.18em] mb-3"
            style={{ fontSize: "11px", color: "var(--color-text-faint)" }}
          >
            Testimonials
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(1.6rem, 1rem + 2vw, 2.4rem)", color: "var(--color-text)" }}
          >
            Don&apos;t take our word for it
          </h2>
        </div>

        {/* ── Testimonials grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`group relative rounded-2xl p-6 flex flex-col gap-5 overflow-hidden ${
                i === 1 ? "md:mt-8" : ""
              }`}
              style={{
                background: "oklch(0.11 0.008 285)",
                border: `1px solid oklch(0.52 0.18 ${t.hue} / 0.18)`,
                boxShadow: `0 4px 24px oklch(0 0 0 / 0.25)`,
              }}
            >
              {/* Radial glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, oklch(0.52 0.18 ${t.hue} / 0.08) 0%, transparent 65%)`,
                }}
              />
              {/* Top edge glow line */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background: `linear-gradient(to right, transparent, oklch(0.68 0.20 ${t.hue}) 50%, transparent)`,
                }}
              />

              {/* Stars + quote icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5" aria-label={`${t.stars} out of 5 stars`}>
                  {([...Array(t.stars)] as undefined[]).map((_, s) => (
                    <Star
                      key={s}
                      size={13}
                      aria-hidden="true"
                      style={{ fill: "oklch(0.78 0.18 75)", color: "oklch(0.78 0.18 75)" }}
                    />
                  ))}
                </div>
                <Quote
                  size={18}
                  aria-hidden="true"
                  style={{ color: `oklch(0.52 0.18 ${t.hue} / 0.35)` }}
                />
              </div>

              <blockquote className="flex-1">
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "var(--text-sm)", color: "oklch(0.65 0.05 285)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Divider */}
              <div
                className="h-px"
                style={{ background: `oklch(0.52 0.18 ${t.hue} / 0.12)` }}
              />

              <figcaption className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{
                    background: `oklch(0.52 0.20 ${t.hue} / 0.18)`,
                    border: `1px solid oklch(0.52 0.20 ${t.hue} / 0.28)`,
                    color: `oklch(0.78 0.18 ${t.hue})`,
                    boxShadow: `0 0 12px oklch(0.52 0.20 ${t.hue} / 0.20)`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{ fontSize: "var(--text-sm)", color: "oklch(0.88 0.02 285)" }}
                  >
                    {t.name}
                  </p>
                  <p style={{ fontSize: "var(--text-xs)", color: "oklch(0.48 0.05 285)" }}>
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
