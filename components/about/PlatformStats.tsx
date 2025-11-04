import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  Target,
  Trophy,
  Globe,
  Clock
} from "lucide-react"
import { AboutStat } from "../../lib/aboutData"

const iconMap = {
  Users,
  BookOpen,
  Target,
  Trophy,
  Globe,
  Clock
} as const

interface PlatformStatsProps {
  stats: AboutStat[]
}

export const PlatformStats = ({ stats }: PlatformStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
    >
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.iconName as keyof typeof iconMap]

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}