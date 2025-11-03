import { useState, useEffect } from 'react'
import {
  pricingPlans,
  addons,
  comparisonFeatures,
  faqs,
  type PricingPlan,
  type Addon,
  type ComparisonFeature,
  type FAQ
} from '../pricingData'

export function usePricingData() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  // Load animation state from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('animation-playing')
    if (saved !== null) {
      setIsPlaying(JSON.parse(saved))
    }
  }, [])

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  return {
    pricingPlans,
    addons,
    comparisonFeatures,
    faqs,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
  }
}