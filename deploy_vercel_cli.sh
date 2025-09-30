#!/usr/bin/env bash
set -euo pipefail
if ! command -v vercel >/dev/null 2>&1; then npm i -g vercel; fi
vercel login || true
vercel link --confirm || true
echo "Add NASA_API_KEY:" 
vercel env add NASA_API_KEY
vercel --confirm
vercel --prod --confirm
