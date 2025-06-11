#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🏗️ Building application..."
npm run build

# Run database migrations
echo "🔄 Running database migrations..."
npm run migrate

echo "✅ Deployment preparation complete!"
echo "📝 Next steps:"
echo "1. Push your changes to GitHub"
echo "2. Factory.ai will automatically deploy from the main branch"
echo "3. Monitor the deployment in the Factory.ai dashboard" 