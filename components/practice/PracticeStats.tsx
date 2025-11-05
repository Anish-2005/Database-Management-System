"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Zap, Target } from "lucide-react"
import { PracticeStats as PracticeStatsType } from "../../lib/practiceData"

// Icon mapping for dynamic icon names
const iconMap: Record<string, any> = {
  Trophy,
  Star,
  Zap,
  Target
}

interface PracticeStatsProps {
  stats: PracticeStatsType[]
}

export const PracticeStats = ({ stats }: PracticeStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid md:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat, index) => {
        const Icon = typeof stat.icon === 'string' ? iconMap[stat.icon] : stat.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              {Icon && <Icon className="w-6 h-6 text-white" />}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}