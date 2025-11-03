"use client"

import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import { PracticeHeader } from "../../components/practice/PracticeHeader"
import { PracticeStats } from "../../components/practice/PracticeStats"
import { PracticeFilters } from "../../components/practice/PracticeFilters"
import { PracticeChallenges } from "../../components/practice/PracticeChallenges"
import { PracticeAchievements } from "../../components/practice/PracticeAchievements"
import { PracticeModal } from "../../components/practice/PracticeModal"
import { usePracticeData } from "../../lib/hooks/usePracticeData"
import { usePracticeFilters } from "../../lib/hooks/usePracticeFilters"
import { usePracticeQuiz } from "../../lib/hooks/usePracticeQuiz"

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
  } = usePracticeQuiz()

  const handleStartChallenge = (challenge: any) => {
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
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Practice"
        subtitle="Practice • Challenge • Excel"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PracticeHeader />
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
        </div>
      </div>

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
      />
    </div>
  )
}