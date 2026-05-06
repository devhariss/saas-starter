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

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export function getConsent(): ConsentState | null {
  const raw = getCookie(CONSENT_COOKIE)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function setConsent(state: Omit<ConsentState, 'essential'>): void {
  const full: ConsentState = { ...state, essential: true }
  setCookie(CONSENT_COOKIE, JSON.stringify(full), CONSENT_EXPIRY_DAYS)
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
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function isConsentExpired(): boolean {
  const dateStr = getCookie(CONSENT_DATE_COOKIE)
  if (!dateStr) return true
  const consentDate = new Date(dateStr)
  const expiryDate = new Date(consentDate.getTime() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
  return new Date() > expiryDate
}

export function withdrawConsent(): void {
  setConsent({ analytics: false, marketing: false, functional: false })
}
