import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { getActivityIcon, getActivityColor, type RecentActivity as RecentActivityType } from "../../lib/progressData"

interface RecentActivityProps {
  activities: RecentActivityType[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function RecentActivity({ activities, selectedCategory, setSelectedCategory }: RecentActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
        <div className="flex gap-2">
          {["all", "tutorial", "practice", "achievement"].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {activities
          .filter(activity => selectedCategory === "all" || activity.type === selectedCategory)
          .map((activity, index) => {
            const Icon = getActivityIcon(activity.type, activity.status)
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    activity.status === "completed" || activity.status === "earned"
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                      : 'bg-slate-700'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      activity.status === "completed" || activity.status === "earned"
                        ? 'text-white'
                        : 'text-slate-400'
                    }`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        {activity.score && (
                          <span className="px-2 py-1 bg-slate-800/50 rounded-full">
                            {activity.score}% score
                          </span>
                        )}
                        {activity.timeSpent && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {activity.timeSpent}
                          </span>
                        )}
                        <span>{activity.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.type === "tutorial" ? "bg-blue-500/20 text-blue-400" :
                        activity.type === "practice" ? "bg-purple-500/20 text-purple-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {activity.category}
                      </span>
                      <span className={`text-sm ${
                        activity.status === "completed" || activity.status === "earned"
                          ? 'text-green-400'
                          : 'text-slate-400'
                      }`}>
                        {activity.status === "completed" ? "Completed" :
                         activity.status === "earned" ? "Earned" : "In Progress"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
      </div>
    </motion.div>
  )
}