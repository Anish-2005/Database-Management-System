"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Database, Search, FolderPlus, ArrowUpRight, X } from "lucide-react"

type Lab = {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
}

function LabCard({ lab }: { lab: Lab }) {
  const [open, setOpen] = useState(false)
  const [erFile, setErFile] = useState<File | null>(null)
  const [relFile, setRelFile] = useState<File | null>(null)
  const [sqlSchema, setSqlSchema] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async () => {
    setSubmitting(true)
    setMessage(null)
    try {
      const fd = new FormData()
      fd.append('labId', lab.id)
      if (erFile) fd.append('erDiagram', erFile, erFile.name)
      if (relFile) fd.append('relationship', relFile, relFile.name)
      if (sqlSchema) fd.append('sqlSchema', sqlSchema)

      const res = await fetch('/api/labs', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        setMessage('Saved successfully')
        setErFile(null)
        setRelFile(null)
        setSqlSchema("")
        setOpen(false)
      } else {
        setMessage(data?.error || 'Failed to save')
      }
    } catch (err: any) {
      setMessage(err?.message || 'Unknown error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative p-6 rounded-2xl bg-slate-900/30 border border-slate-700 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{lab.title}</h3>
          <p className="text-sm text-slate-400 mb-4">{lab.description}</p>

          <div className="flex gap-2 flex-wrap">
            {(lab.tags || []).map((t) => (
              <span key={t} className="text-xs px-2 py-1 bg-slate-800/40 rounded-full text-slate-300">{t}</span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <Database className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href={lab.link || '#'} className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white">
            Open Lab
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button onClick={() => setOpen((s) => !s)} className="px-3 py-2 bg-slate-800/40 rounded-lg text-sm">
            {open ? 'Close resources' : 'Add / Edit resources'}
          </button>
        </div>

        <button onClick={() => alert(`Launching ${lab.title}`)} className="px-3 py-2 bg-purple-500/40 rounded-lg text-sm">
          Launch
        </button>
      </div>

      {open && (
        <div className="mt-6 p-4 bg-slate-900/20 border border-slate-700 rounded-lg">
          <div className="grid gap-4">
            <label className="text-sm">1) ER Diagram (.dia or image) — optional</label>
            <input type="file" accept=".dia,image/*" onChange={(e) => setErFile(e.target.files?.[0] ?? null)} />

            <label className="text-sm">2) Relationship model (.dia or image) — optional</label>
            <input type="file" accept=".dia,image/*" onChange={(e) => setRelFile(e.target.files?.[0] ?? null)} />

            <label className="text-sm">3) SQL Schema — optional</label>
            <textarea value={sqlSchema} onChange={(e) => setSqlSchema(e.target.value)} rows={6} className="w-full p-3 rounded-md bg-slate-900/40 border border-slate-700 text-sm" placeholder="Enter CREATE TABLE statements or full schema" />

            <div className="flex items-center gap-3">
              <button onClick={handleSubmit} disabled={submitting} className="px-4 py-2 bg-purple-500 rounded-md text-sm font-medium">
                {submitting ? 'Saving...' : 'Save resources'}
              </button>
              <button onClick={() => { setErFile(null); setRelFile(null); setSqlSchema(""); setMessage(null) }} className="px-3 py-2 bg-slate-800/40 rounded-md text-sm">Clear</button>
              {message && <div className="text-sm text-slate-300">{message}</div>}
            </div>
          </div>
        </div>
      )}
    </motion.article>
  )
}

export default function LabsPage() {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [labs, setLabs] = useState<Lab[]>([])
  const [loadingLabs, setLoadingLabs] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newTags, setNewTags] = useState("")
  const [newLink, setNewLink] = useState("")

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

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">Labs</h1>
              <p className="text-sm text-slate-400">Interactive experiments and demos — same QuantumDB theme</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 relative">
            <button onClick={() => setShowAdd((s) => !s)} className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center gap-2 text-sm">
              <FolderPlus className="w-4 h-4 text-slate-200" />
              New Lab
            </button>

            {showAdd && (
              <div className="fixed inset-0 z-50">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAdd(false)} />

                <motion.aside
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="absolute right-0 top-0 h-full w-full sm:w-96 p-6 bg-slate-900/40 border-l border-slate-800 shadow-2xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-semibold">Create New Lab</div>
                      <div className="text-sm text-slate-400">Add a lab with optional resources</div>
                    </div>
                    <button onClick={() => setShowAdd(false)} className="p-2 rounded-md bg-slate-800/30">
                      <X className="w-4 h-4 text-slate-200" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm">Title</label>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded-md bg-slate-900/30 border border-slate-700" />

                    <label className="text-sm">Short description</label>
                    <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Short description" className="w-full p-2 rounded-md bg-slate-900/30 border border-slate-700" />

                    <label className="text-sm">Tags (comma separated)</label>
                    <input value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="tags,comma,separated" className="w-full p-2 rounded-md bg-slate-900/30 border border-slate-700" />

                    <label className="text-sm">Optional link</label>
                    <input value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="optional link" className="w-full p-2 rounded-md bg-slate-900/30 border border-slate-700" />

                    <div className="flex justify-end gap-2 mt-4">
                      <button onClick={() => setShowAdd(false)} className="px-3 py-1 rounded-md bg-slate-800/40">Cancel</button>
                      <button onClick={async () => {
                        try {
                          setCreating(true)
                          const tagsArr = newTags.split(',').map(t => t.trim()).filter(Boolean)
                          const payload = { title: newTitle || 'Untitled Lab', description: newDescription || '', tags: tagsArr, link: newLink || '#' }
                          const res = await fetch('/api/labs/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                          const data = await res.json()
                          if (res.ok && data?.lab) {
                            setLabs((s) => [data.lab, ...s])
                            setNewTitle(''); setNewDescription(''); setNewTags(''); setNewLink(''); setShowAdd(false)
                          } else {
                            alert(data?.error || 'Failed to create lab')
                          }
                        } catch (err: any) {
                          alert(err?.message || 'Failed to create lab')
                        } finally {
                          setCreating(false)
                        }
                      }} className="px-3 py-1 rounded-md bg-purple-500 text-white">{creating ? 'Creating...' : 'Create'}</button>
                    </div>
                  </div>
                </motion.aside>
              </div>
            )}
          </div>
        </header>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                aria-label="Search labs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none"
                placeholder="Search labs, tags, or descriptions"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-3 py-1 rounded-xl text-sm ${activeTag === null ? 'bg-purple-500/25 text-purple-300' : 'bg-slate-800/40 text-slate-300'}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-xl text-sm ${activeTag === tag ? 'bg-purple-500/40 text-white' : 'bg-slate-800/40 text-slate-300'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-slate-900/30 border border-slate-700 rounded-2xl">
              <p className="text-slate-400 mb-4">No labs match your search.</p>
              <button className="px-4 py-2 bg-purple-500/40 rounded-xl">Clear search</button>
            </div>
          ) : (
            filtered.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
