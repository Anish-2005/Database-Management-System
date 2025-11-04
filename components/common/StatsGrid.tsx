import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

export interface StatItem {
  label: string
  value: string
  iconName: string
  color: string
}

interface StatsGridProps {
  stats: StatItem[]
  columns?: number
  className?: string
  animationDelay?: number
  valueSize?: 'text-2xl' | 'text-3xl'
}

export const StatsGrid = ({
  stats,
  columns = 4,
  className = "mb-12",
  animationDelay = 0.1,
  valueSize = "text-2xl"
}: StatsGridProps) => {
  // Dynamic icon mapping - this will need to be expanded based on usage
  const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, any> = {
      Users: require("lucide-react").Users,
      MessageSquare: require("lucide-react").MessageSquare,
      Award: require("lucide-react").Award,
      Star: require("lucide-react").Star,
      BookOpen: require("lucide-react").BookOpen,
      Target: require("lucide-react").Target,
      Trophy: require("lucide-react").Trophy,
      Globe: require("lucide-react").Globe,
      Clock: require("lucide-react").Clock,
    }
    return iconMap[iconName] || require("lucide-react").Users
  }

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-4"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay }}
      className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6 ${className}`}
    >
      {stats.map((stat, index) => {
        const IconComponent = getIconComponent(stat.iconName)

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className={`${valueSize} font-bold text-white mb-1`}>{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}