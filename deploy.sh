#!/bin/bash

cd ~/ci-cd-with-aws

# Kill any process using port 3000
fuser -k 3000/tcp || true

# Fetch latest code and reset to match remote
git fetch origin main
git reset --hard origin/main

# Clean install dependencies
npm ci

# Build Next.js app
npm run build

# Start or restart app via PM2
pm2 start npm --name "next-app" -- start || pm2 restart next-app

# Save PM2 process list for reboot persistence
pm2 save
