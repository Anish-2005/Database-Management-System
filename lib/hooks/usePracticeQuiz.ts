// lib/hooks/usePracticeQuiz.ts
import { useState } from "react"
import { PracticeChallenge } from "../practiceData"

export const usePracticeQuiz = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<PracticeChallenge | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const startChallenge = (challenge: PracticeChallenge) => {
    setSelectedChallenge(challenge)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  const submitAnswer = () => {
    if (!selectedAnswer || !selectedChallenge) return

    const question = selectedChallenge.questions[currentQuestion]
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) {
      setScore(prev => prev + Math.floor(selectedChallenge.points / selectedChallenge.questions.length))
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < selectedChallenge.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Challenge completed - will be handled by parent component
        setTimeout(() => {
          setSelectedChallenge(null)
          setCurrentQuestion(0)
          setSelectedAnswer(null)
          setShowResult(false)
          setScore(0)
        }, 2000)
      }
    }, 2000)
  }

  const closeChallenge = () => {
    setSelectedChallenge(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  return {
    selectedChallenge,
    currentQuestion,
    selectedAnswer,
    setSelectedAnswer,
    showResult,
    score,
    startChallenge,
    submitAnswer,
    closeChallenge,
  }
}