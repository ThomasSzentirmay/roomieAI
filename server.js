import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '50mb' }))

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

if (!ANTHROPIC_API_KEY) {
  console.error('❌ No API key found — check your .env file has ANTHROPIC_API_KEY=sk-ant-...')
  process.exit(1)
}

console.log('🔑 API key loaded:', ANTHROPIC_API_KEY.slice(0, 16) + '...')

app.post('/api/messages', async (req, res) => {
  try {
    console.log('📨 Incoming request — model:', req.body.model, '| messages:', req.body.messages?.length)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('❌ Anthropic API error:', response.status, JSON.stringify(data))
      return res.status(response.status).json(data)
    }

    console.log('✅ Response received — stop_reason:', data.stop_reason, '| output tokens:', data.usage?.output_tokens)
    res.json(data)

  } catch (err) {
    console.error('❌ Server error:', err.message)
    res.status(500).json({ error: { message: err.message } })
  }
})

app.listen(3001, () => console.log('✅ Proxy running on http://localhost:3001'))