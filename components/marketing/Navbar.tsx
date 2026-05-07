"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "oklch(from var(--color-bg) l c h / 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="SaasStarter home"
          >
            <Logo className="w-7 h-7" />
            <span
              className="font-display font-semibold tracking-tight"
              style={{ fontSize: "var(--text-base)", color: "var(--color-text)" }}
            >
              SaasStarter
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3.5 py-2 rounded-[var(--radius-md)] transition-colors hover:bg-[var(--color-surface)]"
                  style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/login"
              className="px-4 py-2 rounded-[var(--radius-md)] transition-colors hover:bg-[var(--color-surface)]"
              style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-[var(--radius-md)] font-medium transition-all hover:-translate-y-px"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                fontSize: "var(--text-sm)",
                boxShadow: "0 1px 3px oklch(0.52 0.22 285 / 0.3)",
              }}
            >
              Get started
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="p-2 rounded-[var(--radius-md)] transition-colors hover:bg-[var(--color-surface)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pb-5 pt-2"
          style={{
            background: "var(--color-bg)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <ul className="space-y-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-[var(--radius-md)] transition-colors hover:bg-[var(--color-surface)]"
                  style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="flex flex-col gap-2 mt-4 pt-4"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex justify-center px-4 py-2.5 rounded-[var(--radius-md)] transition-colors hover:bg-[var(--color-surface)]"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex justify-center px-4 py-2.5 rounded-[var(--radius-md)] font-medium"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                fontSize: "var(--text-sm)",
              }}
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
