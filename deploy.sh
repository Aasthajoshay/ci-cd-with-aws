#!/bin/bash
set -e

cd ~/ci-cd-with-aws

# Pull latest code safely
git fetch origin main
git reset --hard origin/main
git pull origin main --no-rebase

# Install dependencies
npm install --production

# Build Next.js app
npm run build

# Install PM2 if missing
if ! command -v pm2 &> /dev/null
then
  sudo npm install -g pm2
fi

# Restart app safely
pm2 stop next-app || true
pm2 start npm --name "next-app" -- start
pm2 save
