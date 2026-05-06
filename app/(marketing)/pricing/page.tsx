import type { Metadata } from "next";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing. Start free, upgrade when you need more.",
};

export default function PricingPage() {
  return (
    <main className="py-24">
      <div className="mx-auto max-w-3xl px-4 text-center mb-16">
        <h1
          className="font-display text-4xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)" }}
        >
          Simple, honest pricing
        </h1>
        <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
          No hidden fees. No surprises. Cancel anytime.
        </p>
      </div>
      <Pricing />
      <FAQ />
    </main>
  );
}
