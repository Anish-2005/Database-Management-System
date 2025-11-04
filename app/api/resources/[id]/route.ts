import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongoose'
import Resource from '@/lib/models/Resource'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET single resource
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const resource = await Resource.findOne({ id: parseInt(params.id) })
    
    if (!resource) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: resource })
  } catch (error: any) {
    console.error('Error fetching resource:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch resource' },
      { status: 500 }
    )
  }
}

// PUT - Update resource (requires passcode)
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

    await connectDB()
    const body = await request.json()
    
    const resource = await Resource.findOneAndUpdate(
      { id: parseInt(params.id) },
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!resource) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: resource })
  } catch (error: any) {
    console.error('Error updating resource:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update resource' },
      { status: 500 }
    )
  }
}

// DELETE resource (requires passcode)
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

    await connectDB()
    
    const resource = await Resource.findOneAndDelete({ id: parseInt(params.id) })

    if (!resource) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: resource })
  } catch (error: any) {
    console.error('Error deleting resource:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete resource' },
      { status: 500 }
    )
  }
}
