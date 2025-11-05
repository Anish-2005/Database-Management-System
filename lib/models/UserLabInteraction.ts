import mongoose, { Schema, Document } from 'mongoose'

export interface IUserLabInteraction extends Document {
  userId: string // Firebase UID
  labId: string
  bookmarked: boolean
  favorited: boolean
  progress: number // 0-100
  completed: boolean
  lastAccessedAt: Date
  createdAt: Date
  updatedAt: Date
}

const UserLabInteractionSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  labId: { type: String, required: true, index: true },
  bookmarked: { type: Boolean, default: false },
  favorited: { type: Boolean, default: false },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Boolean, default: false },
  lastAccessedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  // Compound index to ensure one interaction per user per lab
  indexes: [
    { userId: 1, labId: 1 },
    { unique: true, partialFilterExpression: { userId: { $exists: true }, labId: { $exists: true } } }
  ]
})

const UserLabInteraction = mongoose.models.UserLabInteraction ||
  mongoose.model<IUserLabInteraction>('UserLabInteraction', UserLabInteractionSchema)

export default UserLabInteraction