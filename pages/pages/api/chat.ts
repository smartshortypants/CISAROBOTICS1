import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Prototype chat endpoint.
 * Request: { query: string }
 * Response: { role: 'assistant', text: string, sources: [{ url, title, excerpt }] }
 *
 * Replace this stub with:
 *  - retriever call (vector DB)
 *  - LLM prompt orchestration
 *  - citation formatting
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body || {}
  if (!query) {
    res.status(400).json({ error: 'missing query' })
    return
  }

  // Prototype static response — replace with RAG flow
  const response = {
    role: 'assistant',
    text: `This is a prototype answer for: "${query}". Replace this with the RAG-driven LLM response.`,
    sources: [
      {
        url: 'https://en.wikipedia.org/wiki/Main_Page',
        title: 'Wikipedia',
        excerpt: 'Sample excerpt from a source that supports the answer.'
      }
    ]
  }
  res.status(200).json(response)
}
