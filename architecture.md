# ArcheoHub — Architecture Overview

This document outlines a recommended architecture for an ArcheoHub prototype (RAG-based assistant).

Key components
1. Data ingestion
   - Sources: Wikipedia dumps, curated news, StackOverflow samples, CommonCrawl slices.
   - Process: HTML -> text extraction -> chunking -> metadata (url, title, date) -> embeddings.

2. Embeddings & Vector store
   - Embedding: OpenAI / Cohere embeddings (or sentence-transformers for self-hosted).
   - Vector DB options: Pinecone, Weaviate (managed) or FAISS/Milvus (self-hosted).

3. Retrieval & Orchestration
   - Retriever: semantic kNN (vector) + optional BM25 re-ranker.
   - RAG orchestration: include top-k passages in prompt with explicit citation blocks.
   - Live fallback: Bing/Google search API when index confidence low.

4. LLM
   - MVP: OpenAI GPT-4/GPT-4o or Anthropic Claude via API.
   - Long-term: Evaluate self-hosted models (Llama2, Mistral) for cost control.

5. API layer
   - /api/chat: receives user queries, runs retrieval, constructs prompt, calls LLM, returns streamed response with sources.

6. Frontend
   - Next.js app with chat UI and a Copilot-like sidebar for editor suggestions.
   - Show answer with source list and linkable excerpts.

Security, compliance & moderation
- Add content filters (safety), source attribution, GDPR-compliant data handling, and a DMCA takedown process.

Deployment suggestions
- Frontend on Vercel; backend functions as serverless functions or small Node server. Vector DB managed (Pinecone/Weaviate) for MVP.
