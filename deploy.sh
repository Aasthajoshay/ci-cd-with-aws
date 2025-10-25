#!/bin/bash

cd ~/ci-cd-with-aws

# Kill any process using port 3000 (prevents EADDRINUSE)
fuser -k 3000/tcp || true

# Fetch and reset code (ignore divergent branches)
git fetch origin main
git reset --hard origin/main

# Install dependencies
npm ci

# Build
npm run build

# Start/restart with PM2
pm2 start npm --name "next-app" -- start || pm2 restart next-app
pm2 save
