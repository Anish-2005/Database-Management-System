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
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

export default function ResourcesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

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
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Resources"
        subtitle="Resources & Tools"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

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