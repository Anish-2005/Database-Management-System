import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"

export function PricingHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <motion.span
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <CreditCard className="w-4 h-4" />
        Flexible Pricing Plans
      </motion.span>
      <h1 className="text-5xl sm:text-6xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Simple,
        </span>
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Transparent Pricing
        </span>
      </h1>
      <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
        Choose the perfect plan for your needs. Start free and scale as you grow.
        All plans include our core features with no hidden fees.
      </p>
    </motion.div>
  )
}