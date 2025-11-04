"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Database,
  Code,
  Layers,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
  Copy,
  Check,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import HeaderSection from "../../components/tutorials/HeaderSection"
import SearchFiltersSection from "../../components/tutorials/SearchFiltersSection"
import AdvancedFiltersSection from "../../components/tutorials/AdvancedFiltersSection"
import TutorialsGridSection from "../../components/tutorials/TutorialsGridSection"
import LearningPathSection from "../../components/tutorials/LearningPathSection"
import LearningAnalyticsSection from "../../components/tutorials/LearningAnalyticsSection"
import TutorialDetailModal from "../../components/tutorials/TutorialDetailModal"
import SettingsModal from "../../components/tutorials/SettingsModal"

// Import hooks
import { useTutorialData } from "../../lib/hooks/useTutorialData"
import { useTutorialFilters } from "../../lib/hooks/useTutorialFilters"
import { useTutorialInteractions } from "../../lib/hooks/useTutorialInteractions"
import { useTutorialQuiz } from "../../lib/hooks/useTutorialQuiz"
import { useTutorialSettings } from "../../lib/hooks/useTutorialSettings"

// Tutorials Container Component - Manages all state and logic
function TutorialsContainer() {
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null)
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)

  // Use custom hooks
  const { tutorials, categories } = useTutorialData()
  const { userPreferences, settings, setSettings, resetSettings, saveSettings, resetAllProgress, showResetConfirm, setShowResetConfirm } = useTutorialSettings()
  const filters = useTutorialFilters(tutorials, userPreferences)
  const interactions = useTutorialInteractions()
  const quiz = useTutorialQuiz()

  // Copy code to clipboard
  const copyToClipboard = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCodeId(codeId)
      setTimeout(() => setCopiedCodeId(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-500/10"
      case "Intermediate": return "text-yellow-400 bg-yellow-500/10"
      case "Advanced": return "text-red-400 bg-red-500/10"
      default: return "text-slate-400 bg-slate-500/10"
    }
  }

  return (
    <>
      {/* Header Section */}
      <HeaderSection />

      {/* Search and Filters Section */}
      <SearchFiltersSection
        searchQuery={filters.searchQuery}
        setSearchQuery={filters.setSearchQuery}
        activeCategory={filters.activeCategory}
        setActiveCategory={filters.setActiveCategory}
        categories={categories}
        showAdvancedFilters={filters.showAdvancedFilters}
        setShowAdvancedFilters={filters.setShowAdvancedFilters}
        setShowSettings={() => {}} // Will be implemented
      />

      {/* Advanced Filters Section */}
      <AdvancedFiltersSection
        showAdvancedFilters={filters.showAdvancedFilters}
        setShowAdvancedFilters={filters.setShowAdvancedFilters}
        difficultyFilter={filters.difficultyFilter}
        setDifficultyFilter={filters.setDifficultyFilter}
        durationFilter={filters.durationFilter}
        setDurationFilter={filters.setDurationFilter}
        ratingFilter={filters.ratingFilter}
        setRatingFilter={filters.setRatingFilter}
        instructorFilter={filters.instructorFilter}
        setInstructorFilter={filters.setInstructorFilter}
      />

     

      {/* Tutorials Grid Section */}
      <TutorialsGridSection
        isLoading={filters.isLoading}
        filteredTutorials={filters.filteredTutorials}
        bookmarkedTutorials={interactions.bookmarkedTutorials}
        favoriteTutorials={interactions.favoriteTutorials}
        tutorialProgress={interactions.tutorialProgress}
        toggleBookmark={interactions.toggleBookmark}
        toggleFavorite={interactions.toggleFavorite}
        setSelectedTutorial={setSelectedTutorial}
        getDifficultyColor={getDifficultyColor}
      />

      {/* Learning Path Section */}
      <LearningPathSection />

      {/* Learning Analytics Section */}
      <LearningAnalyticsSection
        tutorialProgress={interactions.tutorialProgress}
        tutorials={tutorials}
      />

      {/* Tutorial Detail Modal */}
      <TutorialDetailModal
        selectedTutorial={selectedTutorial}
        setSelectedTutorial={setSelectedTutorial}
        getDifficultyColor={getDifficultyColor}
        copiedCodeId={copiedCodeId}
        copyToClipboard={copyToClipboard}
        showQuiz={quiz.showQuiz}
        setShowQuiz={quiz.setShowQuiz}
        quizAnswers={quiz.quizAnswers}
        handleQuizAnswer={quiz.handleQuizAnswer}
        quizSubmitted={quiz.quizSubmitted}
        submitQuiz={quiz.submitQuiz}
        calculateQuizScore={quiz.calculateQuizScore as any}
        resetQuiz={quiz.resetQuiz}
      />

      {/* Settings Modal */}
      <SettingsModal
        showSettings={false} // Will be controlled by a button
        setShowSettings={() => {}}
        settings={settings}
        setSettings={setSettings}
        resetSettings={resetSettings}
        saveSettings={saveSettings}
        resetProgress={resetAllProgress}
        showResetConfirm={showResetConfirm}
        setShowResetConfirm={setShowResetConfirm}
      />
    </>
  )
}

export default function TutorialsPage() {
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

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Tutorials"
        subtitle="Learn • Practice • Master"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TutorialsContainer />
        </div>
      </div>
    </div>
  )
}