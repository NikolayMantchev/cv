import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let cached = global._mongooseConnection
if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }
  cached.conn = await cached.promise
  return cached.conn
}

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, required: true },
  message: { type: String, required: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now }
})

const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' })
    }

    if (!MONGODB_URI) {
      return res.status(500).json({ success: false, error: 'Database not configured' })
    }

    await connectDB()

    const contact = new ContactModel({ name, email, subject, message })
    await contact.save()

    return res.status(201).json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error saving contact form:', error)
    return res.status(500).json({ success: false, error: 'Failed to send message' })
  }
}
