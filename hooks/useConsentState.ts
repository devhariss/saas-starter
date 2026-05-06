'use client'

import { useEffect, useState } from 'react'
import { getConsent, hasConsent, type ConsentState, type ConsentCategory } from '@/components/compliance/ConsentManager'

export function useConsentState() {
  const [consent, setConsent] = useState<ConsentState | null>(null)

  useEffect(() => {
    setConsent(getConsent())
  }, [])

  return {
    consent,
    hasConsent: (category: ConsentCategory) => hasConsent(category),
  }
}
