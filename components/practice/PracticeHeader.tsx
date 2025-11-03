"use client"

import { motion } from "framer-motion"
import { Target } from "lucide-react"

export const PracticeHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <motion.span
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <Target className="w-4 h-4" />
        Interactive Practice Platform
      </motion.span>
      <h1 className="text-5xl sm:text-6xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Test Your
        </span>
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Database Skills
        </span>
      </h1>
      <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
        Sharpen your database expertise with interactive challenges, quizzes, and coding exercises.
        Track your progress and earn points as you master database management.
      </p>
    </motion.div>
  )
}