// Vercel Serverless Function for Contact Form
// Handles POST requests to submit contact form data

import { MongoClient } from 'mongodb'

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cv-website'
const MONGODB_DB = process.env.MONGODB_DB || 'cv-website'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const { name, email, subject, message } = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      })
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message exceeds maximum length of 2000 characters'
      })
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(MONGODB_URI, {
      useUnifiedTopology: true
    })

    const db = client.db(MONGODB_DB)
    const contacts = db.collection('contacts')

    // Create new contact entry
    const contact = {
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    }

    await contacts.insertOne(contact)

    // Close connection
    await client.close()

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    })

  } catch (error) {
    console.error('Error saving contact form:', error)

    // Return error response
    return res.status(500).json({
      success: false,
      error: 'Failed to send message'
    })
  }
}