import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '50mb' }))

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

app.post('/api/messages', async (req, res) => {
  try {
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
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
})

app.listen(3001, () => console.log('✅ Proxy running on http://localhost:3001'))
