# ✈️ VoyageAI — AI-Powered Travel Planner

A production-level AI travel assistant built with **Next.js 15**, **Groq AI**, **TailwindCSS v4**, **TypeScript**, and **Prisma/PostgreSQL**.

---

## 🚀 Features

- **AI Itinerary Generator** — Full multi-day personalized itineraries via Groq (llama3-70b-8192)
- **Real Data Integration** — Google Places, Ticketmaster events, OpenWeather API
- **AI Chat Concierge** — Floating chat sidebar with streaming responses
- **Daily Plan** — Morning/afternoon/evening activities with insider tips
- **Hidden Gems** — Off-the-beaten-path spots tourists miss
- **Budget Breakdown** — Detailed cost estimates by category
- **Travel Tips** — Categorized insider advice
- **Events Section** — Local events during your stay
- **Share Trips** — Shareable itinerary links
- **Loading Skeletons** — Premium loading states
- **Framer Motion** — Smooth animations throughout

---

## 🛠 Tech Stack

| Layer      | Tech                                  |
|------------|---------------------------------------|
| Framework  | Next.js 15 App Router                 |
| Styling    | TailwindCSS v4 + Framer Motion        |
| Language   | TypeScript                            |
| AI         | Groq API (llama3-70b-8192)           |
| Database   | PostgreSQL + Prisma ORM               |
| Icons      | Lucide React                          |
| Images     | Next.js Image + Unsplash              |

---

## ⚡ Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai_travel_db

# Optional (enhances AI output with real data)
GOOGLE_PLACES_API_KEY=your_key
TICKETMASTER_API_KEY=your_key
OPENWEATHER_API_KEY=your_key
```

### 3. Get your Groq API key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up / log in
3. Create an API key
4. Add it to `.env` as `GROQ_API_KEY`

### 4. Set up the database

```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
app/
├── page.tsx              # Landing page
├── trip/
│   └── page.tsx          # Trip planner page
├── api/
│   ├── trip/route.ts     # Trip generation API
│   └── chat/route.ts     # Chat API (streaming)
├── globals.css
└── layout.tsx

components/
├── navbar.tsx            # Navigation
├── hero.tsx              # Landing hero
├── trip-form.tsx         # Trip input form
├── itinerary-card.tsx    # Day card with timeline
├── event-card.tsx        # Event & hidden gem cards
├── chat-sidebar.tsx      # AI chat (streaming)
└── loading-skeleton.tsx  # Shimmer loaders

lib/
├── ai/
│   └── groq.ts           # Groq client
├── prompts/
│   └── itinerary-prompt.ts
├── services/
│   ├── places.ts         # Google Places
│   ├── events.ts         # Ticketmaster
│   └── weather.ts        # OpenWeather
├── utils/
│   └── format.ts         # Constants & helpers
└── db.ts                 # Prisma singleton

prisma/
└── schema.prisma
```

---

## 🌐 External APIs (Optional)

The app works without external APIs — Groq AI generates everything from its training data. But adding these enhances quality:

| API              | Purpose                        | Free Tier |
|------------------|--------------------------------|-----------|
| Google Places    | Real nearby attractions        | ✅ Yes    |
| Ticketmaster     | Local events during your stay  | ✅ Yes    |
| OpenWeather      | Weather forecast data          | ✅ Yes    |

---

## 🎨 Design System

| Token       | Value               |
|-------------|---------------------|
| Background  | `#09090b` zinc-950  |
| Surface     | `#18181b` zinc-900  |
| Card        | `#111827`           |
| Accent      | `#2dd4bf` teal-400  |
| Secondary   | `#38bdf8` sky-400   |
| Highlight   | `#fbbf24` amber-400 |
| Border      | `#27272a` zinc-800  |

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Database Options

- **Local**: PostgreSQL via Docker or homebrew
- **Cloud**: [Neon](https://neon.tech) (free), [Supabase](https://supabase.com), [Railway](https://railway.app)

---

## 🔑 Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:push      # Sync schema to DB
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Regenerate Prisma client
```

---

Built with ❤️ using Next.js + Groq AI
