// API Server - Node.js with Express and MongoDB
// Deployed as Vercel Serverless Function

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cv-website';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Mongoose Schemas
// CV Schema - Stores CV data
const cvSchema = new mongoose.Schema({
  content: {
    personal: Object,
    about: Object,
    experience: [{
      id: Number,
      company: String,
      position: String,
      period: String,
      description: String,
      achievements: [String]
    }],
    skills: Object,
    projects: [{
      id: Number,
      name: String,
      description: String,
      technologies: [String],
      link: String,
      github: Boolean,
      featured: Boolean
    }],
    education: [{
      id: Number,
      institution: String,
      degree: String,
      period: String,
      description: String,
      gpa: String
    }],
    contact: Object
  },
  version: {
    type: Number,
    default: 1
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const CVModel = mongoose.model('CV', cvSchema);

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactModel = mongoose.model('Contact', contactSchema);

// API Routes

// GET - Get CV data
app.get('/api/cv', async (req, res) => {
  try {
    let cv = await CVModel.findOne({ version: 1 });

    if (!cv) {
      // If no CV found, create initial version
      cv = new CVModel({
        content: {
          personal: {
            name: "Nikolay Mantchev",
            title: "JavaScript Developer ",
            email: "nik.mantchev@gmail.com"
          },
          about: {
            headline: "Building Intelligent Digital Experiences",
            description: "I'm a passionate Full Stack Developer with expertise in building modern web applications using React, Node.js, and MongoDB."
          },
          experience: [],
          skills: {},
          projects: [],
          education: [],
          contact: {}
        },
        version: 1
      });
      await cv.save();
    }

    res.json({
      success: true,
      data: cv.content
    });
  } catch (error) {
    console.error('Error fetching CV data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CV data'
    });
  }
});

// POST - Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    const contact = new ContactModel({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
});

// GET - Get contact form submissions (for admin purposes)
app.get('/api/contacts', async (req, res) => {
  try {
    // In production, you should add authentication here
    const contacts = await ContactModel.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts'
    });
  }
});

// GET - Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start Server (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 API Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;

// Export for Vercel Serverless
module.exports.handler = (req, res) => {
  return app(req, res);
};