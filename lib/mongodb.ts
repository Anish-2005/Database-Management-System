import { MongoClient } from 'mongodb'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  // Do not throw during module import — return a rejected promise so route handlers
  // can catch and return JSON errors instead of letting Next render an HTML crash page.
  clientPromise = Promise.reject(new Error('Please define the MONGODB_URI environment variable inside .env.local'))
} else {
  const uri = "mongodb+srv://dbms:dbms@cluster0.jeuyl3r.mongodb.net/"

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    // Attach a catch to surface auth/network errors with a clearer message.
    global._mongoClientPromise = client.connect().catch((err) => {
      // Log original error server-side for debugging
      // eslint-disable-next-line no-console
      console.error('[lib/mongodb] MongoClient.connect error:', err)
      throw new Error('MongoDB connection error: ' + (err?.message || String(err)))
    })
  }

  clientPromise = global._mongoClientPromise as Promise<MongoClient>
}

export default clientPromise
