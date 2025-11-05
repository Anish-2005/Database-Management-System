import mongoose, { Schema, Document } from 'mongoose'

export interface IUserPracticeAchievement extends Document {
  userId: string // Firebase UID
  achievementId: string // unique identifier for achievement
  unlocked: boolean
  unlockedAt?: Date
  progress: number // 0-100 progress towards unlocking
  createdAt: Date
  updatedAt: Date
}

const UserPracticeAchievementSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  achievementId: { type: String, required: true, index: true },
  unlocked: { type: Boolean, default: false },
  unlockedAt: { type: Date },
  progress: { type: Number, default: 0, min: 0, max: 100 }
}, {
  timestamps: true
})

// Create compound index for unique user-achievement interactions
UserPracticeAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true })

const UserPracticeAchievement = mongoose.models.UserPracticeAchievement ||
  mongoose.model<IUserPracticeAchievement>('UserPracticeAchievement', UserPracticeAchievementSchema)

export default UserPracticeAchievement