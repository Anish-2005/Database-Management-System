import { motion } from "framer-motion"
import { BookOpen, Target, Flame, Trophy } from "lucide-react"
import { progressStats, type ProgressStats } from "../../lib/progressData"

interface OverviewStatsProps {
  stats: ProgressStats
}

export function OverviewStats({ stats }: OverviewStatsProps) {
  const overviewStats = [
    {
      label: "Tutorials Completed",
      value: `${stats.completedTutorials}/${stats.totalTutorials}`,
      percentage: Math.round((stats.completedTutorials / stats.totalTutorials) * 100),
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      trend: "+3 this week"
    },
    {
      label: "Practice Sessions",
      value: `${stats.completedPracticeSessions}/${stats.totalPracticeSessions}`,
      percentage: Math.round((stats.completedPracticeSessions / stats.totalPracticeSessions) * 100),
      icon: Target,
      color: "from-purple-500 to-pink-500",
      trend: "+5 this week"
    },
    {
      label: "Current Streak",
      value: `${stats.currentStreak} days`,
      percentage: Math.round((stats.currentStreak / stats.longestStreak) * 100),
      icon: Flame,
      color: "from-orange-500 to-red-500",
      trend: "Keep it up!"
    },
    {
      label: "Total Score",
      value: stats.totalScore.toLocaleString(),
      percentage: stats.averageScore,
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
      trend: `${stats.averageScore}% avg`
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {overviewStats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

          <div className="relative z-10">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400 mb-3">{stat.label}</div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <motion.div
                className={`h-2 bg-gradient-to-r ${stat.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${stat.percentage}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
              />
            </div>
            <div className="text-xs text-slate-500">{stat.percentage}% • {stat.trend}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}