"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Background from "../components/Background"
import HeroSection from "../components/home/HeroSection"
import FeaturesSection from "../components/home/FeaturesSection"
import ArchitectureSection from "../components/home/ArchitectureSection"
import CapabilitiesSection from "../components/home/CapabilitiesSection"
import PerformanceSection from "../components/home/PerformanceSection"
import CTASection from "../components/home/CTASection"
import Footer from "../components/Footer"

export default function AdvancedDBMSLandingPage() {
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

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />
      <Navbar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <CapabilitiesSection />
      <PerformanceSection />
      <CTASection />
      <Footer />
    </div>
  )
}
