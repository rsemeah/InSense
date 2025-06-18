#!/bin/bash

# Vercel build script to ensure all dependencies are installed correctly
echo "🔧 Starting Vercel build process..."

# Install critical dependencies explicitly to avoid issues
echo "📦 Installing dependencies explicitly..."
npm install @supabase/supabase-js stripe lucide-react openai

# Run the Next.js build
echo "🏗️ Building Next.js application..."
npm run next-build

echo "✅ Build process completed!"
