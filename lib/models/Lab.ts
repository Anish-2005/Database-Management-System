import mongoose, { Schema, Document } from 'mongoose'

export interface ILab extends Document {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  createdAt: Date
  updatedAt: Date
}

const LabSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] },
  link: { type: String, default: '#' }
}, { timestamps: true })

const Lab = mongoose.models.Lab || mongoose.model<ILab>('Lab', LabSchema)
export default Lab
