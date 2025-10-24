#!/bin/bash
set -e

cd ~/ci-cd-with-aws

# Pull latest code (merge strategy)
git fetch origin main
git reset --hard origin/main
git pull origin main --no-rebase

# Install dependencies
npm install --production

# Build Next.js app
npm run build

# Restart app with PM2
if ! command -v pm2 &> /dev/null
then
  sudo npm install -g pm2
fi

pm2 stop next-app || true
pm2 start npm --name "next-app" -- start
pm2 save
