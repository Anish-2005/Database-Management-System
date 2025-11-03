"use client"

import { motion } from "framer-motion"
import { Clock, Star, CheckCircle } from "lucide-react"
import { PracticeChallenge } from "../../lib/practiceData"

interface PracticeChallengesProps {
  challenges: PracticeChallenge[]
  completedChallenges: Set<number>
  getDifficultyColor: (difficulty: string) => string
  onStartChallenge: (challenge: PracticeChallenge) => void
}

export const PracticeChallenges = ({
  challenges,
  completedChallenges,
  getDifficultyColor,
  onStartChallenge
}: PracticeChallengesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
    >
      {challenges.map((challenge, index) => {
        const Icon = challenge.icon
        const isCompleted = completedChallenges.has(challenge.id)

        return (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
            }}
            className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer overflow-hidden"
            onClick={() => onStartChallenge(challenge)}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${challenge.gradient} flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">{challenge.description}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{challenge.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{challenge.points}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  {isCompleted && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>{challenge.category}</span>
                  <span>{challenge.type}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}