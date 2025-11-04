import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongoose'
import Tutorial from '@/lib/models/Tutorial'

// Passcode verification helper
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET single tutorial
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const tutorial = await Tutorial.findOne({ id: parseInt(params.id) })
    
    if (!tutorial) {
      return NextResponse.json(
        { success: false, error: 'Tutorial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: tutorial })
  } catch (error: any) {
    console.error('Error fetching tutorial:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tutorial' },
      { status: 500 }
    )
  }
}

// PUT - Update tutorial (requires passcode)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const tutorial = await Tutorial.findOneAndUpdate(
      { id: parseInt(params.id) },
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!tutorial) {
      return NextResponse.json(
        { success: false, error: 'Tutorial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: tutorial })
  } catch (error: any) {
    console.error('Error updating tutorial:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update tutorial' },
      { status: 500 }
    )
  }
}

// DELETE tutorial (requires passcode)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify passcode
    if (!verifyPasscode(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid passcode' },
        { status: 401 }
      )
    }

    await connectDB()
    
    const tutorial = await Tutorial.findOneAndDelete({ id: parseInt(params.id) })

    if (!tutorial) {
      return NextResponse.json(
        { success: false, error: 'Tutorial not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: tutorial })
  } catch (error: any) {
    console.error('Error deleting tutorial:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete tutorial' },
      { status: 500 }
    )
  }
}
