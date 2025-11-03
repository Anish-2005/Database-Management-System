import { motion } from "framer-motion"

export function CTABanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 text-center"
    >
      <div className="relative p-12 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Our sales team is here to help you choose the right plan
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25"
            >
              Contact Sales
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl font-semibold text-white border border-slate-700"
            >
              Schedule Demo
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}