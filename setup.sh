#!/bin/bash

echo "🚀 BrightPeak Chat Widget Setup"
echo "================================"

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    echo "GEMINI_API_KEY=" > .env
    echo "PORT=3341" >> .env
    echo "⚠️  Please add your Gemini API key to .env file"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p database admin public

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Test Gemini connection
echo "🤖 Testing Gemini API..."
node test-gemini.js

# Start server
echo "✅ Starting server..."
node server.js