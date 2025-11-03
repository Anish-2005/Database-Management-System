"use client"

import { motion } from "framer-motion"

const architectureLayers = [
  {
    name: "Client Interface",
    components: ["REST API", "GraphQL", "WebSocket", "gRPC"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Query Processor",
    components: ["AI Optimizer", "Parallel Executor", "Cache Engine", "Security Layer"],
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Storage Engine",
    components: ["LSM Tree", "B+ Tree", "Column Store", "Memory Pool"],
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Distribution Layer",
    components: ["Consensus Protocol", "Data Sharding", "Replication", "Load Balancer"],
    color: "from-orange-500 to-red-500"
  }
]

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-purple-400 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            System Architecture
          </motion.span>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Layered
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
        </motion.div>

        {/* Architecture Layers */}
        <div className="space-y-8">
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-12`}
            >
              {/* Layer Visual */}
              <div className="flex-1">
                <div className="relative h-64 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${layer.color} opacity-10`} />
                  
                  {/* Animated Components */}
                  {layer.components.map((component, compIndex) => (
                    <motion.div
                      key={compIndex}
                      className="absolute px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg text-sm text-slate-300"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: compIndex * 0.7,
                      }}
                      style={{
                        left: `${20 + compIndex * 20}%`,
                        top: `${30 + compIndex * 15}%`,
                      }}
                    >
                      {component}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Layer Info */}
              <div className="flex-1">
                <div className="text-3xl font-bold text-white mb-4">
                  {layer.name}
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Advanced component architecture designed for maximum performance and reliability 
                  in distributed environments.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {layer.components.map((component, compIndex) => (
                    <motion.div
                      key={compIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: compIndex * 0.1 }}
                      className="p-3 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="text-sm text-slate-300">{component}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
