# Backend (Koa + MongoDB)

Koa API for the Todo app. Uses MongoDB via Mongoose, validates requests with
Zod, and exposes a REST API under `/api/todos`.

## Features

- CRUD endpoints for todos
- Zod validation for params and request bodies
- Centralized error middleware
- Mongoose models with `id` mapping in JSON
- Jest + Supertest API tests

## Tech Stack

- Koa + koa-router
- MongoDB + Mongoose
- Zod
- TypeScript
- Jest + Supertest

## Setup

1) Install deps:
   `npm install` (or `yarn`)

2) Configure env:
   Create `backend/.env` with:
   `PORT=4000`
   `MONGO_URL=mongodb://localhost:27017/todos`

3) Run:
   `npm run dev`

## Scripts

- `npm run dev` start dev server with ts-node-dev
- `npm run build` compile TypeScript
- `npm run start` run compiled server
- `npm run lint` run ESLint
- `npm run format` run Prettier
- `npm run test` run Jest tests

## API

Base: `/api/todos`

- `GET /api/todos` list todos
- `GET /api/todos/:id` get todo by id
- `POST /api/todos` create todo `{ title }`
- `PUT /api/todos/:id` update todo `{ title?, completed? }`
- `DELETE /api/todos/:id` delete todo

## Project Structure

- `src/app.ts` Koa app setup and middleware
- `src/server.ts` server bootstrap and DB connect
- `src/routes/` API routes
- `src/controllers/` request handlers
- `src/services/` DB logic
- `src/models/` Mongoose models
- `src/validators/` Zod schemas
- `tests/` API tests
