import mongoose, { Schema, Document } from 'mongoose'

export interface IEmbeddedFile {
  filename: string
  contentType: string
  data: string // base64
}

export interface ILabAsset extends Document {
  labId?: string
  sqlSchema?: string
  erDiagram?: IEmbeddedFile
  relationship?: IEmbeddedFile
  createdAt: Date
  updatedAt: Date
}

const EmbeddedFileSchema: Schema = new Schema({
  filename: String,
  contentType: String,
  data: String
}, { _id: false })

const LabAssetSchema: Schema = new Schema({
  labId: { type: String, index: true },
  sqlSchema: { type: String },
  erDiagram: { type: EmbeddedFileSchema },
  relationship: { type: EmbeddedFileSchema }
}, { timestamps: true })

const LabAsset = mongoose.models.LabAsset || mongoose.model<ILabAsset>('LabAsset', LabAssetSchema)
export default LabAsset
