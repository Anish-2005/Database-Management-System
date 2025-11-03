import { motion } from "framer-motion"
import { faqs, type FAQ } from "../../lib/pricingData"

interface FAQSectionProps {
  faqList: FAQ[]
}

export function FAQSection({ faqList }: FAQSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-slate-400">Everything you need to know about our pricing</p>
      </div>

      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
            <p className="text-slate-400">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}