import mongoose, { Schema, Document } from 'mongoose'

export interface IUserProgressStats extends Document {
  userId: string // Firebase UID
  totalTutorials: number
  completedTutorials: number
  totalPracticeSessions: number
  completedPracticeSessions: number
  totalScore: number
  currentStreak: number
  longestStreak: number
  averageScore: number
  timeSpentHours: number
  achievementsEarned: number
  totalAchievements: number
  lastActivityDate: Date
  createdAt: Date
  updatedAt: Date
}

const UserProgressStatsSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true, index: true },
  totalTutorials: { type: Number, default: 24 }, // Total available tutorials
  completedTutorials: { type: Number, default: 0 },
  totalPracticeSessions: { type: Number, default: 6 }, // Total available practice challenges
  completedPracticeSessions: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0, min: 0, max: 100 },
  timeSpentHours: { type: Number, default: 0 },
  achievementsEarned: { type: Number, default: 0 },
  totalAchievements: { type: Number, default: 5 }, // Total available achievements
  lastActivityDate: { type: Date, default: Date.now }
}, {
  timestamps: true
})

const UserProgressStats = mongoose.models.UserProgressStats ||
  mongoose.model<IUserProgressStats>('UserProgressStats', UserProgressStatsSchema)

export default UserProgressStats