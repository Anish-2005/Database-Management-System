"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  DatabaseZap, 
  ShieldCheck, 
  Brain, 
  Workflow, 
  InfinityIcon, 
  Radar,
  ArrowUpRight,
  CheckCircle
} from "lucide-react"

const features = [
  {
    icon: DatabaseZap,
    title: "Quantum Query Processing",
    description: "AI-powered query optimization with real-time performance adaptation",
    gradient: "from-purple-500 to-pink-500",
    stats: "10x faster queries",
    color: "#8b5cf6"
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Security Layer",
    description: "Immutable audit trails and military-grade encryption protocols",
    gradient: "from-green-500 to-blue-500",
    stats: "Zero breaches",
    color: "#10b981"
  },
  {
    icon: Brain,
    title: "Neural Index Optimization",
    description: "Self-learning indexes that adapt to your query patterns automatically",
    gradient: "from-orange-500 to-red-500",
    stats: "95% hit rate",
    color: "#f59e0b"
  },
  {
    icon: Workflow,
    title: "Distributed Consensus Engine",
    description: "Real-time data synchronization across global clusters with RAFT protocol",
    gradient: "from-cyan-500 to-blue-500",
    stats: "99.999% uptime",
    color: "#06b6d4"
  },
  {
    icon: InfinityIcon,
    title: "Infinite Scalability",
    description: "Auto-sharding and elastic resource allocation for unlimited growth",
    gradient: "from-violet-500 to-purple-500",
    stats: "Petabyte scale",
    color: "#6366f1"
  },
  {
    icon: Radar,
    title: "Predictive Analytics",
    description: "ML-driven insights and anomaly detection with proactive alerts",
    gradient: "from-yellow-500 to-orange-500",
    stats: "Real-time insights",
    color: "#f59e0b"
  },
]

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Powerful Features
          </motion.span>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Revolutionary
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Database Technology
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Harness the power of cutting-edge database technology with features designed for 
            the most demanding enterprise applications and real-time analytics workloads.
          </p>
        </motion.div>

        {/* Interactive Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isActive = activeFeature === index
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: isActive ? "0 25px 50px -12px rgba(139, 92, 246, 0.25)" : "0 10px 30px -10px rgba(139, 92, 246, 0.1)"
                }}
                onHoverStart={() => setActiveFeature(index)}
                className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                    : 'bg-slate-900/30 border-slate-700 hover:border-purple-500/30'
                }`}
              >
                {/* Animated Background Gradient */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Feature Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">{feature.description}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-sm font-medium text-cyan-400">
                      {feature.stats}
                    </span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center mt-32"
        >
          <div>
            <motion.span 
              className="inline-block px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-green-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              AI-Powered Optimization
            </motion.span>
            <h3 className="text-4xl font-bold text-white mb-6">
              Intelligent Query
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Processing</span>
            </h3>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Our neural query optimizer learns from your workload patterns to deliver 
              unprecedented performance gains. Automatic index selection and query plan 
              optimization ensure peak efficiency.
            </p>

            <div className="space-y-4">
              {[
                "Machine learning-based cost estimation",
                "Real-time performance adaptation",
                "Automatic index management",
                "Predictive caching algorithms"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-green-500/30 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
              {/* Animated Query Visualization */}
              <div className="absolute inset-0 p-8">
                {/* Query Nodes */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-24 h-24 bg-slate-800/50 border border-slate-600 rounded-2xl flex items-center justify-center"
                    animate={{
                      y: [0, -10, 0],
                      x: i * 100 + 50,
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                    }}
                  >
                    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </motion.div>
                ))}
                
                {/* Data Flow Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.path
                    d="M 100 200 L 300 150 L 500 250"
                    stroke="url(#dataFlow)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <defs>
                    <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
