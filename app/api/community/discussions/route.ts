import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongoose'
import { CommunityDiscussion } from '@/lib/models/Community'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET all discussions
export async function GET() {
  try {
    await connectDB()
    const discussions = await CommunityDiscussion.find({}).sort({ id: 1 })
    return NextResponse.json({ success: true, data: discussions })
  } catch (error: any) {
    console.error('Error fetching discussions:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

// POST - Create new discussion (requires passcode)
export async function POST(request: NextRequest) {
  try {
    if (!verifyPasscode(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid passcode' },
        { status: 401 }
      )
    }

    await connectDB()
    const body = await request.json()

    const lastDiscussion = await CommunityDiscussion.findOne().sort({ id: -1 })
    const newId = lastDiscussion ? lastDiscussion.id + 1 : 1

    const discussion = new CommunityDiscussion({
      ...body,
      id: newId
    })

    await discussion.save()
    return NextResponse.json({ success: true, data: discussion }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating discussion:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create discussion' },
      { status: 500 }
    )
  }
}
