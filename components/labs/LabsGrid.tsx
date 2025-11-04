"use client"

import { motion } from "framer-motion"
import { Search, Clock, Users, Star, CheckCircle, Bookmark, Heart, Code, Database, BarChart3, Layers, Zap, Target, Brain, TrendingUp } from "lucide-react"
import { Lab } from '../../lib/labsData'

interface LabsGridProps {
  isLoading: boolean
  filteredLabs: Lab[]
  labProgress: Record<string, number>
  bookmarkedLabs: Set<string>
  favoriteLabs: Set<string>
  toggleBookmark: (id: string) => void
  toggleFavorite: (id: string) => void
  onLabClick: (lab: Lab) => void
  getDifficultyColor: (difficulty: string) => string
}

export default function LabsGrid({
  isLoading,
  filteredLabs,
  labProgress,
  bookmarkedLabs,
  favoriteLabs,
  toggleBookmark,
  toggleFavorite,
  onLabClick,
  getDifficultyColor
}: LabsGridProps) {
  // Icon mapping function
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Database,
      BarChart3,
      Layers,
      Zap,
      Target,
      Brain,
      TrendingUp
    }
    return iconMap[iconName] || Database
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
    >
      {isLoading ? (
        // Loading skeleton
        Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700"
          >
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-slate-700 rounded-2xl mb-4"></div>
              <div className="h-6 bg-slate-700 rounded mb-2"></div>
              <div className="h-4 bg-slate-700 rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-slate-700 rounded-full w-16"></div>
                <div className="h-6 bg-slate-700 rounded-full w-20"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="h-4 bg-slate-700 rounded w-12"></div>
                  <div className="h-4 bg-slate-700 rounded w-16"></div>
                </div>
                <div className="h-6 bg-slate-700 rounded-full w-16"></div>
              </div>
            </div>
          </motion.div>
        ))
      ) : filteredLabs.length === 0 ? (
        // No results
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-full text-center py-16"
        >
          <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No labs found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        // Lab cards
        filteredLabs.map((lab, index) => {
          const IconComponent = getIconComponent(lab.icon)
          return (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
              }}
              className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer overflow-hidden"
              onClick={() => onLabClick(lab)}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

              {/* Code Preview Overlay */}
              {lab.codeExamples && lab.codeExamples.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-4 bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-600 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none"
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-medium text-slate-300">Code Preview</span>
                    </div>
                    <pre className="text-xs text-slate-400 flex-1 overflow-hidden bg-slate-800/50 p-2 rounded border border-slate-700">
                      <code className="language-sql">
                        {lab.codeExamples[0].code.split('\n').slice(0, 6).join('\n')}
                        {lab.codeExamples[0].code.split('\n').length > 6 && '\n...'}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              )}

              <div className="relative z-20">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${lab.gradient} flex items-center justify-center shadow-lg mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                      {lab.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{lab.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(lab.id)
                      }}
                      className={`p-2 rounded-xl transition-all ${
                        bookmarkedLabs.has(lab.id)
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-800/40 text-slate-400 hover:text-blue-400 border border-slate-700 hover:border-blue-500/30'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedLabs.has(lab.id) ? 'fill-current' : ''}`} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(lab.id)
                      }}
                      className={`p-2 rounded-xl transition-all ${
                        favoriteLabs.has(lab.id)
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-slate-800/40 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favoriteLabs.has(lab.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {lab.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="text-xs px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                {labProgress[lab.id] !== undefined && labProgress[lab.id] > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Progress</span>
                      <span>{labProgress[lab.id]}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${labProgress[lab.id]}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{lab.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{lab.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lab.difficulty)}`}>
                      {lab.difficulty}
                    </span>
                    {lab.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>

                {/* Rating and Environment */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-300">{lab.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">{lab.environment}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })
      )}
    </motion.div>
  )
}