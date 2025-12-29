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




## Unified Inbox (Multi-Channel) — Technical Design 

### 1. Core Idea

The Unified Inbox provides a **single operator interface** to manage conversations coming from multiple communication channels such as **WhatsApp, Telegram, Email, and Web Chat**.

## This is the architecture of Unified inbox system.


First, each channel connects through a **Channel Adapter**.  
Incoming messages—regardless of their source—are routed through the **Message Service**, where they are **normalized into a common internal format** and stored as part of a **conversation** in the database.

Operators interact with the system through a single UI. The UI fetches conversation data via APIs, which call the **Message Service** to retrieve messages from the database.

When an operator sends a reply, the message is submitted through the API to the **Message Service**, which updates the database and then routes the message through the appropriate **Channel Adapter** to deliver it back to the original channel.

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/inbox.jpg)

## Database achitecture 

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/db-structure.jpg)

## Ai System

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/ai-system.jpg)


##  Unified inbox system Connect with Ai system

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/full-system.jpg)
