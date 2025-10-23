import mongoosePromise from '../../../lib/mongoose'
import LabAsset from '../../../lib/models/LabAsset'

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const labId = form.get('labId')?.toString() ?? null
    const sqlSchema = form.get('sqlSchema')?.toString() ?? null

    const erFile = form.get('erDiagram') as File | null
    const relFile = form.get('relationship') as File | null

    const payload: any = {}
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

    await mongoosePromise

    if (!labId) {
      const doc = new LabAsset({ ...payload })
      await doc.save()
    } else {
      await LabAsset.findOneAndUpdate({ labId }, { $set: payload }, { upsert: true, new: true })
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

    await mongoosePromise

    if (labId) {
      const doc = await LabAsset.findOne({ labId }).lean()
      return new Response(JSON.stringify({ ok: true, doc }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    const docs = await LabAsset.find({}).lean()
    return new Response(JSON.stringify({ ok: true, docs }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    const message = err?.message || String(err)
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
