"use client"

import { motion } from "framer-motion"
import { CircuitBoard, Cloud, GitCompare, Cctv } from "lucide-react"

const capabilities = [
  {
    icon: CircuitBoard,
    title: "Multi-Model Architecture",
    description: "Support for document, graph, relational, and key-value data models in a single engine",
    features: ["Unified API", "Cross-model queries", "Consistent ACID"]
  },
  {
    icon: Cloud,
    title: "Hybrid Cloud Deployment",
    description: "Seamless deployment across on-prem, cloud, and edge environments",
    features: ["Kubernetes native", "Multi-cloud sync", "Edge computing"]
  },
  {
    icon: GitCompare,
    title: "Version Control System",
    description: "Git-like versioning for database schemas and data with branching and merging",
    features: ["Schema branching", "Data versioning", "Rollback any point"]
  },
  {
    icon: Cctv,
    title: "Real-time Monitoring",
    description: "Comprehensive observability with distributed tracing and performance metrics",
    features: ["Live query tracing", "Performance metrics", "Anomaly detection"]
  },
]

export default function CapabilitiesSection() {
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
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Enterprise
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{capability.title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{capability.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {capability.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-cyan-400 border border-cyan-500/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
