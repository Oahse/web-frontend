#!/usr/bin/env bash
# Filename: deploy.sh

set -euo pipefail

# Display usage instructions if no message is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 \"commit message\""
  exit 1
fi

# Join all passed arguments into one commit message, preserving spaces
commit_msg="$*"

echo "----------------------------------------"
echo " Commit message: $commit_msg"
echo " Starting deployment..."
echo "----------------------------------------"

# Git add, commit, and push
git add .
git commit -m "$commit_msg"
git push

# Build and deploy via Wrangler pages
npm run build
wrangler pages deploy ./dist --project-name=banwee

echo "----------------------------------------"
echo " Deployment completed successfully!"
echo "----------------------------------------"
