import { useState } from 'react'

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

export function useTutorialQuiz() {
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({})
  const [showQuiz, setShowQuiz] = useState(false)

  // Quiz functions
  const handleQuizAnswer = (questionId: number, answerIndex: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const submitQuiz = (tutorialId: number) => {
    setQuizSubmitted(prev => ({
      ...prev,
      [tutorialId]: true
    }))
  }

  const calculateQuizScore = (tutorial: Tutorial) => {
    if (!tutorial.quizData) return 0
    let correct = 0
    tutorial.quizData.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer.toString()) {
        correct++
      }
    })
    return Math.round((correct / tutorial.quizData.length) * 100)
  }

  const resetQuiz = (tutorialId: number) => {
    setQuizAnswers({})
    setQuizSubmitted(prev => ({
      ...prev,
      [tutorialId]: false
    }))
  }

  return {
    // State
    quizAnswers,
    quizSubmitted,
    showQuiz,
    setShowQuiz,

    // Functions
    handleQuizAnswer,
    submitQuiz,
    calculateQuizScore,
    resetQuiz
  }
}