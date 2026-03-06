# Roomie 🏠
### AI-Powered Interior Design Assistant

> Upload a photo of any room. Describe your vibe. Get instant AI redesign concepts with every item shoppable across Amazon, Google, eBay, and Etsy.

---

## What It Does

Roomie is a mobile-first AI design app that lets users:

1. **Snap or upload photos** of any room (bedroom, living room, office, bathroom, studio — anything)
2. **Choose a style** from 14 presets (including "Clean Up" and "Casual Rearrangement") or type their own
3. **Describe their dream vibe** in plain text
4. **Get 4 AI-generated redesign concepts** — each with 8–12 shoppable hotspots pinned to every visible item in the room
5. **Buy anything instantly** via Amazon, Google Shopping, eBay, and Etsy links

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (JSX, single-file component) |
| AI Model | Claude `claude-sonnet-4-20250514` via Anthropic API |
| Styling | Pure CSS-in-JS (no external UI library) |
| Fonts | Google Fonts — Bebas Neue, DM Sans, Space Mono |
| Shopping | Amazon, Google Shopping, eBay, Etsy (search URLs) |

---

## Features

### 📸 Camera-First Upload
- Tap **"+ ADD PHOTO"** to open a native-style bottom sheet
- **Take a Photo** — opens the rear-facing camera directly (`capture="environment"`)
- **Choose from Library** — pick existing photos from your device
- Supports up to **4 photos** per session, shown as a scrollable thumbnail strip

### 🎨 Style Selection
- **14 preset style chips** including:
  - `Clean Up` — AI focuses on organising, decluttering, storage solutions
  - `Casual Rearrangement` — repositioning furniture + small accent upgrades
  - Minimalist, Japandi, Industrial, Bohemian, Maximalist, and more
- **Custom styles** — tap `+ Other` to type any aesthetic (e.g. "Tokyo Capsule Hotel", "Wes Anderson", "Gothic Glam")
- Mix and match as many as you like

### 🤖 AI Room Analysis
- Powered by **Claude's vision AI** — reads your actual uploaded photos
- Identifies every visible item: furniture, lighting, rugs, curtains, art, plants, cushions, appliances, storage
- Generates **4 distinct redesign concepts** tailored to your specific room
- Special modes for `Clean Up` and `Casual Rearrangement` styles

### 🛍 Everything Is Shoppable
- **8–12 shoppable hotspots** per concept, covering the entire room
- Each item includes:
  - 📦 **Amazon** link
  - 🛍 **Google Shopping** link
  - 🔄 **eBay** link (great for secondhand/vintage)
  - 🎨 **Etsy** link (handmade & vintage)
- Items tagged as `NEW` (to add) or `UPGRADE` (replaces something existing)
- `♻ 2nd hand` badge on items ideal to buy secondhand
- Tap any glowing hotspot on the image for an inline price tooltip

### 📱 Mobile-First UI
- Renders inside a realistic **iPhone frame** (390×844px)
- Live status bar with real-time clock
- Native-style **bottom sheet** for photo selection
- Smooth **slide-up animations** for detail views
- Fixed bottom **Generate button** with gradient fade
- Touch-optimised tap targets throughout

---

## File Structure

```
roomie.jsx          ← Single-file React component (everything included)
README.md           ← This file
```

---

## How to Run

### Option 1 — Claude Artifact (current)
The app runs directly as a React artifact in Claude.ai. No setup needed.

### Option 2 — Local Development
```bash
# Create a new React app
npx create-react-app roomie
cd roomie

# Replace src/App.jsx with roomie.jsx contents
# Then run:
npm start
```

### Option 3 — Vite
```bash
npm create vite@latest roomie -- --template react
cd roomie
npm install
# Replace src/App.jsx with roomie.jsx contents
npm run dev
```

> **Note:** The Anthropic API key is handled automatically in the Claude artifact environment. For local/production use, you'll need to add your own API key and proxy requests through a backend (never expose API keys client-side).

---

## Going to the App Store

To publish Roomie on iOS, the next steps are:

| Step | Tool |
|---|---|
| Wrap in native shell | React Native or Capacitor/Expo |
| Real product links | Wayfair, IKEA, Amazon affiliate APIs |
| User accounts | Auth (Clerk, Supabase, Firebase) |
| Save designs | Cloud storage per user |
| Monetisation | Freemium (X free generations/month) + affiliate revenue |

---

## Room Types Supported

Living Room · Bedroom · Bathroom · Kitchen · Home Office · Dining Room · Studio · Nursery · Garage · Outdoor Patio · **Any custom room type**

---

## Style Presets

| Style | Description |
|---|---|
| Clean Up | Declutter, organise, storage solutions |
| Casual Rearrangement | Reposition furniture, small accent upgrades |
| Minimalist | Clean lines, negative space, essentials only |
| Scandinavian | Light woods, neutral tones, cosy functionality |
| Industrial | Raw materials, metal, exposed elements |
| Bohemian | Layered textures, eclectic, warm colours |
| Mid-Century Modern | Retro curves, warm wood, iconic silhouettes |
| Japandi | Japanese minimalism meets Scandinavian calm |
| Art Deco | Geometric glamour, gold accents, bold patterns |
| Coastal | Light, airy, natural textures, ocean palette |
| Dark & Moody | Deep tones, dramatic lighting, rich materials |
| Maximalist | More is more — bold, layered, expressive |
| Farmhouse | Rustic warmth, shiplap, vintage charm |
| Futuristic | Clean tech, smart materials, forward-looking |
| + Any custom style | Type anything you can imagine |

---

## Budget Options

- Under $500
- $500 – $2,000
- $2,000 – $10,000
- $10,000+
- No limit — go wild

---

*Built with Claude · Anthropic API · React*
