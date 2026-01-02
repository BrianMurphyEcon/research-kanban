#!/bin/bash

# Research Project Manager - Start Script for Mac/Linux
# This script starts the development server and opens the app in your browser

cd "$(dirname "$0")"

echo "Starting Research Project Manager..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "Error: pnpm is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Then run: npm install -g pnpm"
    exit 1
fi

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies (first time only)..."
    pnpm install
    echo ""
fi

# Start the development server
echo "Opening Research Project Manager at http://localhost:5173/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Open in default browser (Mac/Linux)
if command -v open &> /dev/null; then
    open http://localhost:5173/
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5173/
fi

pnpm dev
