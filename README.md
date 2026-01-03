# ArcheoHub (prototype)

ArcheoHub is a prototype "Copilot-like" assistant focused on answering user queries with evidence from web sources using a Retrieval-Augmented Generation (RAG) approach.

This repository contains a minimal Next.js TypeScript skeleton, a placeholder chat API, and docs describing the architecture and next steps.

## Goals
- Prototype a RAG-based chat assistant that returns answers plus citations (URLs + excerpts).
- Provide a Copilot-like editor sidebar in a later step.
- Support both indexed retrieval (vector DB) and live-web fallback (search API).

## Quick start (local)
1. Install
   - Node 18+ recommended
   - npm install

2. Run dev server
   - npm run dev
   - Open http://localhost:3000

3. API
   - POST /api/chat accepts { "query": "…" } and returns a prototype response.

## What’s included
- Next.js frontend with simple chat UI
- /api/chat placeholder for RAG orchestration (stub)
- README and architecture docs

## Next actions
- Replace the /api/chat stub with a real retriever + LLM call (OpenAI or self-hosted).
- Add an ingestion script to build test index (Wikipedia samples).
- Add a vector store (Pinecone / Weaviate / FAISS) in a later iteration.

## License
Add your preferred license.
