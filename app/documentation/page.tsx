"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import { DocumentationHeader } from "../../components/documentation/DocumentationHeader"
import { DocumentationFilters } from "../../components/documentation/DocumentationFilters"
import { DocumentationGrid } from "../../components/documentation/DocumentationGrid"
import { DocumentationDetailModal } from "../../components/documentation/DocumentationDetailModal"
import { QuickLinks } from "../../components/documentation/QuickLinks"
import { useDocumentationData } from "../../lib/hooks/useDocumentationData"
import { useDocumentationFilters } from "../../lib/hooks/useDocumentationFilters"
import { useDocumentationManagement } from "../../lib/hooks/useDocumentationManagement"

export default function DocumentationPage() {
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

  // Custom hooks for state management
  const { docs, bookmarkedDocs, toggleBookmark } = useDocumentationData()
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory, filteredDocs, categories } = useDocumentationFilters(docs)
  const { activeDoc, copiedCodeId, openDoc, closeDoc, copyToClipboard } = useDocumentationManagement()

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Documentation"
        subtitle="Comprehensive Database Docs"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DocumentationHeader />

          <DocumentationFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />

          <DocumentationGrid
            docs={filteredDocs}
            bookmarkedDocs={bookmarkedDocs}
            toggleBookmark={toggleBookmark}
            onDocClick={openDoc}
          />

          <QuickLinks />
        </div>
      </div>

      <DocumentationDetailModal
        activeDoc={activeDoc}
        copiedCodeId={copiedCodeId}
        onClose={closeDoc}
        onCopyCode={copyToClipboard}
      />
    </div>
  )
}
