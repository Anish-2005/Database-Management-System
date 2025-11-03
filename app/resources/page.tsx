"use client"

import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import { ResourcesHeader } from "../../components/resources/ResourcesHeader"
import { QuickStats } from "../../components/resources/QuickStats"
import { SearchFiltersSection } from "../../components/resources/SearchFiltersSection"
import { ResourcesGrid } from "../../components/resources/ResourcesGrid"
import { FeaturedTools } from "../../components/resources/FeaturedTools"
import { useResourcesData } from "../../lib/hooks/useResourcesData"
import { useResourcesFilters } from "../../lib/hooks/useResourcesFilters"
import { useResourcesInteractions } from "../../lib/hooks/useResourcesInteractions"

export default function ResourcesPage() {
  const { isMenuOpen, setIsMenuOpen, isPlaying, setIsPlaying } = useResourcesData()
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery, filteredResources } = useResourcesFilters()
  const { copiedId, copyToClipboard } = useResourcesInteractions()

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Resources"
        subtitle="Resources & Tools"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResourcesHeader />
          <QuickStats />
          <SearchFiltersSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <ResourcesGrid
            filteredResources={filteredResources}
            copiedId={copiedId}
            copyToClipboard={copyToClipboard}
          />
          <FeaturedTools />
        </div>
      </div>
    </div>
  )
}