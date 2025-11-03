import { motion } from "framer-motion"
import { Brain } from "lucide-react"
import { skillProgress, type SkillProgress as SkillProgressType } from "../../lib/progressData"

interface SkillProgressProps {
  skills: SkillProgressType[]
  selectedTimeframe: string
  setSelectedTimeframe: (timeframe: string) => void
}

export function SkillProgress({ skills, selectedTimeframe, setSelectedTimeframe }: SkillProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Skill Development</h2>
        <div className="flex gap-2">
          {["week", "month", "all"].map((timeframe) => (
            <motion.button
              key={timeframe}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedTimeframe === timeframe
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.skill}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center`}>
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{skill.skill}</h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    skill.level === "Expert" ? "bg-green-500/20 text-green-400" :
                    skill.level === "Advanced" ? "bg-blue-500/20 text-blue-400" :
                    skill.level === "Intermediate" ? "bg-purple-500/20 text-purple-400" :
                    "bg-orange-500/20 text-orange-400"
                  }`}>
                    {skill.level}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{skill.progress}%</div>
                <div className="text-sm text-slate-400">Complete</div>
              </div>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">
              <motion.div
                className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.progress}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}