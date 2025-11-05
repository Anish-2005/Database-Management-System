import mongoose, { Schema, Document } from 'mongoose'

export interface IUserPracticeStats extends Document {
  userId: string // Firebase UID
  totalPoints: number
  challengesCompleted: number
  currentStreak: number
  longestStreak: number
  totalAttempts: number
  averageScore: number
  timeSpentMinutes: number // total time spent on practice
  lastActivityDate: Date
  createdAt: Date
  updatedAt: Date
}

const UserPracticeStatsSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true, index: true },
  totalPoints: { type: Number, default: 0 },
  challengesCompleted: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  totalAttempts: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0, min: 0, max: 100 },
  timeSpentMinutes: { type: Number, default: 0 },
  lastActivityDate: { type: Date, default: Date.now }
}, {
  timestamps: true
})

const UserPracticeStats = mongoose.models.UserPracticeStats ||
  mongoose.model<IUserPracticeStats>('UserPracticeStats', UserPracticeStatsSchema)

export default UserPracticeStats