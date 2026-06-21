# DebugGPT

DebugGPT is a free React + Vite tool for pasting developer errors and getting an AI-powered explanation, fix, and prevention guidance.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Add your Groq API key as `VITE_GROQ_API_KEY=your_key_here`.
4. Start the local app with `npm run dev`.
5. Deploy to Vercel and set `VITE_GROQ_API_KEY` and `VITE_GROQ_MODEL` in the project environment variables.

## Notes

The app calls the Groq API directly from the browser as requested. For production products, a serverless proxy is usually safer so API keys are not exposed to users.
