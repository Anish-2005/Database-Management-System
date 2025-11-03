import { motion } from "framer-motion"
import { FileText, Wrench, BookOpen, Star } from "lucide-react"
import { resources } from "../../lib/resourcesData"

export function QuickStats() {
  const stats = [
    { label: "Resources", value: resources.length, icon: FileText, color: "from-blue-500 to-cyan-500" },
    { label: "Tools", value: resources.filter(r => r.category === "Tools").length, icon: Wrench, color: "from-purple-500 to-pink-500" },
    { label: "Documentation", value: resources.filter(r => r.category === "Documentation").length, icon: BookOpen, color: "from-green-500 to-emerald-500" },
    { label: "Learning", value: resources.filter(r => r.category === "Learning").length, icon: Star, color: "from-orange-500 to-red-500" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid md:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
        >
          <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-slate-400">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}