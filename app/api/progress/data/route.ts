import { NextRequest, NextResponse } from 'next/server'
import mongoosePromise from '../../../../lib/mongoose'
import UserProgressStats from '../../../../lib/models/UserProgressStats'
import UserRecentActivity from '../../../../lib/models/UserRecentActivity'
import UserSkillProgress from '../../../../lib/models/UserSkillProgress'
import UserTutorialInteraction from '../../../../lib/models/UserTutorialInteraction'
import UserPracticeChallenge from '../../../../lib/models/UserPracticeChallenge'
import UserPracticeAchievement from '../../../../lib/models/UserPracticeAchievement'

// GET user progress data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    await mongoosePromise

    // Get or create user progress stats
    let userStats = await UserProgressStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserProgressStats({ userId })
      await userStats.save()
    }

    // Get recent activity (last 10 items)
    const recentActivity = await UserRecentActivity.find({ userId })
      .sort({ date: -1 })
      .limit(10)

    // Get skill progress
    const skillProgress = await UserSkillProgress.find({ userId })

    // If no skill progress exists, create default skills
    if (skillProgress.length === 0) {
      const defaultSkills = [
        { skill: 'SQL Fundamentals', totalTutorials: 8, totalPractice: 2 },
        { skill: 'Database Design', totalTutorials: 6, totalPractice: 2 },
        { skill: 'NoSQL', totalTutorials: 4, totalPractice: 1 },
        { skill: 'Performance Tuning', totalTutorials: 4, totalPractice: 1 },
        { skill: 'Security', totalTutorials: 2, totalPractice: 0 }
      ]

      for (const skillData of defaultSkills) {
        const skill = new UserSkillProgress({
          userId,
          ...skillData,
          progress: 0,
          level: 'Beginner',
          completedTutorials: 0,
          completedPractice: 0,
          averageScore: 0
        })
        await skill.save()
      }

      // Re-fetch after creation
      const updatedSkillProgress = await UserSkillProgress.find({ userId })
      return NextResponse.json({
        success: true,
        data: {
          stats: {
            totalTutorials: userStats.totalTutorials,
            completedTutorials: userStats.completedTutorials,
            totalPracticeSessions: userStats.totalPracticeSessions,
            completedPracticeSessions: userStats.completedPracticeSessions,
            totalScore: userStats.totalScore,
            currentStreak: userStats.currentStreak,
            longestStreak: userStats.longestStreak,
            averageScore: userStats.averageScore,
            timeSpent: userStats.timeSpentHours,
            achievements: userStats.achievementsEarned,
            totalAchievements: userStats.totalAchievements
          },
          recentActivity: recentActivity.map(activity => ({
            id: activity._id.toString(),
            type: activity.type,
            title: activity.title,
            status: activity.status,
            score: activity.score,
            timeSpent: activity.timeSpentMinutes ? `${activity.timeSpentMinutes} min` : null,
            date: activity.date.toISOString().split('T')[0],
            category: activity.category
          })),
          skillProgress: updatedSkillProgress.map(skill => ({
            skill: skill.skill,
            progress: skill.progress,
            level: skill.level,
            color: getSkillColor(skill.level)
          })),
          achievements: getDefaultAchievements(userId),
          learningInsights: getDefaultInsights()
        }
      })
    }

    // Transform data for frontend
    const stats = {
      totalTutorials: userStats.totalTutorials,
      completedTutorials: userStats.completedTutorials,
      totalPracticeSessions: userStats.totalPracticeSessions,
      completedPracticeSessions: userStats.completedPracticeSessions,
      totalScore: userStats.totalScore,
      currentStreak: userStats.currentStreak,
      longestStreak: userStats.longestStreak,
      averageScore: userStats.averageScore,
      timeSpent: userStats.timeSpentHours,
      achievements: userStats.achievementsEarned,
      totalAchievements: userStats.totalAchievements
    }

    const activity = recentActivity.map(activity => ({
      id: activity._id.toString(),
      type: activity.type,
      title: activity.title,
      status: activity.status,
      score: activity.score,
      timeSpent: activity.timeSpentMinutes ? `${activity.timeSpentMinutes} min` : null,
      date: activity.date.toISOString().split('T')[0],
      category: activity.category
    }))

    const skills = skillProgress.map(skill => ({
      skill: skill.skill,
      progress: skill.progress,
      level: skill.level,
      color: getSkillColor(skill.level)
    }))

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentActivity: activity,
        skillProgress: skills,
        achievements: getDefaultAchievements(userId),
        learningInsights: getDefaultInsights()
      }
    })
  } catch (error) {
    console.error('Error fetching user progress data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Update user progress (called when user completes tutorials/practice)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, itemId, title, category, score, timeSpentMinutes } = body

    if (!userId || !type || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await mongoosePromise

    // Get or create user stats
    let userStats = await UserProgressStats.findOne({ userId })
    if (!userStats) {
      userStats = new UserProgressStats({ userId })
    }

    // Create activity record
    const activity = new UserRecentActivity({
      userId,
      type,
      title,
      status: type === 'achievement' ? 'earned' : 'completed',
      score: score || null,
      timeSpentMinutes: timeSpentMinutes || null,
      category,
      itemId,
      date: new Date()
    })

    // Update stats based on type
    if (type === 'tutorial') {
      userStats.completedTutorials = Math.min(userStats.totalTutorials,
        userStats.completedTutorials + 1)
      if (score) userStats.totalScore += score
    } else if (type === 'practice') {
      userStats.completedPracticeSessions = Math.min(userStats.totalPracticeSessions,
        userStats.completedPracticeSessions + 1)
      if (score) userStats.totalScore += score
    } else if (type === 'achievement') {
      userStats.achievementsEarned = Math.min(userStats.totalAchievements,
        userStats.achievementsEarned + 1)
    }

    // Update time spent
    if (timeSpentMinutes) {
      userStats.timeSpentHours += timeSpentMinutes / 60
    }

    // Update streak
    const today = new Date().toDateString()
    const lastActivity = userStats.lastActivityDate?.toDateString()

    if (lastActivity === today) {
      // Already active today
    } else if (lastActivity === new Date(Date.now() - 86400000).toDateString()) {
      // Yesterday, increment streak
      userStats.currentStreak += 1
    } else {
      // Streak broken, reset to 1
      userStats.currentStreak = 1
    }

    userStats.longestStreak = Math.max(userStats.longestStreak, userStats.currentStreak)
    userStats.lastActivityDate = new Date()

    // Calculate average score
    const totalCompletions = userStats.completedTutorials + userStats.completedPracticeSessions
    if (totalCompletions > 0) {
      userStats.averageScore = Math.round(userStats.totalScore / totalCompletions)
    }

    await userStats.save()
    await activity.save()

    // Update skill progress if applicable
    if (type === 'tutorial' && category) {
      await updateSkillProgress(userId, category, score || 0, 'tutorial')
    } else if (type === 'practice' && category) {
      await updateSkillProgress(userId, category, score || 0, 'practice')
    }

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalTutorials: userStats.totalTutorials,
          completedTutorials: userStats.completedTutorials,
          totalPracticeSessions: userStats.totalPracticeSessions,
          completedPracticeSessions: userStats.completedPracticeSessions,
          totalScore: userStats.totalScore,
          currentStreak: userStats.currentStreak,
          longestStreak: userStats.longestStreak,
          averageScore: userStats.averageScore,
          timeSpent: userStats.timeSpentHours,
          achievements: userStats.achievementsEarned,
          totalAchievements: userStats.totalAchievements
        }
      }
    })
  } catch (error) {
    console.error('Error updating user progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper functions
function getSkillColor(level: string): string {
  switch (level) {
    case 'Expert': return 'from-green-500 to-emerald-500'
    case 'Advanced': return 'from-blue-500 to-cyan-500'
    case 'Intermediate': return 'from-purple-500 to-pink-500'
    case 'Beginner': return 'from-orange-500 to-red-500'
    default: return 'from-gray-500 to-slate-500'
  }
}

function getDefaultAchievements(userId: string) {
  return [
    {
      id: 'sql_master',
      title: 'SQL Master',
      description: 'Complete all SQL tutorials with 90%+ average score',
      icon: 'Crown',
      progress: 0, // Will be calculated based on actual progress
      earned: false,
      earnedDate: null,
      rarity: 'legendary',
      points: 500
    },
    {
      id: 'practice_warrior',
      title: 'Practice Warrior',
      description: 'Complete 30 practice challenges',
      icon: 'Trophy',
      progress: 0,
      earned: false,
      earnedDate: null,
      rarity: 'epic',
      points: 300
    },
    {
      id: 'streak_master',
      title: 'Streak Master',
      description: 'Maintain a 10-day learning streak',
      icon: 'Flame',
      progress: 0,
      earned: false,
      earnedDate: null,
      rarity: 'rare',
      points: 200
    },
    {
      id: 'speed_demon',
      title: 'Speed Demon',
      description: 'Complete a tutorial in under 15 minutes with 90%+ score',
      icon: 'Zap',
      progress: 0,
      earned: false,
      earnedDate: null,
      rarity: 'rare',
      points: 150
    },
    {
      id: 'database_explorer',
      title: 'Database Explorer',
      description: 'Explore 5 different database systems',
      icon: 'Database',
      progress: 0,
      earned: false,
      earnedDate: null,
      rarity: 'uncommon',
      points: 100
    }
  ]
}

function getDefaultInsights() {
  return [
    {
      title: 'Focus on Performance Tuning',
      description: 'Your weakest area. Complete the optimization tutorials to improve.',
      icon: 'TrendingUp',
      color: 'from-orange-500 to-red-500',
      action: 'Start Tutorial'
    },
    {
      title: 'Practice More Joins',
      description: 'Complex joins are challenging you. More practice will help.',
      icon: 'Target',
      color: 'from-blue-500 to-cyan-500',
      action: 'Practice Now'
    },
    {
      title: 'Maintain Your Streak',
      description: 'You\'re on a 7-day streak! Keep learning daily to build habits.',
      icon: 'Flame',
      color: 'from-green-500 to-emerald-500',
      action: 'Continue Learning'
    }
  ]
}

async function updateSkillProgress(userId: string, category: string, score: number, type: 'tutorial' | 'practice') {
  let skillName = ''
  switch (category.toLowerCase()) {
    case 'sql':
      skillName = 'SQL Fundamentals'
      break
    case 'design':
      skillName = 'Database Design'
      break
    case 'nosql':
      skillName = 'NoSQL'
      break
    case 'performance':
      skillName = 'Performance Tuning'
      break
    case 'security':
      skillName = 'Security'
      break
    default:
      return
  }

  const skill = await UserSkillProgress.findOne({ userId, skill })
  if (skill) {
    if (type === 'tutorial') {
      skill.completedTutorials += 1
    } else {
      skill.completedPractice += 1
    }

    // Recalculate progress and level
    const totalItems = skill.totalTutorials + skill.totalPractice
    const completedItems = skill.completedTutorials + skill.completedPractice
    skill.progress = Math.min(100, Math.round((completedItems / totalItems) * 100))

    // Update level based on progress
    if (skill.progress >= 90) skill.level = 'Expert'
    else if (skill.progress >= 70) skill.level = 'Advanced'
    else if (skill.progress >= 40) skill.level = 'Intermediate'
    else skill.level = 'Beginner'

    // Update average score
    const totalScore = skill.averageScore * (completedItems - 1) + score
    skill.averageScore = Math.round(totalScore / completedItems)

    skill.lastUpdated = new Date()
    await skill.save()
  }
}