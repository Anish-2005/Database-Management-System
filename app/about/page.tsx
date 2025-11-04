"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import { useAboutData } from "../../lib/hooks/useAboutData"
import { useAboutManagement } from "../../lib/hooks/useAboutManagement"
import { AboutHeader } from "../../components/about/AboutHeader"
import { MissionStatement } from "../../components/about/MissionStatement"
import { PlatformStats } from "../../components/about/PlatformStats"
import { FeaturesSection } from "../../components/about/FeaturesSection"
import { TestimonialsSection } from "../../components/about/TestimonialsSection"
import { VisionValues } from "../../components/about/VisionValues"
import { CallToAction } from "../../components/about/CallToAction"

export default function AboutPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const { data } = useAboutData()
  const { state, toggleFeatureExpansion } = useAboutManagement()

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

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="About"
        subtitle="About Platform"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={state.isMenuOpen}
        setIsMenuOpen={useAboutManagement().toggleMenu}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <AboutHeader />

          {/* Mission Statement */}
          <MissionStatement />

          {/* Platform Stats */}
          <PlatformStats stats={data.stats} />

          {/* Features */}
          <FeaturesSection
            features={data.features}
            expandedFeature={state.expandedFeature}
            onToggleFeature={toggleFeatureExpansion}
          />

          {/* Testimonials */}
          <TestimonialsSection testimonials={data.testimonials} />

          {/* Vision & Values */}
          <VisionValues values={data.values} />

          {/* Call to Action */}
          <CallToAction />
        </div>
      </div>
    </div>
  )
}