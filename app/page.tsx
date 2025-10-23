"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Database,
  Server,
  Shield,
  Zap,
  BarChart3,
  Lock,
  GitBranch,
  Cpu,
  Network,
  Code,
  Layers,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Cloud,
  CpuIcon,
  Binary,
  CircuitBoard,
  Sparkles,
  Rocket,
  Brain,
  Globe,
  Workflow,
  Infinity as InfinityIcon,
  Gauge,
  Key,
  Users,
  Eye,
  Clock,
  Search,
  Filter,
  GitCompare,
  Terminal,
  Container,
  DatabaseZap,
  Cctv,
  ShieldCheck,
  ArrowUpRight,
  Play,
  Pause,
  RotateCcw,
  Scan,
  Radar,
  Satellite,
  Orbit,
  Atom,
  Cuboid,
  Pyramid,
  Cylinder,
  Sparkle,
  Waves,
  FishSymbol,
  TreePine,
  Mountain,
  Cloudy,
} from "lucide-react"
import * as THREE from "three"

// Color palette for vibrant theme
const COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#06b6d4",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  dark: "#0f172a",
  light: "#f8fafc"
}

export default function AdvancedDBMSLandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Enhanced Three.js Scene with Multiple Objects
  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 15

    // Enhanced particle system
    const createParticles = (count: number, color: number, size: number) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50
        positions[i + 1] = (Math.random() - 0.5) * 50
        positions[i + 2] = (Math.random() - 0.5) * 50

        // Color variations
        colors[i] = (color >> 16 & 255) / 255
        colors[i + 1] = (color >> 8 & 255) / 255
        colors[i + 2] = (color & 255) / 255
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      })

      return new THREE.Points(geometry, material)
    }

    // Create multiple particle systems
    const particles1 = createParticles(2000, 0x6366f1, 0.1)
    const particles2 = createParticles(1500, 0x8b5cf6, 0.08)
    const particles3 = createParticles(1000, 0x06b6d4, 0.12)

    scene.add(particles1)
    scene.add(particles2)
    scene.add(particles3)

    // Create geometric shapes for database visualization
    const createDatabaseShape = (type: string, position: [number, number, number]) => {
      let geometry
      switch (type) {
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(1, 1, 2, 8)
          break
        case 'cube':
          geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
          break
        case 'sphere':
          geometry = new THREE.SphereGeometry(1, 8, 6)
          break
        default:
          geometry = new THREE.ConeGeometry(1, 2, 6)
      }

      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.7,
        shininess: 100
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...position)
      return mesh
    }

    // Add database shapes
    const shapes = [
      createDatabaseShape('cylinder', [-4, 0, 0]),
      createDatabaseShape('cube', [0, 0, 0]),
      createDatabaseShape('sphere', [4, 0, 0]),
    ]

    shapes.forEach(shape => scene.add(shape))

    // Create connection lines
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array([
      -4, 0, 0,  0, 0, 0,
      0, 0, 0,    4, 0, 0,
      -4, 0, 0,   4, 0, 0
    ])
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.5,
      linewidth: 2
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isPlaying) return

      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Animate particles
      particles1.rotation.x = elapsedTime * 0.1
      particles1.rotation.y = elapsedTime * 0.15
      particles2.rotation.x = -elapsedTime * 0.08
      particles2.rotation.y = -elapsedTime * 0.12
      particles3.rotation.x = elapsedTime * 0.05
      particles3.rotation.y = elapsedTime * 0.1

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * 0.2
        shape.rotation.y = elapsedTime * 0.3
        shape.position.y = Math.sin(elapsedTime + index) * 0.5
      })

      // Animate lines
      lines.rotation.z = elapsedTime * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [isPlaying])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation variants
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

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  // Enhanced features data
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

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Advanced Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none opacity-60 z-0"
      />

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/15 rounded-full blur-[80px]"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Database className="w-6 h-6 text-white" />
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                QuantumDB
              </span>
              <div className="text-xs text-slate-400">Next-Gen Database System</div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 items-center">
            {["Features", "Architecture", "Benchmarks", "Docs", "Pricing"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
                  layoutId="navIndicator"
                />
              </motion.a>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center gap-2"
            >
              Launch Demo
              <Rocket className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-700 bg-slate-900/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-4">
                {["Features", "Architecture", "Benchmarks", "Docs", "Pricing"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                    whileHover={{ x: 4 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-slate-700">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white shadow-lg shadow-purple-500/25"
                  >
                    Launch Demo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Advanced Layout */}
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
            <ChevronDown className="w-5 h-5" />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Interactive Grid */}
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
                      <Check className="w-4 h-4 text-green-400" />
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
                      <Cpu className="w-8 h-8 text-cyan-400" />
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

      {/* Architecture Section - Layered Design */}
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

      {/* Capabilities Section */}
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

      {/* Performance Metrics Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Unmatched
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Performance
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { metric: "Query Latency", value: "< 1ms", unit: "p99", color: "from-green-400 to-emerald-400" },
              { metric: "Throughput", value: "1.2M", unit: "QPS", color: "from-blue-400 to-cyan-400" },
              { metric: "Availability", value: "99.999%", unit: "SLA", color: "from-purple-400 to-pink-400" },
              { metric: "Scalability", value: "∞", unit: "Nodes", color: "from-orange-400 to-red-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-slate-600 transition-all"
              >
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-lg text-white font-semibold mb-1">{stat.metric}</div>
                <div className="text-sm text-slate-400">{stat.unit}</div>
              </motion.div>
            ))}
          </div>

          {/* Performance Comparison Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8">Performance Benchmark</h3>
              
              {/* Chart Bars */}
              <div className="space-y-6">
                {[
                  { label: "QuantumDB", value: 100, color: "from-purple-500 to-pink-500" },
                  { label: "Traditional SQL", value: 45, color: "from-slate-500 to-slate-600" },
                  { label: "NoSQL", value: 65, color: "from-slate-500 to-slate-600" },
                  { label: "NewSQL", value: 80, color: "from-slate-500 to-slate-600" },
                ].map((db, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-slate-300">{db.label}</div>
                    <div className="flex-1 h-8 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${db.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full bg-gradient-to-r ${db.color} rounded-full shadow-lg`}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-semibold text-white">
                      {db.value}x
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative p-12 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-5xl sm:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Ready to
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Transform?
                  </span>
                </h2>
                <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of forward-thinking companies using QuantumDB to power their 
                  most critical applications and drive innovation.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-2xl shadow-purple-500/25 hover:shadow-3xl hover:shadow-purple-500/40 transition-all flex items-center gap-3"
                  >
                    <Rocket className="w-5 h-5" />
                    Start Free Trial
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-semibold text-white hover:bg-slate-700/50 transition-all flex items-center gap-3"
                  >
                    <Terminal className="w-5 h-5" />
                    API Documentation
                  </motion.button>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-slate-500 mt-6 text-sm"
                >
                  No credit card required • 14-day free trial • Setup in minutes
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    QuantumDB
                  </span>
                  <div className="text-xs text-slate-500">Next-Gen Database System</div>
                </div>
              </motion.div>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                Building the future of data management with cutting-edge technology 
                and unparalleled performance for modern applications.
              </p>
              <div className="flex gap-4">
                {["Twitter", "GitHub", "LinkedIn", "Discord"].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap", "Releases"],
              },
              {
                title: "Resources",
                links: ["Documentation", "API Reference", "Tutorials", "Blog", "Community"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Partners", "Press"],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <motion.a
                        href="#"
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                        whileHover={{ x: 4 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-slate-500 text-sm">
              © 2024 QuantumDB. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-slate-500 hover:text-slate-400 transition-colors text-sm"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

// Check icon component
const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)