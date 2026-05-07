"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    badge: null,
    monthlyPrice: 0,
    description: "Perfect for solo builders and side projects.",
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
    badge: "Most popular",
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
    badge: null,
    monthlyPrice: 79,
    description: "For teams shipping together at scale.",
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
    monthly === 0 ? 0 : annual ? Math.floor(monthly * 0.8) : monthly;

  return (
    <section
      id="pricing"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.52 0.22 285 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase mb-5"
            style={{
              background: "oklch(0.52 0.22 285 / 0.10)",
              color: "var(--color-primary)",
              border: "1px solid oklch(0.52 0.22 285 / 0.20)",
            }}
          >
            <Zap size={10} aria-hidden="true" />
            Pricing
          </div>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.75rem, 1.2rem + 1.5vw, 2.75rem)",
              color: "var(--color-text)",
            }}
          >
            Simple, transparent pricing
          </h2>
          <p style={{ fontSize: "var(--text-base)", color: "var(--color-text-muted)" }}>
            Start free. Upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center gap-3 mt-8">
            <span
              className="text-[var(--text-sm)] font-medium"
              style={{ color: !annual ? "var(--color-text)" : "var(--color-text-faint)" }}
            >
              Monthly
            </span>
            <button
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200"
              style={{
                background: annual ? "var(--color-primary)" : "var(--color-surface-offset)",
                boxShadow: annual ? "0 0 0 3px oklch(0.52 0.22 285 / 0.15)" : "none",
              }}
              aria-label="Toggle annual billing"
            >
              <span
                className="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                style={{ transform: annual ? "translateX(1.375rem)" : "translateX(0.25rem)" }}
              />
            </button>
            <span
              className="text-[var(--text-sm)] font-medium flex items-center gap-2"
              style={{ color: annual ? "var(--color-text)" : "var(--color-text-faint)" }}
            >
              Annual
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{
                  background: "oklch(0.55 0.15 145 / 0.12)",
                  color: "var(--color-success)",
                  border: "1px solid oklch(0.55 0.15 145 / 0.20)",
                }}
              >
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              price={price(plan.monthlyPrice)}
              annual={annual}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p
            className="text-center"
            style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}
          >
            All plans include a 30-day money-back guarantee.
          </p>
          <Link
            href="/pricing"
            className="text-[var(--text-sm)] font-medium hover:underline transition-colors"
            style={{ color: "var(--color-primary)" }}
          >
            See full comparison &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

type Plan = (typeof plans)[number];

function PricingCard({
  plan,
  price,
  annual,
}: {
  plan: Plan;
  price: number;
  annual: boolean;
}) {
  const { popular } = plan;

  return (
    <div
      className="relative flex flex-col rounded-2xl transition-all duration-300"
      style={{
        background: popular
          ? "linear-gradient(160deg, oklch(0.14 0.010 285), oklch(0.11 0.008 285))"
          : "var(--color-surface)",
        border: popular
          ? "1px solid oklch(0.52 0.22 285 / 0.45)"
          : "1px solid var(--color-border)",
        boxShadow: popular
          ? "0 0 0 1px oklch(0.52 0.22 285 / 0.10), 0 8px 32px oklch(0.52 0.22 285 / 0.15), 0 2px 8px oklch(0 0 0 / 0.20)"
          : "var(--shadow-sm)",
      }}
    >
      {/* Popular glow top edge */}
      {popular && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.22 285 / 0.8), transparent)",
          }}
        />
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Plan header */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-[var(--text-sm)] font-semibold tracking-wide"
            style={{ color: popular ? "oklch(0.85 0.10 285)" : "var(--color-text-muted)" }}
          >
            {plan.name}
          </span>
          {plan.badge && (
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
              style={{
                background: "oklch(0.52 0.22 285 / 0.18)",
                color: "oklch(0.82 0.15 285)",
                border: "1px solid oklch(0.52 0.22 285 / 0.30)",
              }}
            >
              <Zap size={9} aria-hidden="true" />
              {plan.badge}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-end gap-1.5 leading-none">
            <span
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: "clamp(2.2rem, 1rem + 2vw, 3rem)",
                color: popular ? "#fff" : "var(--color-text)",
              }}
            >
              ${price}
            </span>
            {plan.monthlyPrice > 0 && (
              <span
                className="mb-1.5"
                style={{ fontSize: "var(--text-sm)", color: popular ? "oklch(0.65 0.08 285)" : "var(--color-text-faint)" }}
              >
                /mo
              </span>
            )}
          </div>
          {annual && plan.monthlyPrice > 0 && (
            <p
              className="mt-1"
              style={{ fontSize: "var(--text-xs)", color: popular ? "oklch(0.55 0.08 285)" : "var(--color-text-faint)" }}
            >
              <s className="opacity-60">${plan.monthlyPrice}/mo</s>
              {" "}&mdash; billed ${Math.floor(plan.monthlyPrice * 0.8 * 12)}/yr
            </p>
          )}
        </div>

        {/* Description */}
        <p
          className="mb-7 leading-relaxed"
          style={{
            fontSize: "var(--text-sm)",
            color: popular ? "oklch(0.60 0.06 285)" : "var(--color-text-muted)",
          }}
        >
          {plan.description}
        </p>

        {/* CTA */}
        <Link
          href={plan.ctaHref}
          className="block text-center px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0 mb-8"
          style={{
            fontSize: "var(--text-sm)",
            ...(popular
              ? {
                  background: "var(--color-primary)",
                  color: "#fff",
                  boxShadow:
                    "0 1px 3px oklch(0.52 0.22 285 / 0.40), 0 4px 16px oklch(0.52 0.22 285 / 0.20)",
                }
              : {
                  background: "var(--color-surface-2)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                }),
          }}
        >
          {plan.cta}
        </Link>

        {/* Divider */}
        <div
          className="mb-6"
          style={{ height: "1px", background: popular ? "oklch(0.52 0.22 285 / 0.18)" : "var(--color-border)" }}
        />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5"
              style={{ fontSize: "var(--text-sm)", color: popular ? "oklch(0.75 0.06 285)" : "var(--color-text-muted)" }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full"
                style={{
                  background: popular
                    ? "oklch(0.52 0.22 285 / 0.20)"
                    : "oklch(0.55 0.15 145 / 0.12)",
                }}
              >
                <Check
                  size={9}
                  strokeWidth={2.5}
                  style={{ color: popular ? "oklch(0.75 0.18 285)" : "var(--color-success)" }}
                  aria-hidden="true"
                />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
