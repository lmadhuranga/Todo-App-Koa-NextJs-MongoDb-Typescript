# 1. Koa + Next.js Todo

Monorepo with a Koa + MongoDB backend and a Next.js frontend.

## Setup

### Backend

1) Configure env:
- Copy `backend/.env.example` to `backend/.env`

2) Configure MongoDB:
- Ensure MongoDB is running locally
- Set `MONGO_URL` in `backend/.env`

3) Install deps:
- `cd backend && npm install`

4) Run:
- `npm run dev`

### Frontend

1) Configure env:
- Copy `frontend/.env.example` to `frontend/.env.local`
- Set `NEXT_PUBLIC_API_URL` to your backend (e.g. `http://localhost:4000/api`)

2) Install deps:
- `cd frontend && npm install`

3) Run:
- `npm run dev`

## Environment Variables

Backend (`backend/.env`):
- `MONGO_URL` MongoDB connection string
- `PORT` API port (default 4000)

Frontend (`frontend/.env.local`):
- `NEXT_PUBLIC_API_URL` API base URL (e.g. `http://localhost:4000/api`)



# Unified Inbox (Multi-Channel) — Technical Design
