import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { comparisonFeatures, type ComparisonFeature } from "../../lib/pricingData"

interface ComparisonTableProps {
  features: ComparisonFeature[]
}

export function ComparisonTable({ features }: ComparisonTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Plan Comparison</h2>
        <p className="text-slate-400">Compare features across all plans</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-slate-700 bg-slate-800/40">
            <div className="font-semibold text-white">Feature</div>
            <div className="text-center font-semibold text-white">Starter</div>
            <div className="text-center font-semibold text-white">Professional</div>
            <div className="text-center font-semibold text-white">Enterprise</div>
          </div>

          {/* Rows */}
          {features.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-4 p-6 ${
                index !== features.length - 1 ? 'border-b border-slate-700/50' : ''
              }`}
            >
              <div className="text-slate-300">{row.feature}</div>
              <div className="text-center">
                {typeof row.starter === 'boolean' ? (
                  row.starter ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : (
                    <span className="text-slate-500">—</span>
                  )
                ) : (
                  <span className="text-slate-300">{row.starter}</span>
                )}
              </div>
              <div className="text-center">
                {typeof row.pro === 'boolean' ? (
                  row.pro ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : (
                    <span className="text-slate-500">—</span>
                  )
                ) : (
                  <span className="text-slate-300">{row.pro}</span>
                )}
              </div>
              <div className="text-center">
                {typeof row.enterprise === 'boolean' ? (
                  row.enterprise ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : (
                    <span className="text-slate-500">—</span>
                  )
                ) : (
                  <span className="text-slate-300">{row.enterprise}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}