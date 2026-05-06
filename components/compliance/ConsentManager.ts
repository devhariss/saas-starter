'use client'

export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export interface ConsentState {
  essential: true
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const CONSENT_COOKIE = 'consent_state'
const CONSENT_DATE_COOKIE = 'consent_date'
const CONSENT_EXPIRY_DAYS = 365

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`
}

export function getConsent(): ConsentState {
  const raw = getCookie(CONSENT_COOKIE)
  if (!raw) return { essential: true, analytics: false, marketing: false, functional: false }
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    return {
      essential: true,
      analytics: parsed.analytics ?? false,
      marketing: parsed.marketing ?? false,
      functional: parsed.functional ?? false,
    }
  } catch {
    return { essential: true, analytics: false, marketing: false, functional: false }
  }
}

export function setConsent(state: ConsentState): void {
  setCookie(CONSENT_COOKIE, JSON.stringify(state), CONSENT_EXPIRY_DAYS)
  setCookie(CONSENT_DATE_COOKIE, new Date().toISOString(), CONSENT_EXPIRY_DAYS)
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'essential') return true
  const state = getConsent()
  return state[category]
}

export function isGPCEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function shouldShowBanner(): boolean {
  const raw = getCookie(CONSENT_COOKIE)
  if (!raw) return true
  const dateStr = getCookie(CONSENT_DATE_COOKIE)
  if (!dateStr) return true
  const date = new Date(dateStr)
  const daysSince = (Date.now() - date.getTime()) / 864e5
  return daysSince > CONSENT_EXPIRY_DAYS
}

export function withdrawConsent(): void {
  setConsent({ essential: true, analytics: false, marketing: false, functional: false })
}
