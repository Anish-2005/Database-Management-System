import mongoose, { Schema, Document } from 'mongoose'

export interface IResource extends Document {
  id: number
  title: string
  description: string
  category: string
  type: string
  icon: string
  gradient: string
  downloadUrl?: string
  externalUrl?: string
  content?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const ResourceSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  icon: { type: String, required: true },
  gradient: { type: String, required: true },
  downloadUrl: { type: String },
  externalUrl: { type: String },
  content: { type: String },
  tags: { type: [String], default: [] }
}, { timestamps: true })

const Resource = mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema)
export default Resource
