import mongoose, { Schema, Document } from 'mongoose'

export interface IUserTutorialInteraction extends Document {
  userId: string // Firebase UID
  tutorialId: number
  bookmarked: boolean
  favorited: boolean
  progress: number // 0-100
  completed: boolean
  lastAccessedAt: Date
  createdAt: Date
  updatedAt: Date
}

const UserTutorialInteractionSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  tutorialId: { type: Number, required: true, index: true },
  bookmarked: { type: Boolean, default: false },
  favorited: { type: Boolean, default: false },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Boolean, default: false },
  lastAccessedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Create compound index for unique user-tutorial interactions
UserTutorialInteractionSchema.index({ userId: 1, tutorialId: 1 }, { unique: true })

const UserTutorialInteraction = mongoose.models.UserTutorialInteraction ||
  mongoose.model<IUserTutorialInteraction>('UserTutorialInteraction', UserTutorialInteractionSchema)

export default UserTutorialInteraction