import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import UserLabInteraction from '../../../../lib/models/UserLabInteraction'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    await clientPromise

    // Ensure the collection exists
    const db = (await clientPromise).db()
    await db.createCollection('userlabinteractions').catch(() => {
      // Collection might already exist, ignore error
    })

    const interactions = await UserLabInteraction.find({ userId }).catch(() => [])

    // Transform data for frontend
    const result = {
      bookmarks: interactions.filter((i: any) => i.bookmarked).map((i: any) => i.labId),
      favorites: interactions.filter((i: any) => i.favorited).map((i: any) => i.labId),
      progress: Object.fromEntries(
        interactions.map((i: any) => [i.labId, i.progress])
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching user lab interactions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, labId, action, value } = body

    if (!userId || !labId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await clientPromise

    // Find or create interaction document
    let interaction = await UserLabInteraction.findOne({ userId, labId })

    if (!interaction) {
      interaction = new UserLabInteraction({
        userId,
        labId,
        bookmarked: false,
        favorited: false,
        progress: 0,
        completed: false
      })
    }

    // Update based on action
    switch (action) {
      case 'bookmark':
        interaction.bookmarked = value ?? !interaction.bookmarked
        break
      case 'favorite':
        interaction.favorited = value ?? !interaction.favorited
        break
      case 'progress':
        interaction.progress = Math.max(0, Math.min(100, value || 0))
        interaction.completed = interaction.progress === 100
        break
      case 'complete':
        interaction.progress = 100
        interaction.completed = true
        break
      case 'reset':
        interaction.progress = 0
        interaction.completed = false
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    interaction.lastAccessedAt = new Date()
    await interaction.save()

    return NextResponse.json({
      success: true,
      interaction: {
        labId: interaction.labId,
        bookmarked: interaction.bookmarked,
        favorited: interaction.favorited,
        progress: interaction.progress,
        completed: interaction.completed
      }
    })
  } catch (error) {
    console.error('Error updating user lab interaction:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}