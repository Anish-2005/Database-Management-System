import mongoose, { Schema, Document } from 'mongoose'

export interface IUserSkillProgress extends Document {
  userId: string // Firebase UID
  skill: string
  progress: number // 0-100
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  totalTutorials: number
  completedTutorials: number
  totalPractice: number
  completedPractice: number
  averageScore: number
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

const UserSkillProgressSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  skill: { type: String, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  level: { type: String, default: 'Beginner', enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  totalTutorials: { type: Number, default: 0 },
  completedTutorials: { type: Number, default: 0 },
  totalPractice: { type: Number, default: 0 },
  completedPractice: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0, min: 0, max: 100 },
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Compound index for unique user-skill combinations
UserSkillProgressSchema.index({ userId: 1, skill: 1 }, { unique: true })

const UserSkillProgress = mongoose.models.UserSkillProgress ||
  mongoose.model<IUserSkillProgress>('UserSkillProgress', UserSkillProgressSchema)

export default UserSkillProgress