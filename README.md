# Ollama-ui

## Prerequisites
- Node.js (>= 14)
- npm

## Local Development
1. Install development dependencies  
   ```bash
   npm i --dev
   ```
2. Start the development server  
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://127.0.0.1:9090`.

## Deploy to Vercel
1. Log in to Vercel  
   ```bash
   vercel login
   ```
2. Build the production assets  
   ```bash
   npm run build
   ```
3. Deploy to Vercel (production)  
   ```bash
   vercel --prod
   ```
