import { motion } from "framer-motion"

interface BillingToggleProps {
  billingCycle: 'monthly' | 'annual'
  setBillingCycle: (cycle: 'monthly' | 'annual') => void
}

export function BillingToggle({ billingCycle, setBillingCycle }: BillingToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex justify-center items-center gap-4 mb-12"
    >
      <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
        Monthly
      </span>
      <motion.button
        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
        className="relative w-16 h-8 bg-slate-800 rounded-full border border-slate-700"
      >
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          animate={{ x: billingCycle === 'annual' ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
      <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
        Annual
      </span>
      {billingCycle === 'annual' && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400"
        >
          Save 17%
        </motion.span>
      )}
    </motion.div>
  )
}