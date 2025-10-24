#!/bin/bash
set -e

echo "🚀 Starting deployment on EC2..."

cd ~/ci-cd-with-aws

# Pull latest code
git fetch origin main
git reset --hard origin/main

# Install dependencies
npm install --production

# Build app
npm run build

# Restart server using PM2
if ! command -v pm2 &> /dev/null
then
  echo "⚙️ Installing PM2..."
  sudo npm install -g pm2
fi

pm2 stop next-app || true
pm2 start npm --name "next-app" -- start
pm2 save

echo "✅ Deployment complete! App running on port 3000."
