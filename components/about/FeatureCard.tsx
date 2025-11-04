import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Target,
  BarChart3,
  Database,
  Brain,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle
} from "lucide-react"
import { AboutFeature } from "../../lib/aboutData"

const iconMap = {
  BookOpen,
  Target,
  BarChart3,
  Database,
  Brain,
  Users
} as const

interface FeatureCardProps {
  feature: AboutFeature
  isExpanded: boolean
  onToggle: () => void
  index: number
}

export const FeatureCard = ({ feature, isExpanded, onToggle, index }: FeatureCardProps) => {
  const IconComponent = iconMap[feature.iconName as keyof typeof iconMap]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-700 pt-4"
            >
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <motion.li
                    key={detailIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: detailIndex * 0.1 }}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}