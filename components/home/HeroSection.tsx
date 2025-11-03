"use client"

import { motion } from "framer-motion"
import { Sparkles, Rocket, ArrowUpRight, Play, Server } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

export default function HeroSection() {
  return (
    <section className="mt-16 relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                Next-Generation Database Platform
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Quantum
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Database
              </span>
              <br />
              <span className="text-2xl sm:text-3xl text-slate-400">
                The Future of Data Management
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed"
            >
              Experience unprecedented performance with our AI-powered distributed database system. 
              Built for the most demanding applications with real-time analytics and infinite scalability.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-2xl shadow-purple-500/25 hover:shadow-3xl hover:shadow-purple-500/40 transition-all flex items-center gap-3"
              >
                <Rocket className="w-5 h-5" />
                Start Free Trial
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-semibold text-white hover:bg-slate-700/50 transition-all flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl"
            >
              {[
                { value: "10ms", label: "Query Latency" },
                { value: "99.99%", label: "Uptime SLA" },
                { value: "∞", label: "Scalability" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - Interactive Database Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Main Visualization Container */}
            <div className="relative h-[600px] bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
              {/* Animated Database Nodes */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-32 h-32 bg-gradient-to-br ${i === 0 ? 'from-purple-500/20 to-pink-500/20' : i === 1 ? 'from-cyan-500/20 to-blue-500/20' : 'from-green-500/20 to-emerald-500/20'} rounded-2xl border border-slate-600/50 backdrop-blur-sm`}
                    animate={{
                      y: [0, -20, 0],
                      x: i === 0 ? [-60, -80, -60] : i === 1 ? [0, 20, 0] : [60, 80, 60],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 1.3,
                    }}
                  >
                    <div className="absolute inset-2 bg-slate-900/50 rounded-lg flex items-center justify-center">
                      <Server className="w-8 h-8 text-slate-400" />
                    </div>
                  </motion.div>
                ))}
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  <motion.path
                    d="M 200 300 Q 400 250 600 300"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.path
                    d="M 200 300 Q 400 350 600 300"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                      <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Metrics */}
              <div className="absolute top-8 left-8">
                <motion.div
                  className="p-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-sm text-slate-400">Active Queries</div>
                  <div className="text-2xl font-bold text-green-400">1,247</div>
                </motion.div>
              </div>

              <div className="absolute top-8 right-8">
                <motion.div
                  className="p-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-sm text-slate-400">Data Throughput</div>
                  <div className="text-2xl font-bold text-cyan-400">5.2 GB/s</div>
                </motion.div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white">System Operational</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-sm">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
