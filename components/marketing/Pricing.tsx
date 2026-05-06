"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    description: "For solo builders and side projects.",
    cta: "Start for free",
    ctaHref: "/register",
    popular: false,
    features: [
      "1 project",
      "100 API calls / day",
      "Community support",
      "Core auth (OAuth + magic link)",
      "Public changelog",
      "MIT license",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    description: "For indie hackers and growing products.",
    cta: "Start Pro trial",
    ctaHref: "/register?plan=pro",
    popular: true,
    features: [
      "Unlimited projects",
      "10,000 API calls / day",
      "Priority email support",
      "Custom domain",
      "Analytics dashboard",
      "Billing portal access",
    ],
  },
  {
    name: "Team",
    monthlyPrice: 79,
    description: "For teams shipping together.",
    cta: "Start Team trial",
    ctaHref: "/register?plan=team",
    popular: false,
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "SSO (SAML/OIDC)",
      "Audit log",
      "99.9% SLA",
      "Dedicated Slack channel",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  const price = (monthly: number) =>
    monthly === 0 ? "$0" : annual ? `$${Math.floor(monthly * 0.8)}` : `$${monthly}`;

  return (
    <section id="pricing" className="py-24 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12">
          <p className="text-[var(--text-sm)] font-medium text-[var(--color-primary)] mb-3">
            Simple pricing
          </p>
          <h2
            className="font-display font-semibold text-[var(--color-text)] mb-4 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)" }}
          >
            Pick your plan
          </h2>

          {/* Toggle */}
          <div className="flex items-center gap-3 mt-6">
            <span className={`text-[var(--text-sm)] ${!annual ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>
              Monthly
            </span>
            <button
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                annual ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface-2)]"
              }`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  annual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-[var(--text-sm)] ${annual ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>
              Annual
              <span className="ml-1.5 px-1.5 py-0.5 rounded-[var(--radius-full)] bg-[var(--color-success)]/15 text-[var(--color-success)] text-[10px] font-medium">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[var(--radius-lg)] border p-8 ${
                plan.popular
                  ? "border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[var(--shadow-md)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-[var(--radius-full)] bg-[var(--color-primary)] text-white text-[var(--text-xs)] font-medium">
                  Most popular
                </span>
              )}
              <p className="text-[var(--text-sm)] font-medium text-[var(--color-text-muted)] mb-1">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-[var(--text-xl)] font-semibold text-[var(--color-text)]">
                  {price(plan.monthlyPrice)}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span className="text-[var(--text-sm)] text-[var(--color-text-faint)]">/mo</span>
                )}
              </div>
              {annual && plan.monthlyPrice > 0 && (
                <p className="text-[var(--text-xs)] text-[var(--color-text-faint)] mb-1">
                  <s>${plan.monthlyPrice}/mo</s> billed annually
                </p>
              )}
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-6">
                {plan.description}
              </p>
              <Link
                href={plan.ctaHref}
                className={`block text-center px-4 py-2.5 rounded-[var(--radius-md)] text-[var(--text-sm)] font-medium transition-colors mb-6 ${
                  plan.popular
                    ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
                    : "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
                }`}
              >
                {plan.cta}
              </Link>
              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[var(--text-sm)] text-[var(--color-text-muted)]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 text-[var(--color-success)]">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[var(--text-sm)] text-[var(--color-text-faint)]">
          All plans include a 30-day money-back guarantee.{" "}
          <Link href="/pricing" className="text-[var(--color-primary)] hover:underline">
            See full comparison
          </Link>
        </p>
      </div>
    </section>
  );
}
