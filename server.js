import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '50mb' }))

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY

if (!ANTHROPIC_API_KEY) {
  console.error('❌ No Anthropic API key found — check your .env file')
  process.exit(1)
}
if (!REPLICATE_API_KEY) {
  console.error('❌ No Replicate API key found — check your .env file')
  process.exit(1)
}

console.log('🔑 Anthropic key loaded:', ANTHROPIC_API_KEY.slice(0, 16) + '...')
console.log('🔑 Replicate key loaded:', REPLICATE_API_KEY.slice(0, 8) + '...')

// ── Anthropic proxy ──────────────────────────────────────────────────────────
app.post('/api/messages', async (req, res) => {
  try {
    console.log('📨 Anthropic request — model:', req.body.model)

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
      console.error('❌ Anthropic error:', response.status, JSON.stringify(data))
      return res.status(response.status).json(data)
    }

    console.log('✅ Anthropic done — stop_reason:', data.stop_reason, '| tokens:', data.usage?.output_tokens)
    res.json(data)

  } catch (err) {
    console.error('❌ Anthropic server error:', err.message)
    res.status(500).json({ error: { message: err.message } })
  }
})

// ── Replicate SDXL text-to-image ─────────────────────────────────────────────
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body

  try {
    console.log('🎨 Generating image — prompt:', prompt.slice(0, 100) + '...')

    const startRes = await fetch('https://api.replicate.com/v1/models/stability-ai/sdxl/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          prompt: prompt + ', professional interior design photography, photorealistic, high resolution, beautiful lighting',
          negative_prompt: 'blurry, cartoon, illustration, painting, low quality, dark, ugly, deformed',
          width: 768,
          height: 512,
          num_inference_steps: 25,
          guidance_scale: 7.5,
          num_outputs: 1,
        }
      })
    })

    const prediction = await startRes.json()

    if (!startRes.ok) {
      console.error('❌ Replicate start error:', JSON.stringify(prediction))
      return res.status(500).json({ error: { message: prediction.detail || 'Failed to start generation' } })
    }

    console.log('⏳ Prediction started:', prediction.id)

    const imageUrl = await pollPrediction(prediction.id)
    console.log('✅ Image ready:', imageUrl)
    res.json({ imageUrl })

  } catch (err) {
    console.error('❌ Image generation error:', err.message)
    res.status(500).json({ error: { message: err.message } })
  }
})

// ── Poll until done ───────────────────────────────────────────────────────────
async function pollPrediction(id) {
  const maxAttempts = 60

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 2000))

    const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { 'Authorization': `Token ${REPLICATE_API_KEY}` }
    })

    const data = await pollRes.json()
    console.log(`  ↳ poll ${i + 1}: ${data.status}`)

    if (data.status === 'succeeded') {
      return Array.isArray(data.output) ? data.output[0] : data.output
    }

    if (data.status === 'failed' || data.status === 'canceled') {
      throw new Error(`Prediction ${data.status}: ${data.error || 'unknown'}`)
    }
  }

  throw new Error('Image generation timed out')
}

app.listen(3001, () => console.log('✅ Proxy running on http://localhost:3001'))
