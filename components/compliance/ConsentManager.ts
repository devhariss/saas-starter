export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export interface ConsentState {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const CONSENT_COOKIE = 'consent_state'
const CONSENT_DATE_COOKIE = 'consent_date'
const CONSENT_EXPIRY_DAYS = 365

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))  
  return match ? decodeURIComponent(match[1]) : null
}

export function getConsent(): ConsentState {
  const raw = getCookie(CONSENT_COOKIE)
  if (!raw) {
    return { essential: true, analytics: false, marketing: false, functional: false }
  }
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
  const safeState = { ...state, essential: true }
  setCookie(CONSENT_COOKIE, JSON.stringify(safeState), CONSENT_EXPIRY_DAYS)
  setCookie(CONSENT_DATE_COOKIE, new Date().toISOString(), CONSENT_EXPIRY_DAYS)
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'essential') return true
  return getConsent()[category]
}

export function isGPCEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function shouldShowBanner(): boolean {
  if (isGPCEnabled()) return false
  const dateRaw = getCookie(CONSENT_DATE_COOKIE)
  if (!dateRaw) return true
  const consentDate = new Date(dateRaw)
  const now = new Date()
  const daysSinceConsent =
    (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24)
  return daysSinceConsent > CONSENT_EXPIRY_DAYS
}

export function revokeConsent(): void {
  setConsent({ essential: true, analytics: false, marketing: false, functional: false })
}
