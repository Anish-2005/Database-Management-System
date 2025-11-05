import { NextRequest, NextResponse } from 'next/server'
import mongoosePromise from '../../../../lib/mongoose'
import UserPracticeChallenge from '../../../../lib/models/UserPracticeChallenge'
import UserPracticeStats from '../../../../lib/models/UserPracticeStats'
import UserPracticeAchievement from '../../../../lib/models/UserPracticeAchievement'

// GET user practice data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    await mongoosePromise

    // Get user challenge progress
    const challengeProgress = await UserPracticeChallenge.find({ userId })

    // Get user stats
    let userStats = await UserPracticeStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserPracticeStats({ userId })
      await userStats.save()
    }

    // Get user achievements
    const userAchievements = await UserPracticeAchievement.find({ userId })

    // Transform achievements data
    const achievements = [
      {
        id: 'sql_master',
        title: 'SQL Master',
        desc: 'Completed 10 SQL challenges',
        icon: 'Code',
        unlocked: userAchievements.find((a: any) => a.achievementId === 'sql_master')?.unlocked || false,
        progress: Math.min(100, (challengeProgress.filter((c: any) => c.completed && c.challengeId <= 10).length / 10) * 100)
      },
      {
        id: 'query_optimizer',
        title: 'Query Optimizer',
        desc: 'Score 95%+ on performance challenges',
        icon: 'Zap',
        unlocked: userAchievements.find((a: any) => a.achievementId === 'query_optimizer')?.unlocked || false,
        progress: challengeProgress.filter((c: any) => c.challengeId >= 3 && c.challengeId <= 6 && c.bestScore >= 95).length > 0 ? 100 : 0
      },
      {
        id: 'database_architect',
        title: 'Database Architect',
        desc: 'Complete all design challenges',
        icon: 'Database',
        unlocked: userAchievements.find((a: any) => a.achievementId === 'database_architect')?.unlocked || false,
        progress: Math.min(100, (challengeProgress.filter((c: any) => c.completed && (c.challengeId === 2 || c.challengeId === 5)).length / 2) * 100)
      }
    ]

    // Transform stats
    const stats = [
      {
        label: 'Challenges Completed',
        value: userStats.challengesCompleted,
        icon: 'Trophy',
        color: 'from-yellow-500 to-orange-500'
      },
      {
        label: 'Total Points',
        value: userStats.totalPoints,
        icon: 'Star',
        color: 'from-purple-500 to-pink-500'
      },
      {
        label: 'Current Streak',
        value: userStats.currentStreak,
        icon: 'Zap',
        color: 'from-green-500 to-emerald-500'
      },
      {
        label: 'Average Score',
        value: `${Math.round(userStats.averageScore)}%`,
        icon: 'Target',
        color: 'from-cyan-500 to-blue-500'
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        challengeProgress: challengeProgress.map((c: any) => ({
          challengeId: c.challengeId,
          completed: c.completed,
          score: c.score,
          bestScore: c.bestScore,
          attempts: c.attempts,
          completedAt: c.completedAt,
          lastAttemptedAt: c.lastAttemptedAt
        })),
        stats,
        achievements
      }
    })
  } catch (error) {
    console.error('Error fetching user practice data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Update user practice progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, challengeId, action, score, timeSpent } = body

    if (!userId || !challengeId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await mongoosePromise

    // Find or create challenge progress
    let challengeProgress = await UserPracticeChallenge.findOne({ userId, challengeId })
    if (!challengeProgress) {
      challengeProgress = new UserPracticeChallenge({ userId, challengeId })
    }

    // Find or create user stats
    let userStats = await UserPracticeStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserPracticeStats({ userId })
    }

    // Update based on action
    switch (action) {
      case 'start_attempt':
        challengeProgress.attempts += 1
        challengeProgress.lastAttemptedAt = new Date()
        userStats.totalAttempts += 1
        if (timeSpent) userStats.timeSpentMinutes += timeSpent
        break

      case 'complete_challenge':
        if (score !== undefined) {
          challengeProgress.score = score
          challengeProgress.bestScore = Math.max(challengeProgress.bestScore, score)

          // Update average score
          const totalChallenges = await UserPracticeChallenge.countDocuments({ userId, completed: true })
          const totalScore = await UserPracticeChallenge.aggregate([
            { $match: { userId, completed: true } },
            { $group: { _id: null, total: { $sum: '$bestScore' } } }
          ])
          userStats.averageScore = totalScore.length > 0 ? totalScore[0].total / (totalChallenges + 1) : score
        }

        if (!challengeProgress.completed) {
          challengeProgress.completed = true
          challengeProgress.completedAt = new Date()
          userStats.challengesCompleted += 1

          // Award points based on difficulty (simplified)
          const points = challengeId <= 2 ? 100 : challengeId <= 4 ? 150 : 200
          userStats.totalPoints += points

          // Update streak
          const today = new Date().toDateString()
          const lastActivity = userStats.lastActivityDate?.toDateString()

          if (lastActivity === today) {
            // Already active today, don't increment streak
          } else if (lastActivity === new Date(Date.now() - 86400000).toDateString()) {
            // Yesterday, increment streak
            userStats.currentStreak += 1
          } else {
            // Streak broken, reset to 1
            userStats.currentStreak = 1
          }

          userStats.longestStreak = Math.max(userStats.longestStreak, userStats.currentStreak)
        }
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    userStats.lastActivityDate = new Date()

    await challengeProgress.save()
    await userStats.save()

    // Check for achievements
    await checkAndUnlockAchievements(userId)

    return NextResponse.json({
      success: true,
      data: {
        challengeProgress: {
          challengeId: challengeProgress.challengeId,
          completed: challengeProgress.completed,
          score: challengeProgress.score,
          bestScore: challengeProgress.bestScore,
          attempts: challengeProgress.attempts,
          completedAt: challengeProgress.completedAt,
          lastAttemptedAt: challengeProgress.lastAttemptedAt
        },
        stats: {
          totalPoints: userStats.totalPoints,
          challengesCompleted: userStats.challengesCompleted,
          currentStreak: userStats.currentStreak,
          averageScore: userStats.averageScore
        }
      }
    })
  } catch (error) {
    console.error('Error updating user practice progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to check and unlock achievements
async function checkAndUnlockAchievements(userId: string) {
  const challengeProgress = await UserPracticeChallenge.find({ userId })

  // SQL Master: Complete 10 SQL challenges
  const sqlChallengesCompleted = challengeProgress.filter((c: any) => c.completed && c.challengeId === 1).length
  if (sqlChallengesCompleted >= 10) {
    await unlockAchievement(userId, 'sql_master')
  }

  // Query Optimizer: Score 95%+ on performance challenges
  const performanceChallenges = challengeProgress.filter((c: any) => (c.challengeId === 3 || c.challengeId === 6) && c.bestScore >= 95)
  if (performanceChallenges.length > 0) {
    await unlockAchievement(userId, 'query_optimizer')
  }

  // Database Architect: Complete all design challenges
  const designChallenges = challengeProgress.filter((c: any) => (c.challengeId === 2 || c.challengeId === 5) && c.completed)
  if (designChallenges.length >= 2) {
    await unlockAchievement(userId, 'database_architect')
  }
}

async function unlockAchievement(userId: string, achievementId: string) {
  let achievement = await UserPracticeAchievement.findOne({ userId, achievementId })
  if (!achievement) {
    achievement = new UserPracticeAchievement({ userId, achievementId })
  }

  if (!achievement.unlocked) {
    achievement.unlocked = true
    achievement.unlockedAt = new Date()
    achievement.progress = 100
    await achievement.save()
  }
}