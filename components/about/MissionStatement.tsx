import { motion } from "framer-motion"
import { Rocket } from "lucide-react"

export const MissionStatement = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl mb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

      <div className="relative z-10 text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Rocket className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          To democratize database education by providing an immersive, interactive learning
          experience that combines cutting-edge technology with proven pedagogical methods.
          We believe that understanding databases shouldn't be a privilege reserved for
          computer science graduates—it should be accessible to anyone with curiosity and determination.
        </p>
      </div>
    </motion.div>
  )
}