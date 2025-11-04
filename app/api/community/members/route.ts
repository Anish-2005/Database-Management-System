import { NextRequest, NextResponse } from 'next/server'
import mongoosePromise from '@/lib/mongoose'
import { CommunityMember } from '@/lib/models/Community'

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123'

function verifyPasscode(request: NextRequest): boolean {
  const passcode = request.headers.get('x-admin-passcode')
  return passcode === ADMIN_PASSCODE
}

// GET all members
export async function GET() {
  try {
    await mongoosePromise
    const members = await CommunityMember.find({}).sort({ id: 1 })
    return NextResponse.json({ success: true, data: members })
  } catch (error: any) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

// POST - Create new member (requires passcode)
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

    const lastMember = await CommunityMember.findOne().sort({ id: -1 })
    const newId = lastMember ? lastMember.id + 1 : 1

    const member = new CommunityMember({
      ...body,
      id: newId
    })

    await member.save()
    return NextResponse.json({ success: true, data: member }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create member' },
      { status: 500 }
    )
  }
}
