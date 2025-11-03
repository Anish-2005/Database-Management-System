"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Plus, Trash2, Database, Code, BookOpen, Target, Calendar, GitBranch } from "lucide-react"
import { useState, useEffect } from "react"
import { Lab, LabDifficulty, LabCodeExample } from '../../lib/labsData'

interface LabFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (lab: Omit<Lab, 'id'>) => void
  editingLab?: Lab | null
  availableIcons?: any[]
}

export default function LabForm({
  isOpen,
  onClose,
  onSave,
  editingLab = null,
  availableIcons = []
}: LabFormProps) {
  const [formData, setFormData] = useState<Partial<Lab>>({
    title: '',
    description: '',
    category: '',
    difficulty: 'Beginner' as LabDifficulty,
    duration: '',
    instructor: '',
    instructorAvatar: '',
    topics: [],
    prerequisites: [],
    learningObjectives: [],
    technologies: [],
    codeExamples: [],
    quizQuestions: 0,
    handsOnExercises: 0,
    estimatedTime: '',
    environment: '',
    rating: 0,
    students: 0,
    gradient: 'from-blue-500 to-cyan-500',
    icon: Database
  })

  const [currentTopic, setCurrentTopic] = useState('')
  const [currentPrerequisite, setCurrentPrerequisite] = useState('')
  const [currentObjective, setCurrentObjective] = useState('')
  const [currentTechnology, setCurrentTechnology] = useState('')
  const [currentCodeExample, setCurrentCodeExample] = useState<Partial<LabCodeExample>>({
    title: '',
    code: '',
    language: 'sql'
  })

  // Initialize form data when editing
  useEffect(() => {
    if (editingLab) {
      setFormData(editingLab)
    } else {
      // Reset form for new lab
      setFormData({
        title: '',
        description: '',
        category: '',
        difficulty: 'Beginner' as LabDifficulty,
        duration: '',
        instructor: '',
        instructorAvatar: '',
        topics: [],
        prerequisites: [],
        learningObjectives: [],
        technologies: [],
        codeExamples: [],
        quizQuestions: 0,
        handsOnExercises: 0,
        estimatedTime: '',
        environment: '',
        rating: 0,
        students: 0,
        gradient: 'from-blue-500 to-cyan-500',
        icon: Database
      })
    }
    setCurrentTopic('')
    setCurrentPrerequisite('')
    setCurrentObjective('')
    setCurrentTechnology('')
    setCurrentCodeExample({ title: '', code: '', language: 'sql' })
  }, [editingLab, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.description && formData.category) {
      onSave(formData as Omit<Lab, 'id'>)
      onClose()
    }
  }

  const addTopic = () => {
    if (currentTopic.trim()) {
      setFormData(prev => ({
        ...prev,
        topics: [...(prev.topics || []), currentTopic.trim()]
      }))
      setCurrentTopic('')
    }
  }

  const removeTopic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics?.filter((_, i) => i !== index) || []
    }))
  }

  const addPrerequisite = () => {
    if (currentPrerequisite.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...(prev.prerequisites || []), currentPrerequisite.trim()]
      }))
      setCurrentPrerequisite('')
    }
  }

  const removePrerequisite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites?.filter((_, i) => i !== index) || []
    }))
  }

  const addObjective = () => {
    if (currentObjective.trim()) {
      setFormData(prev => ({
        ...prev,
        learningObjectives: [...(prev.learningObjectives || []), currentObjective.trim()]
      }))
      setCurrentObjective('')
    }
  }

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives?.filter((_, i) => i !== index) || []
    }))
  }

  const addTechnology = () => {
    if (currentTechnology.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), currentTechnology.trim()]
      }))
      setCurrentTechnology('')
    }
  }

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter((_, i) => i !== index) || []
    }))
  }

  const addCodeExample = () => {
    if (currentCodeExample.title && currentCodeExample.code) {
      setFormData(prev => ({
        ...prev,
        codeExamples: [...(prev.codeExamples || []), currentCodeExample as LabCodeExample]
      }))
      setCurrentCodeExample({ title: '', code: '', language: 'sql' })
    }
  }

  const removeCodeExample = (index: number) => {
    setFormData(prev => ({
      ...prev,
      codeExamples: prev.codeExamples?.filter((_, i) => i !== index) || []
    }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {editingLab ? 'Edit Lab' : 'Create New Lab'}
                </h2>
                <p className="text-slate-400">
                  {editingLab ? 'Update lab details and content' : 'Fill in the details to create a new lab'}
                </p>
              </div>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>

          {/* Form Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Lab Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="Enter lab title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="e.g., Design, Analytics, Architecture"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                  placeholder="Describe what students will learn and build in this lab"
                  rows={3}
                  required
                />
              </div>

              {/* Configuration */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty || 'Beginner'}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as LabDifficulty }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="e.g., 180 min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Environment
                  </label>
                  <input
                    type="text"
                    value={formData.environment || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, environment: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="e.g., MySQL 8.0"
                  />
                </div>
              </div>

              {/* Instructor */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Instructor Name
                  </label>
                  <input
                    type="text"
                    value={formData.instructor || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="Instructor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Instructor Avatar
                  </label>
                  <input
                    type="text"
                    value={formData.instructorAvatar || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, instructorAvatar: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="e.g., JD (initials)"
                  />
                </div>
              </div>

              {/* Topics */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Topics
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTopic}
                    onChange={(e) => setCurrentTopic(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="Add a topic"
                  />
                  <motion.button
                    type="button"
                    onClick={addTopic}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.topics?.map((topic, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/40 border border-slate-700 rounded-full text-sm text-slate-300"
                    >
                      {topic}
                      <button
                        type="button"
                        onClick={() => removeTopic(index)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Prerequisites
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentPrerequisite}
                    onChange={(e) => setCurrentPrerequisite(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="Add a prerequisite"
                  />
                  <motion.button
                    type="button"
                    onClick={addPrerequisite}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {formData.prerequisites?.map((prereq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700"
                    >
                      <BookOpen className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-slate-300 flex-1">{prereq}</span>
                      <button
                        type="button"
                        onClick={() => removePrerequisite(index)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Learning Objectives
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentObjective}
                    onChange={(e) => setCurrentObjective(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="Add a learning objective"
                  />
                  <motion.button
                    type="button"
                    onClick={addObjective}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {formData.learningObjectives?.map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700"
                    >
                      <Target className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <span className="text-slate-300 flex-1">{objective}</span>
                      <button
                        type="button"
                        onClick={() => removeObjective(index)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Technologies
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTechnology}
                    onChange={(e) => setCurrentTechnology(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="Add a technology"
                  />
                  <motion.button
                    type="button"
                    onClick={addTechnology}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies?.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/40 border border-slate-700 rounded-full text-sm text-slate-300"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Code Examples */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Code Examples
                </label>
                <div className="space-y-4 mb-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={currentCodeExample.title || ''}
                      onChange={(e) => setCurrentCodeExample(prev => ({ ...prev, title: e.target.value }))}
                      className="px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Example title"
                    />
                    <select
                      value={currentCodeExample.language || 'sql'}
                      onChange={(e) => setCurrentCodeExample(prev => ({ ...prev, language: e.target.value }))}
                      className="px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    >
                      <option value="sql">SQL</option>
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="java">Java</option>
                      <option value="cypher">Cypher</option>
                    </select>
                    <motion.button
                      type="button"
                      onClick={addCodeExample}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <textarea
                    value={currentCodeExample.code || ''}
                    onChange={(e) => setCurrentCodeExample(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors font-mono text-sm"
                    placeholder="Paste your code example here"
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  {formData.codeExamples?.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-300">{example.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">{example.language}</span>
                          <button
                            type="button"
                            onClick={() => removeCodeExample(index)}
                            className="text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <pre className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded border border-slate-600 overflow-x-auto">
                        <code>{example.code.substring(0, 200)}{example.code.length > 200 ? '...' : ''}</code>
                      </pre>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Quiz Questions
                  </label>
                  <input
                    type="number"
                    value={formData.quizQuestions || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, quizQuestions: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Hands-on Exercises
                  </label>
                  <input
                    type="number"
                    value={formData.handsOnExercises || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, handsOnExercises: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    value={formData.rating || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Students
                  </label>
                  <input
                    type="number"
                    value={formData.students || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, students: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    min="0"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-800">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all flex items-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  {editingLab ? 'Update Lab' : 'Create Lab'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}