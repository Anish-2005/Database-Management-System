import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

      <div className="relative z-10 text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Join thousands of learners who have transformed their understanding of databases.
          Start learning today and unlock your potential in database management.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/tutorials"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
          >
            Start Learning Now
          </motion.a>
          <motion.a
            href="/practice"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-700/50 transition-all"
          >
            Try Practice Challenges
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}