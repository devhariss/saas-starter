export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export interface ConsentState {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp?: string
}

const CONSENT_COOKIE = 'consent_state'
const CONSENT_DATE_COOKIE = 'consent_date'
const CONSENT_TTL_DAYS = 365

function parseCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {}
  return Object.fromEntries(
    document.cookie.split('; ').map((c) => {
      const [k, ...v] = c.split('=')
      return [k, decodeURIComponent(v.join('='))]
    })
  )
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setDate(expires.getDate() + days)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export function getConsent(): ConsentState | null {
  const cookies = parseCookies()
  const raw = cookies[CONSENT_COOKIE]
  if (!raw) return null
  try {
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function setConsent(state: ConsentState): void {
  const withTimestamp = { ...state, timestamp: new Date().toISOString() }
  setCookie(CONSENT_COOKIE, JSON.stringify(withTimestamp), CONSENT_TTL_DAYS)
  setCookie(CONSENT_DATE_COOKIE, new Date().toISOString(), CONSENT_TTL_DAYS)
}

export function hasConsent(category: ConsentCategory): boolean {
  const state = getConsent()
  if (!state) return category === 'essential'
  return state[category] === true
}

export function isConsentExpired(): boolean {
  const cookies = parseCookies()
  const dateStr = cookies[CONSENT_DATE_COOKIE]
  if (!dateStr) return true
  const consentDate = new Date(dateStr)
  const daysSince = (Date.now() - consentDate.getTime()) / (1000 * 60 * 60 * 24)
  return daysSince >= CONSENT_TTL_DAYS
}

export function isGPCEnabled(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function acceptAll(): void {
  setConsent({ essential: true, analytics: true, marketing: true, functional: true })
}

export function rejectAll(): void {
  setConsent({ essential: true, analytics: false, marketing: false, functional: false })
}
