#!/bin/bash

# Minimal Vercel build script
echo "🚀 Starting Vercel build..."

# Exit on error
set -e

# Disable Next.js telemetry during CI
export NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
echo "🏗️ Running next build..."
npx next build

echo "✅ Build finished!"
