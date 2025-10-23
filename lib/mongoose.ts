import mongoose from 'mongoose'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _mongoosePromise: Promise<typeof mongoose> | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  // Export a rejected promise so callers can catch and return friendly errors
  // without crashing module evaluation.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rejected: Promise<typeof mongoose> = Promise.reject(new Error('Please set MONGODB_URI in your environment'))
  // @ts-ignore
  global._mongoosePromise = rejected
}

if (!global._mongoosePromise) {
  // Create the connection promise and cache it globally to avoid multiple connections in dev
  // eslint-disable-next-line no-console
  console.log('[lib/mongoose] connecting to MongoDB...')
  // Use mongoose.connect which returns a promise
  // Wrap errors to provide clearer messages
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  global._mongoosePromise = mongoose.connect(process.env.MONGODB_URI || '').then(() => mongoose).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('[lib/mongoose] connection error:', err)
    throw new Error('MongoDB connection error: ' + (err?.message || String(err)))
  })
}

const mongoosePromise = global._mongoosePromise as Promise<typeof mongoose>

export default mongoosePromise
