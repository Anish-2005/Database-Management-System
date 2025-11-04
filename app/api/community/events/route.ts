import { NextRequest, NextResponse } from 'next/server'
import mongoosePromise from '@/lib/mongoose'
import { CommunityEvent } from '@/lib/models/Community'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET all events
export async function GET() {
  try {
    await mongoosePromise
    const events = await CommunityEvent.find({}).sort({ id: 1 })
    return NextResponse.json({ success: true, data: events })
  } catch (error: any) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST - Create new event (requires passcode)
export async function POST(request: NextRequest) {
  try {
    if (!verifyPasscode(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid passcode' },
        { status: 401 }
      )
    }

    await mongoosePromise
    const body = await request.json()

    const lastEvent = await CommunityEvent.findOne().sort({ id: -1 })
    const newId = lastEvent ? lastEvent.id + 1 : 1

    const event = new CommunityEvent({
      ...body,
      id: newId
    })

    await event.save()
    return NextResponse.json({ success: true, data: event }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create event' },
      { status: 500 }
    )
  }
}
