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

export default function ProgressPage() {
  const {
    progressStats,
    achievements,
    skillProgress,
    learningInsights,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
  } = useProgressData()

  const {
    selectedTimeframe,
    setSelectedTimeframe,
    selectedCategory,
    setSelectedCategory,
    filteredActivity,
  } = useProgressFilters()

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
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

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressHeader />
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
        </div>
      </div>
    </div>
  )
}