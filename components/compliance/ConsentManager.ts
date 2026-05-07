// ConsentManager — GDPR/CCPA/DPDPA consent state management

export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export interface ConsentState {
  essential: true // always true — cannot be revoked
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp?: number
  version: number
}

const CONSENT_COOKIE = 'consent_state'
const CONSENT_DATE_COOKIE = 'consent_date'
const CONSENT_VERSION = 1
const CONSENT_EXPIRY_DAYS = 365

function parseCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const exp = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp};path=/;SameSite=Lax`
}

export function getConsent(): ConsentState | null {
  const raw = parseCookie(CONSENT_COOKIE)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function setConsent(state: Omit<ConsentState, 'essential' | 'version'>): void {
  const full: ConsentState = {
    essential: true,
    analytics: state.analytics,
    marketing: state.marketing,
    functional: state.functional,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  }
  setCookie(CONSENT_COOKIE, JSON.stringify(full), CONSENT_EXPIRY_DAYS)
  setCookie(CONSENT_DATE_COOKIE, String(Date.now()), CONSENT_EXPIRY_DAYS)
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'essential') return true
  const state = getConsent()
  if (!state) return false
  return state[category] === true
}

export function isConsentExpired(): boolean {
  const raw = parseCookie(CONSENT_DATE_COOKIE)
  if (!raw) return true
  const date = Number(raw)
  if (isNaN(date)) return true
  return Date.now() - date > CONSENT_EXPIRY_DAYS * 864e5
}

export function isGPCEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  // @ts-expect-error — GPC is not in standard Navigator types yet
  return navigator.globalPrivacyControl === true
}

export function needsBanner(): boolean {
  if (isGPCEnabled()) return false
  const state = getConsent()
  if (!state) return true
  return isConsentExpired()
}

export function acceptAll(): void {
  setConsent({ analytics: true, marketing: true, functional: true })
}

export function rejectAll(): void {
  setConsent({ analytics: false, marketing: false, functional: false })
}
