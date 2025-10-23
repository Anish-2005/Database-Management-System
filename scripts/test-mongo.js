const { MongoClient } = require('mongodb')

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Missing MONGODB_URI environment variable. Example:')
    console.error("$env:MONGODB_URI='mongodb+srv://user:pass@cluster0...'; node scripts/test-mongo.js")
    process.exitCode = 2
    return
  }

  const client = new MongoClient(uri)
  try {
    console.log('Connecting to MongoDB...')
    await client.connect()
    console.log('Connected. Running ping...')
    const admin = client.db().admin()
    const res = await admin.ping()
    console.log('Ping result:', res)
    console.log('Databases:')
    const dbs = await admin.listDatabases()
    console.dir(dbs, { depth: 2 })
    console.log('Connection looks good.')
  } catch (err) {
    console.error('MongoDB connection failed:')
    console.error('name:', err && err.name)
    console.error('message:', err && err.message)
    console.error('stack:', err && err.stack)
    // If the driver printed a reason in the error.message, show it
  } finally {
    try { await client.close() } catch (_) {}
  }
}

main()
