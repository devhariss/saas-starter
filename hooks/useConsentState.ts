'use client'

import { getConsent, hasConsent } from '@/components/compliance/ConsentManager'
import { useEffect, useState } from 'react'

export function useConsentState() {
  const [consent, setConsent] = useState(() => {
    if (typeof window === 'undefined') return null
    return getConsent()
  })

  useEffect(() => {
    setConsent(getConsent())
  }, [])

  return {
    consent,
    hasAnalytics: hasConsent('analytics'),
    hasMarketing: hasConsent('marketing'),
    hasFunctional: hasConsent('functional'),
  }
}
