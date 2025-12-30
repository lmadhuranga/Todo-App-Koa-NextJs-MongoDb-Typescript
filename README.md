# 1. Koa + Next.js Todo

Monorepo with a Koa + MongoDB backend and a Next.js frontend.

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/todoApp.jpg)

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

The Unified Inbox provides a **single operator interface** to manage conversations coming from multiple communication channels such as **WhatsApp, Telegram, Email, and Web Chat**.

## This is the architecture of Unified inbox system.

First, each channel connects through a **Channel Adapter**.  
Incoming messages—regardless of their source—are routed through the **Message Service**, where they are **normalized into a common internal format** and stored as part of a **conversation** in the database.

Operators interact with the system through a single UI. The UI fetches conversation data via APIs, which call the **Message Service** to retrieve messages from the database.

When an operator sends a reply, the message is submitted through the API to the **Message Service**, which updates the database and then routes the message through the appropriate **Channel Adapter** to deliver it back to the original channel.

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/inbox.jpg)

## Database achitecture 
This data model supports a multi-channel **Unified Inbox** where customer conversations from different channels (e.g., WhatsApp, Email, Web Chat) are normalized into a single internal structure.  
It is designed to clearly separate core messaging data from AI-generated insights while maintaining full traceability and auditability.

1. A customer message is received and stored in the `message` table.
2. The message is processed asynchronously by the AI service.
3. Suggested replies are generated and stored in `ai_suggested_reply`.

![Database Structure](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/db-structure.jpg?raw=true)

## AI Processing Architecture

This diagram illustrates the AI processing layer used in the Unified Inbox to enhance operator efficiency through automation, insights, and prioritization.    

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/ai-system.jpg)

The **Supervisor** acts as the central orchestration component.  
It receives incoming customer messages and coordinates multiple AI agents to process the message concurrently. 

**Agent 1: AI Reply Generation:** Generate context-aware reply suggestions for operators.

Flow:
1. Retrieves relevant information from the **RAG Vector Database / Knowledge Base**
2. Provides contextual data to the LLM
3. Invokes the **LLM (OpenAI / Gemini)** to generate response suggestions
4. Passes generated responses through a **Safety Filter**
5. Outputs safe AI suggestions for operator review

**Agent 2: Intent & Sentiment Detection:** Understand the customer’s intent and emotional tone.

Flow:
1. Processes message text using **NLP-based text classification**
2. Detects intent (e.g., complaint, inquiry, follow-up)
3. Identifies sentiment (e.g., positive, neutral, negative)
 
**Agent 3: Chat Prioritization:** Determine which conversations require immediate attention.

Flow:
1. Uses a **scoring / ranking model**
2. Considers factors such as: 
   - Identified intent
   - Message urgency 
3. Produces a priority score for the conversation 
  
The Supervisor–Agent pattern ensures the system remains extensible as new AI features are introduced.


## Unified Inbox ↔ AI Processing Connector (Worker Module)

The Unified Inbox and AI Processing systems are connected through an **asynchronous Worker (Orchestrator)** module.  
This module acts as a decoupled bridge between message ingestion and AI computation.

![enter image description here](https://raw.githubusercontent.com/lmadhuranga/Todo-App-Koa-NextJs-MongoDb-Typescript/refs/heads/main/full-system.jpg)

### Connection Flow (High-Level)

1. A message is received and normalized by the **Channel Adapters**
2. The **Message Service** stores the message in the database
3. An event is published to the **Worker queue** (e.g., RabbitMQ / Kafka)
4. The **Worker (Orchestrator)** consumes the event asynchronously
5. The Worker invokes the **AI Processing layer**
6. AI results (suggested replies, intent, priority) are returned
7. The Worker stores AI outputs back into the database
8. The **Unified Inbox API** exposes enriched data to the Operator UI
 
This connector pattern enables production-ready extensibility while keeping system boundaries clear.