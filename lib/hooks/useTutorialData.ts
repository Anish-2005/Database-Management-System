import { useState, useEffect } from 'react'
import { tutorials, categories } from '../../lib/tutorialData'

interface Tutorial {
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
  codeExamples: Array<{ title: string; code: string }>
  quizQuestions: number
  handsOnExercises: number
  quizData?: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }>
}

export function useTutorialData() {
  const [tutorialData, setTutorialData] = useState<Tutorial[]>(tutorials)
  const [categoriesData] = useState<string[]>(categories)

  // Load tutorial progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('tutorial-progress')
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setTutorialData((prev: Tutorial[]) =>
        prev.map((tutorial: Tutorial) => ({
          ...tutorial,
          completed: progress[tutorial.id] === 100
        }))
      )
    }
  }, [])

  return {
    tutorials: tutorialData,
    categories: categoriesData,
    setTutorials: setTutorialData
  }
}