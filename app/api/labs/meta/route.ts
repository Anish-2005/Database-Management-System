import mongoosePromise from '../../../../lib/mongoose'
import Lab from '../../../../lib/models/Lab'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, title, description, tags, link } = body

    if (!title) {
      return new Response(JSON.stringify({ ok: false, error: 'title is required' }), { status: 400 })
    }

    // ensure mongoose connected
    await mongoosePromise

    const labId = id || `lab-${Date.now()}`
    const tagsArr = Array.isArray(tags) ? tags : (typeof tags === 'string' && tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [])

    const doc = await Lab.findOneAndUpdate(
      { id: labId },
      {
        id: labId,
        title,
        description: description || '',
        tags: tagsArr,
        link: link || '#'
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean()

    return new Response(JSON.stringify({ ok: true, lab: doc }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    // Log full error server-side for debugging (auth/network errors)
    // eslint-disable-next-line no-console
    console.error('[api/labs/meta] error:', err)

    const message = err?.message || String(err)
    // Detect authentication errors and return 401 with guidance
    if (/auth|authentication|bad auth/i.test(message)) {
      return new Response(JSON.stringify({ ok: false, error: 'MongoDB authentication failed. Check MONGODB_URI, credentials, authSource, and IP whitelist (Atlas Network Access).' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function GET(req: Request) {
  try {
    await mongoosePromise
    const docs = await Lab.find({}).sort({ createdAt: -1 }).lean()
    return new Response(JSON.stringify({ ok: true, labs: docs }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    const message = err?.message || String(err)
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
