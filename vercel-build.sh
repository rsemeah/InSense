#!/bin/bash

# Enhanced Vercel build script with better error handling and TypeScript support
echo "🚀 Starting enhanced Vercel build process..."

# Exit on error
set -e

# Install critical dependencies explicitly to avoid issues
echo "📦 Installing dependencies explicitly..."
npm install --no-save @supabase/supabase-js stripe lucide-react openai

# Install TypeScript and type definitions
echo "🔧 Installing TypeScript dependencies..."
npm install --no-save --save-dev typescript@5.8.3 @types/react@19.1.7 @types/node@22.15.30

# Ensure the .next directory exists
mkdir -p .next

# Run the Next.js build with TypeScript checks disabled
echo "🏗️ Building Next.js application..."
NODE_OPTIONS="--max-old-space-size=4096" npx next build

# Verify build artifacts
if [ ! -f ".next/routes-manifest.json" ]; then
  echo "❌ Error: routes-manifest.json was not generated. Build failed."
  exit 1
fi

echo "✅ Build process completed successfully!"
