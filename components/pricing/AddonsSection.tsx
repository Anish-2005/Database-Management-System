import { motion } from "framer-motion"
import { addons, type Addon } from "../../lib/pricingData"

interface AddonsSectionProps {
  addonsList: Addon[]
}

export function AddonsSection({ addonsList }: AddonsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Available Add-ons</h2>
        <p className="text-slate-400">Customize your plan with additional features</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {addonsList.map((addon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all text-center"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${addon.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <addon.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{addon.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{addon.price}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700 text-sm"
            >
              Add to Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}