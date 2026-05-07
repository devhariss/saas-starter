"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  category?: string;
}

const faqs: FaqItem[] = [
  {
    q: "Is there a free trial?",
    a: "Yes. The Free plan is free forever \u2014 no credit card required. Pro and Team plans include a 14-day free trial, and all paid plans come with a 30-day money-back guarantee.",
    category: "Billing",
  },
  {
    q: "Can I cancel at any time?",
    a: "Absolutely. You can cancel from Settings \u203a Billing at any time. You\u2019ll retain access until the end of your billing period and won\u2019t be charged again.",
    category: "Billing",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes, instantly. Upgrades are prorated and take effect immediately. Downgrades kick in at the end of your billing period. All plan changes go through the Stripe billing portal.",
    category: "Billing",
  },
  {
    q: "Is Stripe the only payment option?",
    a: "Currently yes. Stripe supports 135+ currencies and most global payment methods \u2014 cards, SEPA, iDEAL, Alipay, and more. Additional providers can be added by extending lib/stripe.ts.",
    category: "Billing",
  },
  {
    q: "Who owns my data?",
    a: "You do, entirely. Your data lives in your own database (Neon or Supabase PostgreSQL). Export everything via Settings \u203a Privacy \u203a Download my data, or request deletion anytime.",
    category: "Privacy",
  },
  {
    q: "Is this GDPR and CCPA compliant?",
    a: "Yes. The starter ships with a cookie consent banner, GPC signal detection, granular consent categories, Privacy Policy, Terms of Service, Cookie Policy, and data export/deletion endpoints out of the box.",
    category: "Privacy",
  },
  {
    q: "What kind of support is available?",
    a: "Free plan: community support via GitHub Discussions. Pro: priority email support with a 24-hour response SLA. Team: dedicated Slack channel and a 99.9% uptime SLA.",
    category: "Support",
  },
  {
    q: "Is this open source?",
    a: "Yes \u2014 MIT licensed. Fork it, modify it, ship your product. No attribution required, though a GitHub star is always appreciated.",
    category: "General",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (index: number): void => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase mb-5"
              style={{
                background: "oklch(0.52 0.22 285 / 0.10)",
                color: "var(--color-primary)",
                border: "1px solid oklch(0.52 0.22 285 / 0.20)",
              }}
            >
              FAQ
            </div>
            <h2
              className="font-display font-semibold leading-[1.1] tracking-tight mb-4"
              style={{
                fontSize: "clamp(1.75rem, 1rem + 1.75vw, 2.75rem)",
                color: "var(--color-text)",
              }}
            >
              Got questions?
            </h2>
            <p
              className="leading-relaxed mb-8"
              style={{ fontSize: "var(--text-base)", color: "var(--color-text-muted)" }}
            >
              Everything you need to know before you start building. Can&apos;t find the answer?
            </p>
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:-translate-y-px"
              style={{
                fontSize: "var(--text-sm)",
                background: "var(--color-surface-2)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
            >
              Contact support
            </a>
          </div>

          {/* Right — accordion list */}
          <dl className="divide-y" style={{ borderColor: "var(--color-border)" }}>
            {faqs.map((faq, i) => (
              <FaqRow
                key={i}
                faq={faq}
                index={i}
                isOpen={open === i}
                onToggle={toggle}
              />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

interface FaqRowProps {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

function FaqRow({ faq, index, isOpen, onToggle }: FaqRowProps) {
  return (
    <div className="group">
      <dt>
        <button
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          className="flex w-full items-start justify-between py-6 text-left gap-6 cursor-pointer"
        >
          <span
            className="font-medium leading-snug transition-colors duration-150"
            style={{
              fontSize: "var(--text-base)",
              color: isOpen ? "var(--color-primary)" : "var(--color-text)",
            }}
          >
            {faq.category && (
              <span
                className="inline-block mr-2.5 mb-1 px-2 py-0.5 rounded-md text-[10px] font-semibold align-middle"
                style={{
                  background: "oklch(0.52 0.22 285 / 0.08)",
                  color: "var(--color-primary)",
                }}
              >
                {faq.category}
              </span>
            )}
            {faq.q}
          </span>

          <span
            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full mt-0.5 transition-all duration-200"
            style={{
              background: isOpen
                ? "var(--color-primary)"
                : "var(--color-surface-offset)",
              border: isOpen
                ? "1px solid var(--color-primary)"
                : "1px solid var(--color-border)",
            }}
          >
            {isOpen ? (
              <Minus size={12} color="white" aria-hidden="true" />
            ) : (
              <Plus
                size={12}
                aria-hidden="true"
                style={{ color: "var(--color-text-muted)" }}
              />
            )}
          </span>
        </button>
      </dt>

      <dd
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "600px" : "0px",
          opacity: isOpen ? 1 : 0,
          paddingBottom: isOpen ? "1.5rem" : "0",
        }}
      >
        <p
          className="leading-relaxed"
          style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
        >
          {faq.a}
        </p>
      </dd>
    </div>
  );
}
