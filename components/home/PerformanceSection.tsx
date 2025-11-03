"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, BarChart3, Activity, Zap } from "lucide-react"

const performanceMetrics = [
  {
    icon: Zap,
    label: "Throughput",
    value: "1.5M",
    unit: "ops/sec",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Activity,
    label: "Latency",
    value: "0.3",
    unit: "ms p99",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: TrendingUp,
    label: "Scalability",
    value: "100+",
    unit: "nodes",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: BarChart3,
    label: "Availability",
    value: "99.99",
    unit: "%",
    color: "from-purple-500 to-pink-500"
  },
]

const comparisonData = [
  { name: "Our DB", traditional: 120, modern: 1500 },
  { name: "PostgreSQL", traditional: 85, modern: 85 },
  { name: "MongoDB", traditional: 110, modern: 110 },
  { name: "MySQL", traditional: 70, modern: 70 },
]

export default function PerformanceSection() {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Unmatched
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Performance
            </span>
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredMetric(index)}
                onHoverEnd={() => setHoveredMetric(null)}
                className="relative p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-slate-600 transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-slate-400 mb-1">{metric.label}</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-4xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-slate-500">{metric.unit}</div>
                </div>
                
                {hoveredMetric === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br ${metric.color} rounded-full`}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Performance Comparison</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                <span className="text-sm text-slate-400">Traditional</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <span className="text-sm text-slate-400">AI-Optimized</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {comparisonData.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-sm font-medium text-slate-300">{data.name}</div>
                <div className="flex gap-2 items-center">
                  {/* Traditional Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(data.traditional / 1500) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-end px-3"
                  >
                    <span className="text-xs font-bold text-white">{data.traditional}K</span>
                  </motion.div>
                  
                  {/* AI-Optimized Bar (only for Our DB) */}
                  {data.modern !== data.traditional && (
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(data.modern / 1500) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-end px-3"
                    >
                      <span className="text-xs font-bold text-white">{data.modern}K</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
