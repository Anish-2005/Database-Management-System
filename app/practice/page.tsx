"use client"

import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import Footer from "../../components/Footer"
import { PracticeHeader } from "../../components/practice/PracticeHeader"
import { PracticeStats } from "../../components/practice/PracticeStats"
import { PracticeFilters } from "../../components/practice/PracticeFilters"
import { PracticeChallenges } from "../../components/practice/PracticeChallenges"
import { PracticeAchievements } from "../../components/practice/PracticeAchievements"
import { PracticeModal } from "../../components/practice/PracticeModal"
import { usePracticeData } from "../../lib/hooks/usePracticeData"
import { usePracticeFilters } from "../../lib/hooks/usePracticeFilters"
import { usePracticeQuiz } from "../../lib/hooks/usePracticeQuiz"
import { AlertTriangle, LogIn } from "lucide-react"

export default function PracticePage() {
  const {
    practiceChallenges,
    practiceAchievements,
    practiceStats,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
    completedChallenges,
    setCompletedChallenges,
    getDifficultyColor,
    isLoggedIn,
    isLoading
  } = usePracticeData()

  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredChallenges,
    categories,
  } = usePracticeFilters()

  const {
    selectedChallenge,
    currentQuestion,
    selectedAnswer,
    setSelectedAnswer,
    showResult,
    score,
    startChallenge,
    submitAnswer,
    closeChallenge,
    isSubmitting,
    pointsEarned
  } = usePracticeQuiz()

  const handleStartChallenge = (challenge: any) => {
    if (!isLoggedIn) {
      alert("Please log in to save your progress and unlock achievements!")
      return
    }
    startChallenge(challenge)
  }

  const handleSubmitAnswer = () => {
    submitAnswer()
    // Update completed challenges when quiz is finished
    if (selectedChallenge && currentQuestion === selectedChallenge.questions.length - 1) {
      setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
    }
  }

  const filteredPracticeChallenges = filteredChallenges(practiceChallenges)

  return (
    <div className="app-shell">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Practice"
        subtitle="Practice | Challenge | Excel"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="app-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PracticeHeader />

          {/* Login Warning */}
          {!isLoggedIn && (
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-yellow-400 font-medium">Login Required for Progress Tracking</p>
                  <p className="text-yellow-300/80 text-sm">
                    Sign in to save your progress, unlock achievements, and track your statistics. Without logging in, your progress won't be saved.
                  </p>
                </div>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg border border-yellow-500/30 transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : (
            <>
              <PracticeStats stats={practiceStats} />
              <PracticeFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
              />
              <PracticeChallenges
                challenges={filteredPracticeChallenges}
                completedChallenges={completedChallenges}
                getDifficultyColor={getDifficultyColor}
                onStartChallenge={handleStartChallenge}
              />
              <PracticeAchievements achievements={practiceAchievements} />
            </>
          )}
        </div>
      </div>
      <Footer />

      <PracticeModal
        selectedChallenge={selectedChallenge}
        currentQuestion={currentQuestion}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        showResult={showResult}
        score={score}
        onSubmitAnswer={handleSubmitAnswer}
        onCloseChallenge={closeChallenge}
        onStartChallenge={handleStartChallenge}
        isSubmitting={isSubmitting}
        pointsEarned={pointsEarned}
      />
    </div>
  )
}
