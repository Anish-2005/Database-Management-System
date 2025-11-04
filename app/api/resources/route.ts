import { NextRequest, NextResponse } from 'next/server'
import mongoosePromise from '@/lib/mongoose'
import Resource from '@/lib/models/Resource'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET all resources
export async function GET() {
  try {
    await mongoosePromise
    const resources = await Resource.find({}).sort({ id: 1 })
    return NextResponse.json({ success: true, data: resources })
  } catch (error: any) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

// POST - Create new resource (requires passcode)
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

    const lastResource = await Resource.findOne().sort({ id: -1 })
    const newId = lastResource ? lastResource.id + 1 : 1

    const resource = new Resource({
      ...body,
      id: newId
    })

    await resource.save()
    return NextResponse.json({ success: true, data: resource }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating resource:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create resource' },
      { status: 500 }
    )
  }
}
