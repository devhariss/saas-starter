export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export interface ConsentState {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp: string
}

const CONSENT_COOKIE = 'consent_state'
const CONSENT_DATE_COOKIE = 'consent_date'
const CONSENT_TTL_DAYS = 365

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const raw = getCookie(CONSENT_COOKIE)
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export function setConsent(state: ConsentState): void {
  setCookie(CONSENT_COOKIE, JSON.stringify(state), CONSENT_TTL_DAYS)
  setCookie(CONSENT_DATE_COOKIE, new Date().toISOString(), CONSENT_TTL_DAYS)
}

export function hasConsent(category: ConsentCategory): boolean {
  const state = getConsent()
  if (!state) return category === 'essential'
  return state[category] ?? false
}

export function isConsentExpired(): boolean {
  if (typeof document === 'undefined') return false
  const dateRaw = getCookie(CONSENT_DATE_COOKIE)
  if (!dateRaw) return true
  const set = new Date(dateRaw).getTime()
  return Date.now() - set > CONSENT_TTL_DAYS * 86400000
}

export function isGPCEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function acceptAll(): void {
  setConsent({ essential: true, analytics: true, marketing: true, functional: true, timestamp: new Date().toISOString() })
}

export function rejectAll(): void {
  setConsent({ essential: true, analytics: false, marketing: false, functional: false, timestamp: new Date().toISOString() })
}
