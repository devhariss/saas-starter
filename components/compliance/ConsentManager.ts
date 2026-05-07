export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export interface ConsentState {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
  gpc?: boolean
}

const CONSENT_COOKIE = 'consent_state'
const CONSENT_DATE_COOKIE = 'consent_date'
const CONSENT_EXPIRY_DAYS = 365

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax;Secure`
}

function getCookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const raw = getCookieValue(CONSENT_COOKIE)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function setConsent(state: ConsentState): void {
  setCookie(CONSENT_COOKIE, JSON.stringify(state), CONSENT_EXPIRY_DAYS)
  setCookie(CONSENT_DATE_COOKIE, new Date().toISOString(), CONSENT_EXPIRY_DAYS)
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'essential') return true
  const state = getConsent()
  if (!state) return false
  return state[category] === true
}

export function isGPCEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function isConsentExpired(): boolean {
  const dateStr = getCookieValue(CONSENT_DATE_COOKIE)
  if (!dateStr) return true
  const consentDate = new Date(dateStr)
  const now = new Date()
  const diffDays = (now.getTime() - consentDate.getTime()) / 864e5
  return diffDays > CONSENT_EXPIRY_DAYS
}

export function shouldShowBanner(): boolean {
  const existing = getConsent()
  if (!existing) return true
  if (isConsentExpired()) return true
  return false
}
