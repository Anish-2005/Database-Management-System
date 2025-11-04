import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongoose'
import Practice from '@/lib/models/Practice'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET all practice challenges
export async function GET() {
  try {
    await connectDB()
    const practices = await Practice.find({}).sort({ id: 1 })
    return NextResponse.json({ success: true, data: practices })
  } catch (error: any) {
    console.error('Error fetching practices:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch practices' },
      { status: 500 }
    )
  }
}

// POST - Create new practice (requires passcode)
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

    const lastPractice = await Practice.findOne().sort({ id: -1 })
    const newId = lastPractice ? lastPractice.id + 1 : 1

    const practice = new Practice({
      ...body,
      id: newId
    })

    await practice.save()
    return NextResponse.json({ success: true, data: practice }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating practice:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create practice' },
      { status: 500 }
    )
  }
}
