"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Info,
  BookOpen,
  Target,
  BarChart3,
  Users,
  Award,
  Sparkles,
  Database,
  Code,
  Play,
  Pause,
  Menu,
  X,
  CheckCircle,
  Star,
  Zap,
  Brain,
  Shield,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Crown,
  Trophy,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import * as THREE from "three"

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  // Three.js Background (same as other pages)
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 15

    const createParticles = (count: number, color: number, size: number) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50
        positions[i + 1] = (Math.random() - 0.5) * 50
        positions[i + 2] = (Math.random() - 0.5) * 50

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

    const particles1 = createParticles(2000, 0x6366f1, 0.1)
    const particles2 = createParticles(1500, 0x8b5cf6, 0.08)
    const particles3 = createParticles(1000, 0x06b6d4, 0.12)

    scene.add(particles1)
    scene.add(particles2)
    scene.add(particles3)

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

    const shapes = [
      createDatabaseShape('cylinder', [-4, 0, 0]),
      createDatabaseShape('cube', [0, 0, 0]),
      createDatabaseShape('sphere', [4, 0, 0]),
    ]

    shapes.forEach(shape => scene.add(shape))

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

    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const clock = new THREE.Clock()

    const animate = () => {
      if (!isPlaying) return

      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      particles1.rotation.x = elapsedTime * 0.1
      particles1.rotation.y = elapsedTime * 0.15
      particles2.rotation.x = -elapsedTime * 0.08
      particles2.rotation.y = -elapsedTime * 0.12
      particles3.rotation.x = elapsedTime * 0.05
      particles3.rotation.y = elapsedTime * 0.1

      shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * 0.2
        shape.rotation.y = elapsedTime * 0.3
        shape.position.y = Math.sin(elapsedTime + index) * 0.5
      })

      lines.rotation.z = elapsedTime * 0.1

      renderer.render(scene, camera)
    }

    animate()

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

  const features = [
    {
      id: "interactive-tutorials",
      title: "Interactive Tutorials",
      description: "Learn database concepts through hands-on, interactive tutorials with real-time feedback and progress tracking.",
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-500",
      details: [
        "Step-by-step guided learning",
        "Interactive code editors",
        "Real-time syntax validation",
        "Progress tracking and certificates",
        "Multiple difficulty levels"
      ]
    },
    {
      id: "practice-challenges",
      title: "Practice Challenges",
      description: "Test your skills with coding challenges, quizzes, and real-world database scenarios.",
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
      details: [
        "SQL query challenges",
        "Database design problems",
        "Performance optimization tasks",
        "Timed coding assessments",
        "Instant feedback and hints"
      ]
    },
    {
      id: "progress-tracking",
      title: "Progress Analytics",
      description: "Comprehensive dashboard with detailed analytics, achievements, and personalized learning recommendations.",
      icon: BarChart3,
      gradient: "from-green-500 to-emerald-500",
      details: [
        "Detailed progress reports",
        "Skill assessment charts",
        "Achievement system",
        "Learning streak tracking",
        "Personalized recommendations"
      ]
    },
    {
      id: "resource-library",
      title: "Resource Library",
      description: "Extensive collection of documentation, tools, references, and external resources for database professionals.",
      icon: Database,
      gradient: "from-orange-500 to-red-500",
      details: [
        "Official documentation links",
        "Tool recommendations",
        "SQL reference guides",
        "Best practices articles",
        "Community resources"
      ]
    },
    {
      id: "ai-powered",
      title: "AI-Powered Learning",
      description: "Intelligent learning recommendations and adaptive difficulty based on your performance and learning style.",
      icon: Brain,
      gradient: "from-cyan-500 to-blue-500",
      details: [
        "Adaptive learning paths",
        "Personalized recommendations",
        "Smart difficulty adjustment",
        "Performance analysis",
        "Learning pattern recognition"
      ]
    },
    {
      id: "community-driven",
      title: "Community Driven",
      description: "Learn with a global community of database professionals, share knowledge, and collaborate on projects.",
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
      details: [
        "Discussion forums",
        "Code sharing platform",
        "Mentorship programs",
        "Collaborative challenges",
        "Expert Q&A sessions"
      ]
    }
  ]

  const stats = [
    { label: "Active Learners", value: "50K+", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Tutorials Completed", value: "2.1M+", icon: BookOpen, color: "from-purple-500 to-pink-500" },
    { label: "Practice Challenges", value: "500+", icon: Target, color: "from-green-500 to-emerald-500" },
    { label: "Success Rate", value: "94%", icon: Trophy, color: "from-orange-500 to-red-500" },
    { label: "Countries Reached", value: "120+", icon: Globe, color: "from-cyan-500 to-blue-500" },
    { label: "Hours of Content", value: "200+", icon: Clock, color: "from-pink-500 to-rose-500" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Data Analyst",
      company: "TechCorp",
      content: "QuantumDB transformed my understanding of databases. The interactive tutorials made complex concepts easy to grasp.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Database Administrator",
      company: "DataFlow Inc",
      content: "The practice challenges are incredibly realistic. They prepared me perfectly for real-world database scenarios.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Software Engineer",
      company: "InnovateLabs",
      content: "The progress tracking and achievements keep me motivated. I've learned more in 3 months than I did in a year of self-study.",
      avatar: "EW",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Three.js Background */}
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
                <Info className="w-6 h-6 text-white" />
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
              <div className="text-xs text-slate-400">About Platform</div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 items-center">
            {[
              { name: "Home", href: "/" },
              { name: "Tutorials", href: "/tutorials" },
              { name: "Labs", href: "/labs" },
              { name: "Practice", href: "/practice" },
              { name: "Resources", href: "/resources" },
              { name: "Progress", href: "/progress" },
              { name: "About", href: "/about" }
            ].map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  item.name === "About" ? "text-white" : "text-slate-300 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
                  layoutId={item.name === "About" ? "navIndicator" : undefined}
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
                {[
                  { name: "Home", href: "/" },
                  { name: "Tutorials", href: "/tutorials" },
                  { name: "Labs", href: "/labs" },
                  { name: "Practice", href: "/practice" },
                  { name: "Resources", href: "/resources" },
                  { name: "Progress", href: "/progress" },
                  { name: "About", href: "/about" }
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                    whileHover={{ x: 4 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Info className="w-4 h-4" />
              About QuantumDB
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Database Learning
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              QuantumDB is an innovative, AI-powered learning platform designed to make database
              management accessible, engaging, and effective for everyone, from beginners to experts.
            </p>
          </motion.div>

          {/* Mission Statement */}
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

          {/* Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Platform Features</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Discover what makes QuantumDB the most comprehensive database learning platform available
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isExpanded = expandedFeature === feature.id

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-slate-400">{feature.description}</p>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setExpandedFeature(isExpanded ? null : feature.id)}
                          className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-slate-700 pt-4"
                          >
                            <ul className="space-y-2">
                              {feature.details.map((detail, detailIndex) => (
                                <motion.li
                                  key={detailIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: detailIndex * 0.1 }}
                                  className="flex items-center gap-3 text-sm text-slate-300"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  <span>{detail}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What Our Learners Say</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Real feedback from real learners who have transformed their careers with QuantumDB
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision & Values */}
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
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "We constantly push the boundaries of educational technology to create better learning experiences.",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Heart,
                  title: "Accessibility",
                  description: "Quality education should be available to everyone, regardless of background or location.",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  icon: Shield,
                  title: "Quality",
                  description: "We maintain the highest standards in our content, ensuring accuracy and relevance.",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Learning is better together. We foster a supportive community of learners and educators.",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10 text-center">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their understanding of databases.
                Start learning today and unlock your potential in database management.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/tutorials"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                >
                  Start Learning Now
                </motion.a>
                <motion.a
                  href="/practice"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-700/50 transition-all"
                >
                  Try Practice Challenges
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}