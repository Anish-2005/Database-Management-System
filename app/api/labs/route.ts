import clientPromise from '../../../lib/mongodb'

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const labId = form.get('labId')?.toString() ?? null
    const sqlSchema = form.get('sqlSchema')?.toString() ?? null

    const erFile = form.get('erDiagram') as File | null
    const relFile = form.get('relationship') as File | null

    const payload: any = { updatedAt: new Date() }
    if (labId) payload.labId = labId
    if (sqlSchema) payload.sqlSchema = sqlSchema

    if (erFile && (erFile as any).size) {
      const ab = await (erFile as any).arrayBuffer()
      payload.erDiagram = {
        filename: (erFile as any).name,
        contentType: (erFile as any).type,
        data: Buffer.from(ab).toString('base64'),
      }
    }

    if (relFile && (relFile as any).size) {
      const ab = await (relFile as any).arrayBuffer()
      payload.relationship = {
        filename: (relFile as any).name,
        contentType: (relFile as any).type,
        data: Buffer.from(ab).toString('base64'),
      }
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'dbms')
    const coll = db.collection('labs_assets')

    if (!labId) {
      await coll.insertOne({ ...payload })
    } else {
      await coll.updateOne({ labId }, { $set: payload }, { upsert: true })
    }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    // Log full error server-side for debugging (auth/connection errors)
    // eslint-disable-next-line no-console
    console.error('[api/labs] error:', err)

    const message = err?.message || String(err)
    if (/auth|authentication|bad auth/i.test(message)) {
      return new Response(JSON.stringify({ ok: false, error: 'MongoDB authentication failed. Check MONGODB_URI, credentials, authSource, and IP whitelist (Atlas Network Access).' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const labId = url.searchParams.get('labId')
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'dbms')
    const coll = db.collection('labs_assets')

    if (labId) {
      const doc = await coll.findOne({ labId })
  return new Response(JSON.stringify({ ok: true, doc }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    const docs = await coll.find({}).toArray()
  return new Response(JSON.stringify({ ok: true, docs }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
  return new Response(JSON.stringify({ ok: false, error: err?.message || String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
