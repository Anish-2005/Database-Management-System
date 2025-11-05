"use client"

import { motion } from "framer-motion"
import { Trophy, Code, Zap, Database } from "lucide-react"
import { PracticeAchievement } from "../../lib/practiceData"

// Icon mapping for dynamic icon names
const iconMap: Record<string, any> = {
  Code,
  Zap,
  Database,
  Trophy
}

interface PracticeAchievementsProps {
  achievements: PracticeAchievement[]
}

export const PracticeAchievements = ({ achievements }: PracticeAchievementsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Recent Achievements</h2>
          <p className="text-slate-400">Celebrate your progress and unlock new challenges</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = typeof achievement.icon === 'string' ? iconMap[achievement.icon] : achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                    : 'bg-slate-800/40 border-slate-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                    : 'bg-slate-700'
                }`}>
                  {Icon && <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`} />}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${achievement.unlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                  {achievement.desc}
                </p>
                {achievement.unlocked && (
                  <div className="mt-3 flex items-center gap-1 text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs">Unlocked!</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}