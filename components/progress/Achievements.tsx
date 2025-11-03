import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { achievements, progressStats, getRarityColor, type Achievement as AchievementType } from "../../lib/progressData"

interface AchievementsProps {
  achievementsList: AchievementType[]
  stats: typeof progressStats
}

export function Achievements({ achievementsList, stats }: AchievementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
        <div className="text-sm text-slate-400">
          {stats.achievements}/{stats.totalAchievements} unlocked
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementsList.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-3xl border transition-all duration-300 ${
                achievement.earned
                  ? 'bg-slate-900/30 backdrop-blur-sm border-slate-700 hover:border-purple-500/50'
                  : 'bg-slate-900/20 backdrop-blur-sm border-slate-700/50 opacity-75'
              }`}
            >
              {achievement.earned && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  achievement.earned
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}`
                    : 'bg-slate-700'
                }`}>
                  <Icon className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-slate-400'}`} />
                </div>

                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    achievement.earned ? 'text-white' : 'text-slate-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">{achievement.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        achievement.rarity === "legendary" ? "bg-yellow-500/20 text-yellow-400" :
                        achievement.rarity === "epic" ? "bg-purple-500/20 text-purple-400" :
                        achievement.rarity === "rare" ? "bg-blue-500/20 text-blue-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {achievement.rarity}
                      </span>
                      <span className="text-xs text-slate-500">{achievement.points} pts</span>
                    </div>

                    {achievement.earned && (
                      <div className="text-xs text-slate-500">
                        Earned {achievement.earnedDate}
                      </div>
                    )}
                  </div>

                  {!achievement.earned && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}