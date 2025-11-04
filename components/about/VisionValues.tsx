import { motion } from "framer-motion"
import {
  Lightbulb,
  Heart,
  Shield,
  Users
} from "lucide-react"
import { AboutValue } from "../../lib/aboutData"

const iconMap = {
  Lightbulb,
  Heart,
  Shield,
  Users
} as const

interface VisionValuesProps {
  values: AboutValue[]
}

export const VisionValues = ({ values }: VisionValuesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Our Vision & Values</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The principles that guide everything we do at QuantumDB
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => {
          const IconComponent = iconMap[value.iconName as keyof typeof iconMap]

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-sm text-slate-400">{value.description}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}