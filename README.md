# Koa + Next.js Todo

Monorepo with a Koa + MongoDB backend and a Next.js frontend.

## Setup

1) Install dependencies:
- `cd backend && npm install`
- `cd ../frontend && npm install`

2) Configure environment variables (no secrets committed):
- Backend: copy `backend/.env.example` to `backend/.env`
- Frontend: copy `frontend/.env.example` to `frontend/.env.local`

3) Run the apps:
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

## Environment Variables

Backend (`backend/.env`):
- `MONGO_URL` MongoDB connection string
- `PORT` API port (default 4000)

Frontend (`frontend/.env.local`):
- `NEXT_PUBLIC_API_URL` API base URL (e.g. `http://localhost:4000/api`)
