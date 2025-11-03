import { useState } from 'react'

export function usePricingFilters() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return {
    billingCycle,
    setBillingCycle,
  }
}