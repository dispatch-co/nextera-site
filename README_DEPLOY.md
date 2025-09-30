# Deploy
pnpm i
echo "NASA_API_KEY=YOUR_KEY" > .env.local
bash scripts/deploy_vercel_cli.sh
