"use client"

import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import { PricingHeader } from "../../components/pricing/PricingHeader"
import { BillingToggle } from "../../components/pricing/BillingToggle"
import { PricingCards } from "../../components/pricing/PricingCards"
import { AddonsSection } from "../../components/pricing/AddonsSection"
import { ComparisonTable } from "../../components/pricing/ComparisonTable"
import { FAQSection } from "../../components/pricing/FAQSection"
import { CTABanner } from "../../components/pricing/CTABanner"
import { usePricingData } from "../../lib/hooks/usePricingData"
import { usePricingFilters } from "../../lib/hooks/usePricingFilters"

export default function PricingPage() {
  const {
    pricingPlans,
    addons,
    comparisonFeatures,
    faqs,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
  } = usePricingData()

  const { billingCycle, setBillingCycle } = usePricingFilters()

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Pricing"
        subtitle="Choose Your Plan"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingHeader />
          <BillingToggle
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />
          <PricingCards billingCycle={billingCycle} />
          <AddonsSection addonsList={addons} />
          <ComparisonTable features={comparisonFeatures} />
          <FAQSection faqList={faqs} />
          <CTABanner />
        </div>
      </div>
    </div>
  )
}
