"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  ExternalLink,
  Download,
  Search,
  Filter,
  Database,
  Code,
  FileText,
  Wrench,
  Link,
  Star,
  Clock,
  Users,
  Menu,
  X,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  Copy,
  Check,
  Globe,
  Server,
  Shield,
  Zap,
  Brain,
  Layers,
  BarChart3,
  Terminal,
} from "lucide-react"
import * as THREE from "three"

export default function ResourcesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Resources data
  const resources = [
    {
      id: 1,
      title: "SQL Cheat Sheet",
      description: "Comprehensive SQL syntax reference with examples for all major databases",
      category: "Reference",
      type: "Cheat Sheet",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      downloadUrl: "#",
      content: `SELECT * FROM users WHERE age > 18;
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
UPDATE users SET name = 'Jane' WHERE id = 1;
DELETE FROM users WHERE id = 1;`,
      tags: ["SQL", "Reference", "Syntax"]
    },
    {
      id: 2,
      title: "Database Design Principles",
      description: "Complete guide to database normalization, ER modeling, and best practices",
      category: "Documentation",
      type: "Guide",
      icon: BookOpen,
      gradient: "from-purple-500 to-pink-500",
      externalUrl: "https://example.com/db-design",
      tags: ["Design", "Normalization", "ERD"]
    },
    {
      id: 3,
      title: "PostgreSQL Documentation",
      description: "Official PostgreSQL documentation and reference manual",
      category: "Documentation",
      type: "Official Docs",
      icon: Database,
      gradient: "from-green-500 to-emerald-500",
      externalUrl: "https://www.postgresql.org/docs/",
      tags: ["PostgreSQL", "Official", "Reference"]
    },
    {
      id: 4,
      title: "MySQL Workbench",
      description: "Visual database design tool for MySQL with ER diagramming",
      category: "Tools",
      type: "Software",
      icon: Wrench,
      gradient: "from-orange-500 to-red-500",
      externalUrl: "https://www.mysql.com/products/workbench/",
      tags: ["MySQL", "Design", "ERD"]
    },
    {
      id: 5,
      title: "Database Performance Tuning",
      description: "Advanced techniques for optimizing database performance and query execution",
      category: "Documentation",
      type: "Guide",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      externalUrl: "#",
      tags: ["Performance", "Optimization", "Indexing"]
    },
    {
      id: 6,
      title: "SQLZoo Interactive Exercises",
      description: "Interactive SQL learning platform with hands-on exercises",
      category: "Learning",
      type: "Interactive",
      icon: Code,
      gradient: "from-cyan-500 to-blue-500",
      externalUrl: "https://sqlzoo.net/",
      tags: ["SQL", "Practice", "Interactive"]
    },
    {
      id: 7,
      title: "MongoDB University",
      description: "Free courses and certifications for MongoDB database management",
      category: "Learning",
      type: "Courses",
      icon: Database,
      gradient: "from-green-500 to-teal-500",
      externalUrl: "https://university.mongodb.com/",
      tags: ["MongoDB", "Courses", "Certification"]
    },
    {
      id: 8,
      title: "Database Security Best Practices",
      description: "Comprehensive security guidelines for database administrators",
      category: "Documentation",
      type: "Security Guide",
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
      externalUrl: "#",
      tags: ["Security", "Best Practices", "Administration"]
    },
    {
      id: 9,
      title: "DBeaver Community Edition",
      description: "Free universal database tool for developers and database administrators",
      category: "Tools",
      type: "Software",
      icon: Terminal,
      gradient: "from-slate-500 to-slate-600",
      externalUrl: "https://dbeaver.io/",
      tags: ["Database Tool", "Free", "Universal"]
    },
    {
      id: 10,
      title: "Database System Concepts",
      description: "Classic textbook on database systems by Silberschatz, Korth, and Sudarshan",
      category: "Books",
      type: "Textbook",
      icon: BookOpen,
      gradient: "from-purple-600 to-indigo-600",
      externalUrl: "#",
      tags: ["Textbook", "Theory", "Comprehensive"]
    },
    {
      id: 11,
      title: "Redis Documentation",
      description: "Complete documentation for Redis in-memory data structure store",
      category: "Documentation",
      type: "Official Docs",
      icon: Database,
      gradient: "from-red-600 to-red-700",
      externalUrl: "https://redis.io/documentation",
      tags: ["Redis", "NoSQL", "Documentation"]
    },
    {
      id: 12,
      title: "Docker for Database Development",
      description: "Learn to use Docker containers for database development and testing",
      category: "Tools",
      type: "Guide",
      icon: Server,
      gradient: "from-blue-600 to-cyan-600",
      externalUrl: "#",
      tags: ["Docker", "Development", "Containers"]
    }
  ]

  const categories = ["All", "Documentation", "Reference", "Tools", "Learning", "Books"]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === null || activeCategory === "All" || resource.category === activeCategory
    const matchesSearch = searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
              <div className="text-xs text-slate-400">Resources & Tools</div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 items-center">
            {[
              { name: "Home", href: "/" },
              { name: "Tutorials", href: "/tutorials" },
              { name: "Labs", href: "/labs" },
              { name: "Practice", href: "/practice" },
              { name: "Resources", href: "/resources" }
            ].map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  item.name === "Resources" ? "text-white" : "text-slate-300 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
                  layoutId={item.name === "Resources" ? "navIndicator" : undefined}
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
                  { name: "Resources", href: "/resources" }
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="w-4 h-4" />
              Comprehensive Resource Library
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Database
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Access documentation, tools, references, and learning materials to accelerate your
              database management journey. Everything you need in one place.
            </p>
          </motion.div>

          {/* Quick Access Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: "Resources", value: resources.length, icon: FileText, color: "from-blue-500 to-cyan-500" },
              { label: "Tools", value: resources.filter(r => r.category === "Tools").length, icon: Wrench, color: "from-purple-500 to-pink-500" },
              { label: "Documentation", value: resources.filter(r => r.category === "Documentation").length, icon: BookOpen, color: "from-green-500 to-emerald-500" },
              { label: "Learning", value: resources.filter(r => r.category === "Learning").length, icon: Star, color: "from-orange-500 to-red-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-12 p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
          >
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                  placeholder="Search resources, tools, documentation..."
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2 text-slate-400">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Category:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category === "All" ? null : category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      (activeCategory === category || (category === "All" && activeCategory === null))
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resources Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
          >
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
                  }}
                  className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${resource.gradient} flex items-center justify-center shadow-lg mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{resource.description}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Content Preview */}
                    {resource.content && (
                      <div className="mb-4">
                        <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-3">
                          <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
                            {resource.content.split('\n')[0]}...
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="px-2 py-1 bg-slate-800/50 rounded-full text-xs">
                          {resource.type}
                        </span>
                        <span>{resource.category}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {resource.content && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyToClipboard(resource.content, resource.id.toString())}
                            className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                            title="Copy content"
                          >
                            {copiedId === resource.id.toString() ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </motion.button>
                        )}

                        {resource.externalUrl ? (
                          <motion.a
                            href={resource.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                            title="Open external link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        ) : resource.downloadUrl ? (
                          <motion.a
                            href={resource.downloadUrl}
                            download
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                            title="Download resource"
                          >
                            <Download className="w-4 h-4" />
                          </motion.a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Featured Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Essential Database Tools</h2>
                <p className="text-slate-400">Professional-grade tools to enhance your database workflow</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "DBeaver",
                    description: "Universal database tool for developers",
                    features: ["Multi-database support", "ER diagrams", "SQL editor"],
                    icon: Database,
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    name: "pgAdmin",
                    description: "PostgreSQL administration and development platform",
                    features: ["Query tool", "Backup/Restore", "Monitoring"],
                    icon: Server,
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    name: "MySQL Workbench",
                    description: "Visual database design tool for MySQL",
                    features: ["ER modeling", "SQL development", "Server administration"],
                    icon: Wrench,
                    gradient: "from-orange-500 to-red-500"
                  }
                ].map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-xs text-slate-300">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}