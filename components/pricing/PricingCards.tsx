import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { pricingPlans, type PricingPlan } from "../../lib/pricingData"

interface PricingCardsProps {
  billingCycle: 'monthly' | 'annual'
}

export function PricingCards({ billingCycle }: PricingCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid md:grid-cols-3 gap-8 mb-16"
    >
      {pricingPlans.map((plan, index) => {
        const Icon = plan.icon
        const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual
        const displayPrice = billingCycle === 'annual' ? Math.floor(price / 12) : price

        return (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all ${
              plan.popular
                ? 'bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/50 shadow-2xl shadow-purple-500/20'
                : 'bg-slate-900/30 border-slate-700 hover:border-purple-500/30'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-medium text-white shadow-lg">
                  Most Popular
                </div>
              </div>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg mb-6`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Plan Info */}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">${displayPrice}</span>
                <span className="text-slate-400">/month</span>
              </div>
              {billingCycle === 'annual' && price > 0 && (
                <p className="text-sm text-slate-500 mt-1">Billed annually at ${price}</p>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-6 py-3 rounded-xl font-semibold mb-6 transition-all ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800/40 text-white hover:bg-slate-700/40 border border-slate-700'
              }`}
            >
              {plan.cta}
            </motion.button>

            {/* Features */}
            <div className="space-y-3">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}