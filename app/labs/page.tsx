"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, Search, FolderPlus, ArrowUpRight, X, Rocket, Sparkles, Plus, Filter, Pause, Play, Menu, Trash, ExternalLink, Calendar, User } from "lucide-react"
import * as THREE from 'three'
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

type Lab = {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  createdAt?: string
  author?: string
}

function LabCard({ lab, onRequestEdit, onRequestDelete, onOpenDetail }: { lab: Lab; onRequestEdit: (lab: Lab) => void; onRequestDelete?: (lab: Lab) => void; onOpenDetail: (lab: Lab) => void }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden flex flex-col cursor-pointer"
      onClick={() => onOpenDetail(lab)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
              {lab.title}
            </h3>
            <p className="text-sm text-slate-400 mb-3 max-h-14 overflow-hidden">{lab.description}</p>

            <div className="flex gap-2 flex-wrap">
              {(lab.tags || []).slice(0, 6).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 transition-transform group-hover:scale-105">
              <Database className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.stopPropagation()
                if (lab.link) window.open(lab.link, '_blank')
              }}
              className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white transition-colors"
            >
              Open
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onRequestEdit(lab)
              }} 
              className="px-3 py-1 bg-slate-800/40 hover:bg-slate-700/40 rounded-md text-sm text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              Edit
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onRequestDelete && (
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onRequestDelete(lab)
                }} 
                title="Delete lab" 
                className="p-2 rounded-md bg-red-600/10 hover:bg-red-600/20 text-red-300 border border-red-700/20"
              >
                <Trash className="w-4 h-4" />
              </button>
            )}

            <button 
              onClick={(e) => {
                e.stopPropagation()
                alert(`Launching ${lab.title}`)
              }} 
              className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-sm text-white shadow-md"
            >
              Launch
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function LabDetailModal({ lab, onClose, onRequestEdit, onRequestDelete }: { lab: Lab; onClose: () => void; onRequestEdit: (lab: Lab) => void; onRequestDelete?: (lab: Lab) => void }) {
  const [sqlSchema, setSqlSchema] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [erDiagram, setErDiagram] = useState<string | null>(null)
  const [relationshipDiagram, setRelationshipDiagram] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [scrollY, setScrollY] = useState(0)

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


  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/labs?labId=${encodeURIComponent(lab.id)}`)
        const data = await res.json()
        if (res.ok && data?.doc) {
          setSqlSchema(data.doc.sqlSchema || '')
          // In a real app, you'd fetch the actual diagram files here
          // For now, we'll just set placeholder states
          setErDiagram(data.doc.erDiagram || null)
          setRelationshipDiagram(data.doc.relationshipDiagram || null)
        }
      } catch (e) {
        console.error('Failed to fetch lab details:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchLabDetails()
  }, [lab.id])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{lab.title}</h2>
              <p className="text-slate-400">{lab.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onRequestEdit(lab)}
              className="px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              Edit
            </button>
            <motion.button 
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="flex items-center gap-6 text-sm text-slate-400">
              {lab.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{lab.author}</span>
                </div>
              )}
              {lab.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(lab.createdAt).toLocaleDateString()}</span>
                </div>
              )}
              {lab.link && (
                <a 
                  href={lab.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>External Link</span>
                </a>
              )}
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex gap-2 flex-wrap">
                {(lab.tags || []).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* SQL Schema */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">SQL Schema</h3>
              {loading ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-400">Loading schema...</p>
                </div>
              ) : sqlSchema ? (
                <pre className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl text-sm text-slate-300 overflow-x-auto">
                  {sqlSchema}
                </pre>
              ) : (
                <div className="p-8 text-center bg-slate-800/20 border border-slate-700 rounded-xl">
                  <p className="text-slate-400">No SQL schema available</p>
                </div>
              )}
            </div>

            {/* Diagrams */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* ER Diagram */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">ER Diagram</h3>
                {loading ? (
                  <div className="h-48 bg-slate-800/20 border border-slate-700 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : erDiagram ? (
                  <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-4">
                    <img 
                      src={erDiagram} 
                      alt="ER Diagram" 
                      className="w-full h-48 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-slate-800/20 border border-slate-700 rounded-xl flex items-center justify-center">
                    <p className="text-slate-400">No ER diagram available</p>
                  </div>
                )}
              </div>

              {/* Relationship Diagram */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Relationship Model</h3>
                {loading ? (
                  <div className="h-48 bg-slate-800/20 border border-slate-700 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : relationshipDiagram ? (
                  <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-4">
                    <img 
                      src={relationshipDiagram} 
                      alt="Relationship Model" 
                      className="w-full h-48 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-slate-800/20 border border-slate-700 rounded-xl flex items-center justify-center">
                    <p className="text-slate-400">No relationship model available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onRequestEdit(lab)}
                  className="px-6 py-3 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                >
                  Edit Lab
                </button>
                {onRequestDelete && (
                  <button 
                    onClick={() => onRequestDelete(lab)}
                    className="px-6 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-300 border border-red-700/20 rounded-xl transition-colors"
                  >
                    Delete Lab
                  </button>
                )}
              </div>
              
              <button 
                onClick={() => alert(`Launching ${lab.title}`)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                Launch Lab
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function LabsPage() {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [labs, setLabs] = useState<Lab[]>([])
  const [loadingLabs, setLoadingLabs] = useState(true)
  const [creating, setCreating] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [passcodeInput, setPasscodeInput] = useState("")
  const [passcodeVerified, setPasscodeVerified] = useState(false)
  const [showPassPrompt, setShowPassPrompt] = useState(false)
  const [pendingAction, setPendingAction] = useState<null | 'openCreate' | 'openEdit' | 'delete'>(null)
  const [editingLab, setEditingLab] = useState<Lab | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Lab | null>(null)
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null) // New state for detail modal
  
  // resource fields for sidebar
  const [erFile, setErFile] = useState<File | null>(null)
  const [relFile, setRelFile] = useState<File | null>(null)
  const [sqlSchema, setSqlSchema] = useState("")
  const [erPreview, setErPreview] = useState<string | null>(null)
  const [relPreview, setRelPreview] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newTags, setNewTags] = useState("")
  const [newLink, setNewLink] = useState("")
  const PASSCODE = 'letmein123'

  const tags = useMemo(() => {
    const set = new Set()
    ;(labs || []).forEach((l) => (l.tags || []).forEach((t) => set.add(t)))
    return Array.from(set) as string[]
  }, [labs])

  const filtered = useMemo(() => {
    return (labs || []).filter((lab) => {
      const hay = (lab.title + " " + lab.description + " " + (lab.tags || []).join(" ")).toLowerCase()
      const matchesQuery = query.trim() ? hay.includes(query.toLowerCase()) : true
      const matchesTag = activeTag ? (lab.tags || []).includes(activeTag) : true
      return matchesQuery && matchesTag
    })
  }, [labs, query, activeTag])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoadingLabs(true)
        const res = await fetch('/api/labs/meta')
        const data = await res.json()
        if (!mounted) return
        if (res.ok && data?.labs) {
          setLabs(data.labs.map((d: any) => ({ id: d.id, title: d.title, description: d.description, tags: d.tags || [], link: d.link || '#' })))
        } else {
          // keep empty
        }
      } catch (err) {
        // ignore for now
      } finally {
        if (mounted) setLoadingLabs(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  // Clear previews when the sidebar is closed
  useEffect(() => {
    if (!showAdd) {
      setErPreview(null)
      setRelPreview(null)
    }
  }, [showAdd])

  const handleOpenDetail = (lab: Lab) => {
    setSelectedLab(lab)
  }

  const handleCloseDetail = () => {
    setSelectedLab(null)
  }

  const handleRequestOpenCreate = () => {
    if (passcodeVerified) {
      setEditingLab(null)
      setShowAdd(true)
    } else {
      setPendingAction('openCreate')
      setShowPassPrompt(true)
    }
  }

  const handleRequestEdit = (lab: Lab) => {
    if (passcodeVerified) {
      setEditingLab(lab)
      setNewTitle(lab.title)
      setNewDescription(lab.description)
      setNewTags((lab.tags || []).join(','))
      setNewLink(lab.link || '')
      ;(async () => {
        try {
          const res = await fetch(`/api/labs?labId=${encodeURIComponent(lab.id)}`)
          const data = await res.json()
          if (res.ok && data?.doc) {
            setSqlSchema(data.doc.sqlSchema || '')
          }
        } catch (e) {}
      })()
      setShowAdd(true)
    } else {
      setPendingAction('openEdit')
      setEditingLab(lab)
      setShowPassPrompt(true)
    }
  }

  const handleRequestDelete = (lab: Lab) => {
    if (passcodeVerified) {
      if (!confirm(`Delete lab "${lab.title}"? This cannot be undone.`)) return
      void handleDeleteConfirmed(lab)
    } else {
      setPendingAction('delete')
      setDeleteTarget(lab)
      setShowPassPrompt(true)
    }
  }

  const handleDeleteConfirmed = async (lab: Lab) => {
    try {
      const res = await fetch(`/api/labs/meta?labId=${encodeURIComponent(lab.id)}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(data?.error || 'Failed to delete lab')
        return
      }
      setLabs((s) => s.filter((l) => l.id !== lab.id))
      if (editingLab && editingLab.id === lab.id) {
        setShowAdd(false)
        setEditingLab(null)
      }
      if (selectedLab && selectedLab.id === lab.id) {
        setSelectedLab(null)
      }
    } catch (err: any) {
      alert(err?.message || 'Error deleting lab')
    } finally {
      setPendingAction(null)
      setDeleteTarget(null)
    }
  }

  const handleVerifyPasscode = () => {
    if (passcodeInput === PASSCODE) {
      setPasscodeVerified(true)
      setShowPassPrompt(false)
      setPasscodeInput("")
      if (pendingAction === 'openCreate') {
        setEditingLab(null)
        setShowAdd(true)
      } else if (pendingAction === 'openEdit' && editingLab) {
        setNewTitle(editingLab.title)
        setNewDescription(editingLab.description)
        setNewTags((editingLab.tags || []).join(','))
        setNewLink(editingLab.link || '')
        ;(async () => {
          try {
            const res = await fetch(`/api/labs?labId=${encodeURIComponent(editingLab.id)}`)
            const data = await res.json()
            if (res.ok && data?.doc) {
              setSqlSchema(data.doc.sqlSchema || '')
            }
          } catch (e) {}
        })()
        setShowAdd(true)
      } else if (pendingAction === 'delete' && deleteTarget) {
        // proceed with deletion after passcode verification
        void handleDeleteConfirmed(deleteTarget)
      }
      setPendingAction(null)
    } else {
      alert('Incorrect passcode')
    }
  }

  const handleCreateOrUpdate = async () => {
    try {
      setCreating(true)
      const tagsArr = newTags.split(',').map(t => t.trim()).filter(Boolean)
      const payload: any = { title: newTitle || 'Untitled Lab', description: newDescription || '', tags: tagsArr, link: newLink || '#' }
      if (editingLab) payload.id = editingLab.id

      const res = await fetch('/api/labs/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) {
        alert(data?.error || 'Failed to save lab')
        return
      }

      const savedLab = data.lab

      if (erFile || relFile || sqlSchema) {
        const fd = new FormData()
        fd.append('labId', savedLab.id)
        if (erFile) fd.append('erDiagram', erFile, erFile.name)
        if (relFile) fd.append('relationship', relFile, relFile.name)
        if (sqlSchema) fd.append('sqlSchema', sqlSchema)
        await fetch('/api/labs', { method: 'POST', body: fd })
      }

      setLabs((s) => [savedLab, ...s.filter(l => l.id !== savedLab.id)])
      setNewTitle('')
      setNewDescription('')
      setNewTags('')
      setNewLink('')
      setErFile(null)
      setRelFile(null)
      setErPreview(null)
      setRelPreview(null)
      setSqlSchema('')
      setEditingLab(null)
      setShowAdd(false)
    } catch (err: any) {
      alert(err?.message || 'Error')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-24 relative overflow-hidden">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Labs"
        subtitle="Database Labs"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Database className="w-7 h-7 text-white" />
              </div>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quantum Labs
              </h1>
              <p className="text-slate-400 mt-2">Interactive database experiments and research playground</p>
            </div>
          </div>

          <motion.button 
            onClick={handleRequestOpenCreate}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Lab
          </motion.button>
        </motion.header>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-12 p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
        >
          {/* Search */}
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                aria-label="Search labs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Search labs, tags, or descriptions..."
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-slate-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter by:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTag(null)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTag === null 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                }`}
              >
                All Labs
              </motion.button>
              {tags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTag === tag 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                  }`}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Labs Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
        >
          {filtered.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl">
              <div className="w-16 h-16 bg-slate-800/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No labs found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setQuery(''); setActiveTag(null); }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25"
              >
                Clear Filters
              </motion.button>
            </div>
          ) : (
            filtered.map((lab) => (
              <LabCard 
                key={lab.id} 
                lab={lab} 
                onRequestEdit={handleRequestEdit} 
                onRequestDelete={handleRequestDelete} 
                onOpenDetail={handleOpenDetail}
              />
            ))
          )}
        </motion.div>

        {/* Mobile Floating Action Button */}
        <motion.button 
          onClick={handleRequestOpenCreate}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 z-50"
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Lab Detail Modal */}
      <AnimatePresence>
        {selectedLab && (
          <LabDetailModal 
            lab={selectedLab}
            onClose={handleCloseDetail}
            onRequestEdit={handleRequestEdit}
            onRequestDelete={handleRequestDelete}
          />
        )}
      </AnimatePresence>

      {/* Add/Edit Lab Sidebar */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-50">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setShowAdd(false)} 
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full lg:w-[480px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {editingLab ? 'Edit Lab' : 'Create Lab'}
                    </h2>
                    <p className="text-slate-400 text-sm">Configure your database experiment</p>
                  </div>
                  <motion.button 
                    onClick={() => setShowAdd(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Lab Title</label>
                      <input 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        placeholder="Enter lab title"
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Description</label>
                      <input 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                        placeholder="Brief description of the lab"
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Tags</label>
                      <input 
                        value={newTags} 
                        onChange={(e) => setNewTags(e.target.value)} 
                        placeholder="comma,separated,tags"
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">External Link</label>
                      <input 
                        value={newLink} 
                        onChange={(e) => setNewLink(e.target.value)} 
                        placeholder="https://..."
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      Lab Resources
                    </h3>

                    <div className="space-y-6">
                      {/* ER Diagram */}
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-3 block">ER Diagram</label>
                        <div className="space-y-3">
                          <input 
                            id="er-input" 
                            type="file" 
                            accept=".dia,image/*" 
                            onChange={(e) => {
                              const f = e.target.files?.[0] ?? null
                              setErFile(f)
                              if (f && f.type.startsWith('image/')) {
                                const reader = new FileReader()
                                reader.onload = () => setErPreview(String(reader.result))
                                reader.readAsDataURL(f)
                              } else {
                                setErPreview(null)
                              }
                            }} 
                            className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-colors"
                          />
                          {erFile && (
                            <div className="text-sm text-slate-400 bg-slate-800/20 rounded-lg p-3">
                              Selected: {erFile.name}
                            </div>
                          )}
                          {erPreview && (
                            <div className="mt-2">
                              <img src={erPreview} alt="ER preview" className="rounded-lg border border-slate-700 max-h-48 w-full object-contain" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Relationship Model */}
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-3 block">Relationship Model</label>
                        <div className="space-y-3">
                          <input 
                            id="rel-input" 
                            type="file" 
                            accept=".dia,image/*" 
                            onChange={(e) => {
                              const f = e.target.files?.[0] ?? null
                              setRelFile(f)
                              if (f && f.type.startsWith('image/')) {
                                const reader = new FileReader()
                                reader.onload = () => setRelPreview(String(reader.result))
                                reader.readAsDataURL(f)
                              } else {
                                setRelPreview(null)
                              }
                            }} 
                            className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 transition-colors"
                          />
                          {relFile && (
                            <div className="text-sm text-slate-400 bg-slate-800/20 rounded-lg p-3">
                              Selected: {relFile.name}
                            </div>
                          )}
                          {relPreview && (
                            <div className="mt-2">
                              <img src={relPreview} alt="Relationship preview" className="rounded-lg border border-slate-700 max-h-48 w-full object-contain" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SQL Schema */}
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-3 block">SQL Schema</label>
                        <textarea 
                          value={sqlSchema} 
                          onChange={(e) => setSqlSchema(e.target.value)} 
                          rows={8} 
                          placeholder="CREATE TABLE users (...);"
                          className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors text-sm font-mono resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-800">
                    <div className="text-xs text-slate-500 flex-1">
                      Supported: .dia files, images. Image files show previews.
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button 
                        onClick={() => { setShowAdd(false); setEditingLab(null); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                      >
                        Cancel
                      </motion.button>
                      <motion.button 
                        onClick={handleCreateOrUpdate}
                        disabled={creating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {creating ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {editingLab ? 'Updating...' : 'Creating...'}
                          </span>
                        ) : (
                          editingLab ? 'Update Lab' : 'Create Lab'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Passcode Prompt */}
      <AnimatePresence>
        {showPassPrompt && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setShowPassPrompt(false)} 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Authentication Required</h3>
                <p className="text-slate-400">Enter passcode to modify labs</p>
              </div>
              
              <input 
                value={passcodeInput} 
                onChange={(e) => setPasscodeInput(e.target.value)} 
                type="password"
                placeholder="Enter passcode"
                className="w-full p-4 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors mb-6"
                onKeyPress={(e) => e.key === 'Enter' && handleVerifyPasscode()}
              />
              
              <div className="flex gap-3">
                <motion.button 
                  onClick={() => setShowPassPrompt(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  onClick={handleVerifyPasscode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                >
                  Verify
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}