import { NextRequest, NextResponse } from 'next/server'
import mongoosePromise from '../../../../lib/mongoose'
import Lab from '../../../../lib/models/Lab'

// Passcode verification helper
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET all labs
export async function GET() {
  try {
    await mongoosePromise
    const labs = await Lab.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: labs })
  } catch (error: any) {
    console.error('Error fetching labs:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch labs' },
      { status: 500 }
    )
  }
}

// POST - Create new lab (requires passcode)
export async function POST(request: NextRequest) {
  try {
    // Verify passcode
    if (!verifyPasscode(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid passcode' },
        { status: 401 }
      )
    }

    await mongoosePromise
    const body = await request.json()

    const lab = new Lab(body)
    await lab.save()

    return NextResponse.json({ success: true, data: lab }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating lab:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create lab' },
      { status: 500 }
    )
  }
}