"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Book,
  FileText,
  Code,
  Terminal,
  Database,
  Shield,
  Zap,
  Layers,
  GitBranch,
  Search,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  PlayCircle,
  Lightbulb,
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  Download,
  Printer,
  Share2,
  Bookmark,
  Heart,
  Star,
  ThumbsUp,
  MessageSquare
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

export default function DocumentationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>("Getting Started")
  const [activeDoc, setActiveDoc] = useState<any>(null)
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)
  const [bookmarkedDocs, setBookmarkedDocs] = useState<Set<number>>(new Set())

  // Load animation state from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('animation-playing')
    if (saved !== null) {
      setIsPlaying(JSON.parse(saved))
    }
  }, [])

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  // Documentation data
  const documentation = [
    {
      id: 1,
      title: "Getting Started with QuantumDB",
      category: "Getting Started",
      icon: BookOpen,
      gradient: "from-green-500 to-emerald-500",
      description: "Learn the basics of QuantumDB and set up your first database",
      content: {
        overview: "QuantumDB is a next-generation database management system designed for modern applications. This guide will help you get started quickly.",
        sections: [
          {
            title: "Installation",
            content: "Install QuantumDB using your preferred package manager",
            code: `# Using npm
npm install quantumdb

# Using yarn
yarn add quantumdb

# Using pip
pip install quantumdb`
          },
          {
            title: "Basic Configuration",
            content: "Configure your database connection",
            code: `const db = new QuantumDB({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'admin',
  password: 'secure_password'
});`
          }
        ]
      },
      lastUpdated: "Dec 1, 2024",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "SQL Query Reference",
      category: "SQL Reference",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
      description: "Complete reference for SQL queries and syntax",
      content: {
        overview: "Comprehensive guide to SQL queries in QuantumDB with examples and best practices.",
        sections: [
          {
            title: "SELECT Queries",
            content: "Retrieve data from your database",
            code: `-- Basic SELECT
SELECT * FROM users;

-- SELECT with WHERE clause
SELECT name, email FROM users
WHERE status = 'active';

-- SELECT with JOIN
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;`
          },
          {
            title: "INSERT Queries",
            content: "Add new records to your database",
            code: `-- Single insert
INSERT INTO users (name, email)
VALUES ('John Doe', 'john@example.com');

-- Multiple inserts
INSERT INTO users (name, email) VALUES
  ('Jane Smith', 'jane@example.com'),
  ('Bob Johnson', 'bob@example.com');`
          }
        ]
      },
      lastUpdated: "Dec 2, 2024",
      readTime: "15 min"
    },
    {
      id: 3,
      title: "Performance Optimization Guide",
      category: "Performance",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      description: "Optimize your database for maximum performance",
      content: {
        overview: "Learn advanced techniques to optimize query performance and database operations.",
        sections: [
          {
            title: "Index Optimization",
            content: "Create and manage indexes effectively",
            code: `-- Create a simple index
CREATE INDEX idx_users_email ON users(email);

-- Create a composite index
CREATE INDEX idx_orders_user_date 
ON orders(user_id, order_date);

-- Create a partial index
CREATE INDEX idx_active_users 
ON users(email) WHERE status = 'active';`
          },
          {
            title: "Query Analysis",
            content: "Analyze query performance",
            code: `-- Analyze query execution plan
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123
  AND order_date >= '2024-01-01';`
          }
        ]
      },
      lastUpdated: "Nov 30, 2024",
      readTime: "20 min"
    },
    {
      id: 4,
      title: "Security Best Practices",
      category: "Security",
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
      description: "Secure your database against threats",
      content: {
        overview: "Essential security practices to protect your database and data.",
        sections: [
          {
            title: "User Authentication",
            content: "Implement secure authentication",
            code: `-- Create a user with password
CREATE USER app_user 
WITH PASSWORD 'secure_password';

-- Grant specific permissions
GRANT SELECT, INSERT, UPDATE
ON TABLE users TO app_user;`
          },
          {
            title: "SQL Injection Prevention",
            content: "Use parameterized queries",
            code: `// Bad - SQL Injection vulnerable
const query = \`SELECT * FROM users 
  WHERE email = '\${userInput}'\`;

// Good - Parameterized query
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userInput]);`
          }
        ]
      },
      lastUpdated: "Dec 3, 2024",
      readTime: "12 min"
    },
    {
      id: 5,
      title: "Database Architecture",
      category: "Architecture",
      icon: Layers,
      gradient: "from-purple-500 to-pink-500",
      description: "Design scalable database architectures",
      content: {
        overview: "Learn how to design database architectures for scalability and reliability.",
        sections: [
          {
            title: "Schema Design",
            content: "Design normalized database schemas",
            code: `-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table with foreign key
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2),
  order_date TIMESTAMP DEFAULT NOW()
);`
          }
        ]
      },
      lastUpdated: "Nov 28, 2024",
      readTime: "18 min"
    },
    {
      id: 6,
      title: "API Reference",
      category: "API Reference",
      icon: Terminal,
      gradient: "from-cyan-500 to-blue-500",
      description: "Complete API documentation and examples",
      content: {
        overview: "Comprehensive API reference for QuantumDB client libraries.",
        sections: [
          {
            title: "Connection API",
            content: "Manage database connections",
            code: `// Create connection
const db = new QuantumDB(config);

// Test connection
await db.connect();

// Close connection
await db.disconnect();`
          },
          {
            title: "Query API",
            content: "Execute queries programmatically",
            code: `// Simple query
const users = await db.query('SELECT * FROM users');

// Parameterized query
const user = await db.query(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

// Transaction
await db.transaction(async (trx) => {
  await trx.query('INSERT INTO orders...');
  await trx.query('UPDATE inventory...');
});`
          }
        ]
      },
      lastUpdated: "Dec 4, 2024",
      readTime: "25 min"
    }
  ]

  const categories = ["All", "Getting Started", "SQL Reference", "Performance", "Security", "Architecture", "API Reference"]

  const filteredDocs = documentation.filter(doc => {
    const matchesCategory = !activeCategory || activeCategory === "All" || doc.category === activeCategory
    const matchesSearch = !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const copyToClipboard = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCodeId(codeId)
      setTimeout(() => setCopiedCodeId(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const toggleBookmark = (docId: number) => {
    setBookmarkedDocs(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(docId)) {
        newBookmarks.delete(docId)
      } else {
        newBookmarks.add(docId)
      }
      return newBookmarks
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Documentation"
        subtitle="Comprehensive Database Docs"
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
              <Book className="w-4 h-4" />
              Complete Documentation
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Documentation
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                & Guides
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Everything you need to master QuantumDB. From quick starts to advanced topics,
              find detailed documentation, code examples, and best practices.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="relative max-w-2xl mx-auto">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Search documentation..."
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3 flex-wrap mb-12"
          >
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
          </motion.div>

          {/* Documentation Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDocs.map((doc, index) => {
              const Icon = doc.icon
              const isBookmarked = bookmarkedDocs.has(doc.id)

              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all cursor-pointer group"
                  onClick={() => setActiveDoc(doc)}
                >
                  {/* Bookmark Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(doc.id)
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-xl transition-all z-10 ${
                      isBookmarked
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-slate-800/40 text-slate-400 hover:text-blue-400 border border-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </motion.button>

                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${doc.gradient} flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {doc.title}
                  </h3>

                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {doc.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full">
                      {doc.category}
                    </span>
                    <span>{doc.readTime} read</span>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">
                    <span>Updated {doc.lastUpdated}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Video Tutorials",
                desc: "Watch step-by-step video guides",
                icon: PlayCircle,
                color: "from-red-500 to-pink-500"
              },
              {
                title: "API Playground",
                desc: "Test APIs in interactive environment",
                icon: Terminal,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Community Forum",
                desc: "Get help from the community",
                icon: MessageSquare,
                color: "from-blue-500 to-cyan-500"
              }
            ].map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{link.title}</h3>
                <p className="text-sm text-slate-400">{link.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Documentation Detail Modal */}
      <AnimatePresence>
        {activeDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setActiveDoc(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeDoc.gradient} flex items-center justify-center`}>
                    <activeDoc.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{activeDoc.title}</h2>
                    <p className="text-slate-400 text-sm">{activeDoc.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
                  >
                    <Download className="w-5 h-5 text-slate-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-slate-400" />
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveDoc(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-slate-400" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
                <div className="prose prose-invert max-w-none">
                  {/* Overview */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                    <p className="text-slate-300 leading-relaxed">{activeDoc.content.overview}</p>
                  </div>

                  {/* Sections */}
                  {activeDoc.content.sections.map((section: any, index: number) => (
                    <div key={index} className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                      <p className="text-slate-300 mb-4 leading-relaxed">{section.content}</p>

                      {section.code && (
                        <div className="relative bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
                          <div className="flex items-center justify-between p-4 border-b border-slate-700">
                            <span className="text-sm text-slate-400">Code Example</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => copyToClipboard(section.code, `${activeDoc.id}-${index}`)}
                              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs transition-all ${
                                copiedCodeId === `${activeDoc.id}-${index}`
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : 'bg-slate-700/50 text-slate-400 hover:text-slate-300 border border-slate-600'
                              }`}
                            >
                              {copiedCodeId === `${activeDoc.id}-${index}` ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </>
                              )}
                            </motion.button>
                          </div>
                          <div className="p-4">
                            <pre className="text-sm text-slate-300 overflow-x-auto">
                              <code>{section.code}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      Last updated: {activeDoc.lastUpdated}
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700 text-sm"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Helpful
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on GitHub
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
