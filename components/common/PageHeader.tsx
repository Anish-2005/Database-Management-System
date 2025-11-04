import { motion, HTMLMotionProps } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  badge: {
    icon: LucideIcon
    text: string
  }
  title: {
    primary: string
    secondary: string
  }
  description: string
  className?: string
}

export const PageHeader = ({
  badge,
  title,
  description,
  className = "text-center mb-16"
}: PageHeaderProps) => {
  const IconComponent = badge.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <motion.span
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <IconComponent className="w-4 h-4" />
        {badge.text}
      </motion.span>
      <h1 className="text-5xl sm:text-6xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title.primary}
        </span>
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {title.secondary}
        </span>
      </h1>
      <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}