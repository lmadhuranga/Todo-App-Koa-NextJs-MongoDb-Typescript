# Frontend (Next.js Todo)

Next.js frontend for the Todo app. It renders the initial list on the server,
hydrates into a Zustand store on the client, and uses `react-hot-toast` for user
feedback.

## Features

- Todo CRUD with optimistic UI updates on the client
- SSR fetch for initial todos and client-side hydration
- Zustand store for todos and loading state
- Toast notifications for actions and errors
- Tailwind CSS styling

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Zustand
- react-hot-toast
- Tailwind CSS

## Setup

1) Install deps:
   `npm install` (or `yarn`)

2) Configure env:
   Create `frontend/.env.local` with:
   `NEXT_PUBLIC_API_URL=http://localhost:4000` (adjust to your backend)

3) Run:
   `npm run dev`

## Scripts

- `npm run dev` start dev server
- `npm run build` production build
- `npm run start` start production server
- `npm run lint` run ESLint

## Project Structure

- `app/` Next.js routes and layout
- `components/` UI components
- `lib/services/` API calls
- `lib/state/` Zustand stores
- `lib/httpClient.ts` fetch wrapper with error parsing
