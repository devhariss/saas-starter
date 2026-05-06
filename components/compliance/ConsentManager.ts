export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export interface ConsentState {
  essential: true
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_NAME = 'consent_state'
const DATE_COOKIE = 'consent_date'
const EXPIRY_DAYS = 365

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`)) 
  return match ? decodeURIComponent(match[1]) : null
}

export function getConsent(): ConsentState | null {
  const raw = getCookie(COOKIE_NAME)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function setConsent(state: Omit<ConsentState, 'essential'>): void {
  const full: ConsentState = { essential: true, ...state }
  setCookie(COOKIE_NAME, JSON.stringify(full), EXPIRY_DAYS)
  setCookie(DATE_COOKIE, new Date().toISOString(), EXPIRY_DAYS)
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'essential') return true
  const state = getConsent()
  if (!state) return false
  return state[category] === true
}

export function isGPCEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function isConsentExpired(): boolean {
  const dateStr = getCookie(DATE_COOKIE)
  if (!dateStr) return true
  const consentDate = new Date(dateStr)
  const daysSince = (Date.now() - consentDate.getTime()) / 864e5
  return daysSince > EXPIRY_DAYS
}

export function revokeConsent(): void {
  setConsent({ analytics: false, marketing: false, functional: false })
}
