"use client"

import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import { ProgressHeader } from "../../components/progress/ProgressHeader"
import { OverviewStats } from "../../components/progress/OverviewStats"
import { SkillProgress } from "../../components/progress/SkillProgress"
import { Achievements } from "../../components/progress/Achievements"
import { RecentActivity } from "../../components/progress/RecentActivity"
import { LearningInsights } from "../../components/progress/LearningInsights"
import { useProgressData } from "../../lib/hooks/useProgressData"
import { useProgressFilters } from "../../lib/hooks/useProgressFilters"
import { AlertTriangle, LogIn } from "lucide-react"

export default function ProgressPage() {
  const {
    progressStats,
    recentActivity,
    achievements,
    skillProgress,
    learningInsights,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
    isLoggedIn,
    isLoading
  } = useProgressData()

  const {
    selectedTimeframe,
    setSelectedTimeframe,
    selectedCategory,
    setSelectedCategory,
    filteredActivity,
  } = useProgressFilters(recentActivity)

  return (
    <div className="app-shell">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Progress"
        subtitle="Progress Dashboard"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="app-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressHeader />

          {/* Login Warning */}
          {!isLoggedIn && (
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-yellow-400 font-medium">Login Required for Progress Tracking</p>
                  <p className="text-yellow-300/80 text-sm">
                    Sign in to track your learning progress, view personalized statistics, and unlock achievements. Without logging in, you'll see sample data only.
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
              <OverviewStats stats={progressStats} />
              <SkillProgress
                skills={skillProgress}
                selectedTimeframe={selectedTimeframe}
                setSelectedTimeframe={setSelectedTimeframe}
              />
              <Achievements achievementsList={achievements} stats={progressStats} />
              <RecentActivity
                activities={filteredActivity}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <LearningInsights insights={learningInsights} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
