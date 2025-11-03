import { motion } from "framer-motion"
import { featuredTools } from "../../lib/resourcesData"

export function FeaturedTools() {
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
          <h2 className="text-3xl font-bold text-white mb-4">Essential Database Tools</h2>
          <p className="text-slate-400">Professional-grade tools to enhance your database workflow</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{tool.description}</p>
              <div className="space-y-2">
                {tool.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}