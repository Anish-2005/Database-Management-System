import { NextRequest, NextResponse } from 'next/server'
import mongoosePromise from '@/lib/mongoose'
import Practice from '@/lib/models/Practice'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET single practice
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongoosePromise
    const { id } = await params
    const practice = await Practice.findOne({ id: parseInt(id) })
    
    if (!practice) {
      return NextResponse.json(
        { success: false, error: 'Practice not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: practice })
  } catch (error: any) {
    console.error('Error fetching practice:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch practice' },
      { status: 500 }
    )
  }
}

// PUT - Update practice (requires passcode)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyPasscode(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid passcode' },
        { status: 401 }
      )
    }

    await mongoosePromise
    const body = await request.json()
    
    const practice = await Practice.findOneAndUpdate(
      { id: parseInt(params.id) },
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!practice) {
      return NextResponse.json(
        { success: false, error: 'Practice not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: practice })
  } catch (error: any) {
    console.error('Error updating practice:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update practice' },
      { status: 500 }
    )
  }
}

// DELETE practice (requires passcode)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyPasscode(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid passcode' },
        { status: 401 }
      )
    }

    await mongoosePromise
    
    const practice = await Practice.findOneAndDelete({ id: parseInt(params.id) })

    if (!practice) {
      return NextResponse.json(
        { success: false, error: 'Practice not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: practice })
  } catch (error: any) {
    console.error('Error deleting practice:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete practice' },
      { status: 500 }
    )
  }
}
