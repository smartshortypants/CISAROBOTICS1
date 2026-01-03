import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

// Avatars
const ASSISTANT_AVATAR = '🦴'
const USER_AVATAR = '🧑'

/**
 * ArcheoHub Styled Chat — CopilotX/ChatGPT lookalike
 */
export default function Chat() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Scroll to bottom on new message
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    if (!query) return
    const userMsg = { role: 'user', text: query }
    setMessages([...messages, userMsg])
    setQuery('')
    setLoading(true)
    try {
      const res = await axios.post('/api/chat', { query: userMsg.text })
      const bot = res.data
      setMessages((m) => [...m, bot])
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'system', text: 'Error from API', sources: [] }
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !loading) send()
  }

  return (
    <div className="archeohub-chat" style={{
      maxWidth: 500,
      margin: '36px auto',
      border: '1.5px solid #e2e8f0',
      borderRadius: 16,
      boxShadow: '0 3px 22px #0002',
      background: '#f6f8fa',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 360
    }}>
      <div className="messages" style={{
        flex: 1,
        overflowY: 'auto',
        padding: 20
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: 22,
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {m.role !== 'user' && (
              <div style={{
                fontSize: 28,
                marginTop: 2
              }}>{ASSISTANT_AVATAR}</div>
            )}
            <div style={{
              background: m.role === 'user' ? '#82b1ff33' : '#fff',
              color: '#2e3e64',
              borderRadius: 20,
              boxShadow: m.role === 'user' ? '0 1px 8px #90caf90a' : '0 1px 8px #aaa2',
              padding: '12px 16px',
              maxWidth: '80%',
              minWidth: 60,
              fontSize: '1.08em',
              fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
            }}>
              {m.text || m.answer}
              {m.sources && m.sources.length > 0 && (
                <div style={{
                  borderTop: '1px solid #eee',
                  marginTop: 10,
                  paddingTop: 8
                }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#8e99af',
                    marginBottom: 3
                  }}>Sources:</div>
                  <ul style={{
                    paddingLeft: 20,
                    margin: '3px 0'
                  }}>
                    {m.sources.map((s: any, idx: number) => (
                      <li key={idx} style={{
                        marginBottom: 3
                      }}>
                        <a href={s.url} target="_blank" rel="noreferrer" style={{ color: '#3b5de6', fontWeight: 500, textDecoration: 'underline' }}>
                          {s.title || s.url}
                        </a>
                        <span style={{ fontSize: 12, color: '#6e789b', marginLeft: 4 }}>
                          {s.excerpt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {m.role === 'user' && (
              <div style={{
                fontSize: 28,
                marginTop: 2
              }}>{USER_AVATAR}</div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="input-bar" style={{
        borderTop: '1px solid #dde1ea',
        background: '#f8fafc',
        padding: '13px 20px',
        display: 'flex',
        gap: 10,
        alignItems: 'center'
      }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask ArcheoHub anything..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 14,
            border: '1px solid #cfd8dc',
            fontSize: 16,
            fontFamily: 'Inter, Arial',
            outline: 'none'
          }}
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading || !query}
          style={{
            background: '#3b5de6',
            color: '#fff',
            fontWeight: 500,
            border: 'none',
            padding: '9px 20px',
            borderRadius: 12,
            fontSize: 15,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 6px #3b5de622'
          }}
        >
          {loading ? '…' : 'Send'}
        </button>
      </div>
    </div>
  )
}
