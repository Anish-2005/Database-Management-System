// lib/hooks/usePracticeQuiz.ts
import { useState } from "react"
import { PracticeChallenge } from "../practiceData"
import { useAuth } from "../contexts/AuthContext"

export const usePracticeQuiz = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<PracticeChallenge | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const { user } = useAuth()

  const startChallenge = async (challenge: PracticeChallenge) => {
    setSelectedChallenge(challenge)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)

    // Track attempt start if user is logged in
    if (user?.uid) {
      try {
        await fetch('/api/practice/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.uid,
            challengeId: challenge.id,
            action: 'start_attempt',
            timeSpent: 0
          })
        })
      } catch (error) {
        console.error('Error tracking challenge start:', error)
      }
    }
  }

  const submitAnswer = async () => {
    if (!selectedAnswer || !selectedChallenge || isSubmitting) return

    setIsSubmitting(true)

    const question = selectedChallenge.questions[currentQuestion]
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) {
      setScore(prev => prev + Math.floor(selectedChallenge.points / selectedChallenge.questions.length))
    }

    setShowResult(true)

    setTimeout(async () => {
      if (currentQuestion < selectedChallenge.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Challenge completed
        const finalScore = Math.round((score + (isCorrect ? Math.floor(selectedChallenge.points / selectedChallenge.questions.length) : 0)) * 100 / selectedChallenge.points)

        // Save completion if user is logged in
        if (user?.uid) {
          try {
            const response = await fetch('/api/practice/data', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.uid,
                challengeId: selectedChallenge.id,
                action: 'complete_challenge',
                score: finalScore
              })
            })
            const data = await response.json()
            if (data.success && data.data.pointsEarned) {
              setPointsEarned(data.data.pointsEarned)
            }
          } catch (error) {
            console.error('Error saving challenge completion:', error)
          }
        }

        setTimeout(() => {
          setSelectedChallenge(null)
          setCurrentQuestion(0)
          setSelectedAnswer(null)
          setShowResult(false)
          setScore(0)
          setIsSubmitting(false)
        }, 2000)
      }
      setIsSubmitting(false)
    }, 2000)
  }

  const closeChallenge = () => {
    setSelectedChallenge(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setIsSubmitting(false)
    setPointsEarned(0)
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
    isSubmitting,
    pointsEarned
  }
}