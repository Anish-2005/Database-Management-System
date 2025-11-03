"use client"

import { motion } from "framer-motion"

export default function LearningPathSection() {
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
          <h2 className="text-3xl font-bold text-white mb-4">Your Learning Journey</h2>
          <p className="text-slate-400">Follow our structured learning path to become a database expert</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Foundation", desc: "Database basics & SQL", progress: 100 },
            { step: 2, title: "Design", desc: "Schema design & normalization", progress: 75 },
            { step: 3, title: "Advanced", desc: "Performance & optimization", progress: 45 },
            { step: 4, title: "Mastery", desc: "Architecture & scaling", progress: 20 }
          ].map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold">
                {phase.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{phase.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{phase.desc}</p>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${phase.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              <span className="text-xs text-slate-500">{phase.progress}% Complete</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
