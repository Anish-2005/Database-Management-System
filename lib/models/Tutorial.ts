import mongoose, { Schema, Document } from 'mongoose'

export interface ITutorial extends Document {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  duration: string
  completed: boolean
  rating: number
  students: number
  instructor: string
  instructorAvatar: string
  icon: string
  gradient: string
  topics: string[]
  prerequisites: string[]
  learningObjectives: string[]
  codeExamples: Array<{
    title: string
    code: string
  }>
  quizQuestions: number
  handsOnExercises: number
  quizData?: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }>
  createdAt: Date
  updatedAt: Date
}

const TutorialSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: String, required: true },
  completed: { type: Boolean, default: false },
  rating: { type: Number, required: true },
  students: { type: Number, required: true },
  instructor: { type: String, required: true },
  instructorAvatar: { type: String, required: true },
  icon: { type: String, required: true },
  gradient: { type: String, required: true },
  topics: { type: [String], default: [] },
  prerequisites: { type: [String], default: [] },
  learningObjectives: { type: [String], default: [] },
  codeExamples: [{
    title: { type: String, required: true },
    code: { type: String, required: true }
  }],
  quizQuestions: { type: Number, default: 0 },
  handsOnExercises: { type: Number, default: 0 },
  quizData: [{
    id: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true }
  }]
}, { timestamps: true })

const Tutorial = mongoose.models.Tutorial || mongoose.model<ITutorial>('Tutorial', TutorialSchema)
export default Tutorial
