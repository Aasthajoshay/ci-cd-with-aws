#!/bin/bash

# Navigate to project directory
cd ~/ci-cd-with-aws

# Fetch latest code
git fetch origin main
git reset --hard origin/main

# Install dependencies (clean install)
npm ci

# Build the Next.js app
npm run build

# Kill any process using port 3000 (optional safety)
fuser -k 3000/tcp || true

# Start or restart app with PM2
pm2 start npm --name "next-app" -- start || pm2 restart next-app

# Save PM2 process list to survive reboot
pm2 save
