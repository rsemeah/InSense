# InSense by Red

A sacred space for self-discovery and spiritual growth.

## Features

- **Daily Check-Ins** – Record your emotional, mental, physical, and spiritual states to receive AI-generated insights.  
- **Inner Horizon** – Define your clarity paths with guided steps.  
- **Spiritual Profiles** – Discover insights about your unique spiritual blueprint.

## Deployment

### 1. Required Environment Variables

Set these in your hosting provider (e.g., Vercel → Project Settings → Environment Variables):

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Stripe (optional – only if you enable payments)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

> Tip: copy `.env.example` to `.env.local` when working locally.

### 2. Deploy to Vercel

#### Via Dashboard

1. **Import repository** – Connect the GitHub repo to Vercel.  
2. **Add variables** – Paste the values above into *Settings → Environment Variables*.  
3. **Deploy** – Click **Deploy** (production builds are automatic on push to `main`).

#### Via Vercel CLI

```bash
# install CLI
npm i -g vercel

# authenticate
vercel login

# first-time setup (guided)
vercel

# subsequent production deploys
vercel --prod
```

## Local Development

1. **Clone** the repo  
2. **Install** dependencies  
   ```bash
   npm install
   ```
3. **Create** `.env.local` from `.env.example` and fill in credentials  
4. **Start** dev server  
   ```bash
   npm run dev
   ```
5. Visit http://localhost:3000

## Technologies

- **Next.js** & **React** – modern web framework  
- **Supabase** – PostgreSQL, auth & realtime  
- **OpenAI** – GPT-powered insights  
- **Tailwind CSS** – utility-first styling  
- **Vercel** – zero-config deployments
