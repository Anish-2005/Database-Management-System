import mongoose, { Schema, Document } from 'mongoose'

export interface IUserRecentActivity extends Document {
  userId: string // Firebase UID
  type: 'tutorial' | 'practice' | 'achievement'
  title: string
  status: 'completed' | 'in_progress' | 'earned'
  score: number | null
  timeSpentMinutes: number | null
  date: Date
  category: string
  itemId?: string | number // ID of the tutorial/practice/achievement
  createdAt: Date
}

const UserRecentActivitySchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  type: { type: String, required: true, enum: ['tutorial', 'practice', 'achievement'] },
  title: { type: String, required: true },
  status: { type: String, required: true, enum: ['completed', 'in_progress', 'earned'] },
  score: { type: Number, default: null },
  timeSpentMinutes: { type: Number, default: null },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  itemId: { type: Schema.Types.Mixed }
}, {
  timestamps: true
})

// Index for efficient queries
UserRecentActivitySchema.index({ userId: 1, date: -1 })

const UserRecentActivity = mongoose.models.UserRecentActivity ||
  mongoose.model<IUserRecentActivity>('UserRecentActivity', UserRecentActivitySchema)

export default UserRecentActivity