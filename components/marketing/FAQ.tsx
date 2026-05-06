"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. The Free plan is free forever — no credit card required. Pro and Team plans include a 14-day free trial, and all paid plans come with a 30-day money-back guarantee.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Absolutely. You can cancel your subscription at any time from Settings › Billing. You'll retain access until the end of your current billing period, and we won't charge you again.",
  },
  {
    q: "Who owns my data?",
    a: "You do, entirely. Your data is stored in your own database (Neon or Supabase PostgreSQL). You can export all your data at any time via Settings › Privacy › Download my data, and request deletion at any time.",
  },
  {
    q: "Is this GDPR and CCPA compliant?",
    a: "Yes. The starter includes a cookie consent banner with GPC signal detection, granular consent categories, a full Privacy Policy, Terms of Service, Cookie Policy, and accessibility statement. Data export and deletion endpoints are implemented out of the box.",
  },
  {
    q: "What kind of support is available?",
    a: "Free plan users get community support via GitHub Discussions. Pro users get priority email support with a 24-hour response SLA. Team plan users get a dedicated Slack channel and a 99.9% uptime SLA.",
  },
  {
    q: "Is this open source?",
    a: "Yes — MIT licensed. Fork it, modify it, and ship your product. You don't need to credit us, though we appreciate a star on GitHub.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes, instantly. Upgrades are prorated immediately. Downgrades take effect at the end of your billing period. All plan changes are handled through the Stripe billing portal.",
  },
  {
    q: "Is Stripe the only payment option?",
    a: "Currently yes. Stripe supports 135+ currencies and most payment methods globally (cards, SEPA, iDEAL, Alipay, and more). Additional payment providers can be added by extending lib/stripe.ts.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-[800px] px-6">
        <h2
          className="font-display font-semibold text-[var(--color-text)] mb-12"
          style={{ fontSize: "clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)" }}
        >
          Frequently asked questions
        </h2>
        <dl>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-[var(--color-border)] last:border-0"
            >
              <dt>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  className="flex w-full items-center justify-between py-5 text-left gap-4"
                >
                  <span className="text-[var(--text-base)] font-medium text-[var(--color-text)]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </dt>
              <dd
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                hidden={open !== i}
                className="pb-5 text-[var(--text-sm)] text-[var(--color-text-muted)] leading-relaxed"
              >
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
