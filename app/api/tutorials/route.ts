import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongoose'
import Tutorial from '@/lib/models/Tutorial'

// Passcode verification helper
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET all tutorials
export async function GET() {
  try {
    await connectDB()
    const tutorials = await Tutorial.find({}).sort({ id: 1 })
    return NextResponse.json({ success: true, data: tutorials })
  } catch (error: any) {
    console.error('Error fetching tutorials:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tutorials' },
      { status: 500 }
    )
  }
}

// POST - Create new tutorial (requires passcode)
export async function POST(request: NextRequest) {
  try {
    // Verify passcode
    if (!verifyPasscode(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid passcode' },
        { status: 401 }
      )
    }

    await connectDB()
    const body = await request.json()

    // Generate new ID
    const lastTutorial = await Tutorial.findOne().sort({ id: -1 })
    const newId = lastTutorial ? lastTutorial.id + 1 : 1

    const tutorial = new Tutorial({
      ...body,
      id: newId
    })

    await tutorial.save()
    return NextResponse.json({ success: true, data: tutorial }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating tutorial:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create tutorial' },
      { status: 500 }
    )
  }
}
