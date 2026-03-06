import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '50mb' }))

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY

if (!ANTHROPIC_API_KEY) {
  console.error('❌ No Anthropic API key found')
  process.exit(1)
}

if (!REPLICATE_API_KEY) {
  console.error('❌ No Replicate API key found')
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

    console.log('✅ Anthropic response — stop_reason:', data.stop_reason, '| tokens:', data.usage?.output_tokens)
    res.json(data)

  } catch (err) {
    console.error('❌ Anthropic server error:', err.message)
    res.status(500).json({ error: { message: err.message } })
  }
})

// ── Replicate image generation ───────────────────────────────────────────────
app.post('/api/generate-image', async (req, res) => {
  const { prompt, imageBase64, mimeType } = req.body

  try {
    console.log('🎨 Generating image for prompt:', prompt.slice(0, 80) + '...')

    // Start the prediction
    const startRes = await fetch('https://api.replicate.com/v1/models/stability-ai/stable-diffusion-img2img/versions/15a3689ee13b0d2616e98820eca31d4af4a36106d57a9oe786ea5026107f12098/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
          image: `data:${mimeType};base64,${imageBase64}`,
          prompt_strength: 0.6,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: 'K_EULER',
        }
      })
    })

    if (!startRes.ok) {
      // Fall back to text-to-image if img2img fails
      console.log('⚠️ img2img failed, trying text2img...')
      return generateText2Img(prompt, res)
    }

    const prediction = await startRes.json()
    console.log('⏳ Prediction started:', prediction.id)

    // Poll for result
    const imageUrl = await pollPrediction(prediction.id)
    console.log('✅ Image ready:', imageUrl)
    res.json({ imageUrl })

  } catch (err) {
    console.error('❌ Image generation error:', err.message)
    res.status(500).json({ error: { message: err.message } })
  }
})

async function generateText2Img(prompt, res) {
  try {
    const startRes = await fetch('https://api.replicate.com/v1/models/stability-ai/sdxl/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait=60',
      },
      body: JSON.stringify({
        input: {
          prompt: `interior design photo, ${prompt}, professional photography, high quality, realistic`,
          negative_prompt: 'blurry, low quality, cartoon, illustration',
          width: 768,
          height: 512,
          num_inference_steps: 30,
          guidance_scale: 7.5,
        }
      })
    })

    const prediction = await startRes.json()
    const imageUrl = await pollPrediction(prediction.id)
    res.json({ imageUrl })
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
}

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
      throw new Error(`Prediction ${data.status}: ${data.error || 'unknown error'}`)
    }
  }
  throw new Error('Image generation timed out')
}

app.listen(3001, () => console.log('✅ Proxy running on http://localhost:3001'))