#!/bin/bash

# Enhanced Vercel build script with better error handling and TypeScript support
echo "🚀 Starting enhanced Vercel build process..."

# Exit on error
set -e

# Disable Next.js telemetry during CI
export NEXT_TELEMETRY_DISABLED=1

# Install critical dependencies explicitly to avoid issues
echo "📦 Installing dependencies explicitly..."
npm install --no-save @supabase/supabase-js stripe lucide-react openai

# ---------------------------------------------------------------------
# Convert TypeScript → JavaScript (and disable tsconfig) for deployment
# ---------------------------------------------------------------------
if [ -f "./prepare-deploy.js" ]; then
  echo "🔧 Converting TypeScript sources to JavaScript for build..."
  node ./prepare-deploy.js convert
else
  echo "⚠️  prepare-deploy.js not found – skipping TS→JS conversion."
fi

# Always restore original sources on exit (success or failure)
cleanup() {
  if [ -f "./prepare-deploy.js" ]; then
    echo "♻️  Restoring original TypeScript sources..."
    node ./prepare-deploy.js restore || true
  fi
}
trap cleanup EXIT

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
