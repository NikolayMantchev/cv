import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const express = (await import('express')).default
const cors = (await import('cors')).default
const { default: contactHandler } = await import('./contact/index.js')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.all('/api/contact', async (req, res) => {
  try {
    await contactHandler(req, res)
  } catch (err) {
    console.error('Handler error:', err)
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
})

app.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ API server running on http://127.0.0.1:${PORT}`)
  console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✓ set' : '✗ missing'}`)
  console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✓ set' : '✗ missing'}`)
})
