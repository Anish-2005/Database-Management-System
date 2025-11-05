import mongoose, { Schema, Document } from 'mongoose'

export interface IUserPracticeChallenge extends Document {
  userId: string // Firebase UID
  challengeId: number
  completed: boolean
  score: number // percentage score
  attempts: number
  bestScore: number
  completedAt?: Date
  lastAttemptedAt: Date
  createdAt: Date
  updatedAt: Date
}

const UserPracticeChallengeSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  challengeId: { type: Number, required: true, index: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0, min: 0, max: 100 },
  attempts: { type: Number, default: 0 },
  bestScore: { type: Number, default: 0, min: 0, max: 100 },
  completedAt: { type: Date },
  lastAttemptedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Create compound index for unique user-challenge interactions
UserPracticeChallengeSchema.index({ userId: 1, challengeId: 1 }, { unique: true })

const UserPracticeChallenge = mongoose.models.UserPracticeChallenge ||
  mongoose.model<IUserPracticeChallenge>('UserPracticeChallenge', UserPracticeChallengeSchema)

export default UserPracticeChallenge