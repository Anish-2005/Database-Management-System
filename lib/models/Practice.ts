import mongoose, { Schema, Document } from 'mongoose'

export interface IPractice extends Document {
  id: number
  title: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  points: number
  icon: string
  gradient: string
  type: 'interactive' | 'quiz'
  questions: Array<{
    question: string
    type: 'multiple-choice' | 'code'
    correctAnswer: string
    options?: string[]
    hint?: string
  }>
  createdAt: Date
  updatedAt: Date
}

const PracticeSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  duration: { type: String, required: true },
  points: { type: Number, required: true },
  icon: { type: String, required: true },
  gradient: { type: String, required: true },
  type: { type: String, enum: ['interactive', 'quiz'], required: true },
  questions: [{
    question: { type: String, required: true },
    type: { type: String, enum: ['multiple-choice', 'code'], required: true },
    correctAnswer: { type: String, required: true },
    options: { type: [String] },
    hint: { type: String }
  }]
}, { timestamps: true })

const Practice = mongoose.models.Practice || mongoose.model<IPractice>('Practice', PracticeSchema)
export default Practice
