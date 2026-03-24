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
import { useAuth } from "../../lib/contexts/AuthContext"

// Tutorials Container Component - Manages all state and logic
function TutorialsContainer() {
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null)
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)

  // Use custom hooks
  const { tutorials, categories } = useTutorialData()
  const { userPreferences, settings, setSettings, resetSettings, saveSettings, resetAllProgress, showResetConfirm, setShowResetConfirm } = useTutorialSettings()
  const filters = useTutorialFilters(tutorials, userPreferences)
  const quiz = useTutorialQuiz()
  const { user } = useAuth()
  const interactions = useTutorialInteractions(user)

  // Authenticated interaction functions
  const toggleBookmark = async (tutorialId: number) => {
    if (!user) {
      setAuthError("Please sign in to bookmark tutorials")
      setTimeout(() => setAuthError(null), 3000)
      return
    }
    await interactions.toggleBookmark(tutorialId)
  }

  const toggleFavorite = async (tutorialId: number) => {
    if (!user) {
      setAuthError("Please sign in to like tutorials")
      setTimeout(() => setAuthError(null), 3000)
      return
    }
    await interactions.toggleFavorite(tutorialId)
  }

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

      {/* Authentication Error Message */}
      {authError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm font-medium shadow-lg"
        >
          {authError}
        </motion.div>
      )}

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
        toggleBookmark={toggleBookmark}
        toggleFavorite={toggleFavorite}
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
    <div className="app-shell">
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

      <div className="app-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TutorialsContainer />
        </div>
      </div>
    </div>
  )
}
