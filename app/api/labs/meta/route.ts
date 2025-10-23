import clientPromise from '../../../../lib/mongodb'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, title, description, tags, link } = body

    if (!title) {
      return new Response(JSON.stringify({ ok: false, error: 'title is required' }), { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'dbms')
    const coll = db.collection('labs')

    const labDoc = {
      id: id || `lab-${Date.now()}`,
      title,
      description: description || '',
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' && tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []),
      link: link || '#',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await coll.updateOne({ id: labDoc.id }, { $set: labDoc }, { upsert: true })

  return new Response(JSON.stringify({ ok: true, lab: labDoc }), { status: 200, headers: { 'Content-Type': 'application/json' } })
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
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'dbms')
    const coll = db.collection('labs')

    const docs = await coll.find({}).sort({ createdAt: -1 }).toArray()
  return new Response(JSON.stringify({ ok: true, labs: docs }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
  return new Response(JSON.stringify({ ok: false, error: err?.message || String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
