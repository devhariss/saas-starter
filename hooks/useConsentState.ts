'use client'

import { useEffect, useState } from 'react'
import { getConsent, type ConsentState } from '@/components/compliance/ConsentManager'

export function useConsentState() {
  const [consent, setConsent] = useState<ConsentState | null>(null)

  useEffect(() => {
    setConsent(getConsent())
  }, [])

  return consent
}
