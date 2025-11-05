import { motion } from "framer-motion"
import { TrendingUp, Target, Flame } from "lucide-react"
import { learningInsights, type LearningInsight } from "../../lib/progressData"

// Icon mapping for dynamic icon names
const iconMap: Record<string, any> = {
  TrendingUp,
  Target,
  Flame
}

interface LearningInsightsProps {
  insights: LearningInsight[]
}

export function LearningInsights({ insights }: LearningInsightsProps) {
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
          <h2 className="text-3xl font-bold text-white mb-4">Learning Insights</h2>
          <p className="text-slate-400">AI-powered recommendations to accelerate your progress</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => {
            const Icon = typeof insight.icon === 'string' ? iconMap[insight.icon] : insight.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-2xl flex items-center justify-center mb-4`}>
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{insight.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 px-4 bg-gradient-to-r ${insight.color} text-white rounded-xl font-medium shadow-lg`}
                >
                  {insight.action}
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}