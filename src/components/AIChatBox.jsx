import { useState } from 'react'
import { Bot, Send } from 'lucide-react'
import Button from './Button'
import LanguageSelector from './LanguageSelector'
import { sendAIMessage } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

const SUGGESTIONS = [
  'Which schemes may be relevant to me?',
  'Explain this scheme simply.',
  'What documents do I need?',
  'Explain this in Marathi.',
  'How do I apply?',
]

export default function AIChatBox({ scheme = null }) {
  const { language } = useLanguage()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Ask about listed schemes in simple language. I only use the Scheme Saathi directory and will not invent government programmes or official URLs.',
    },
  ])

  const send = async (text) => {
    const message = (text || input).trim()
    if (!message || loading) return
    setError('')
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setLoading(true)
    try {
      const { data } = await sendAIMessage({ message, language, scheme })
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setError('The assistant is unavailable right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2 text-navy-800">
          <Bot className="h-5 w-5" />
          <span className="font-semibold">Conversation</span>
        </div>
        <LanguageSelector compact id="assistant-language" />
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === 'user'
                ? 'ml-auto max-w-[90%] rounded-2xl bg-navy-800 px-4 py-3 text-sm text-white'
                : 'max-w-[90%] whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-800'
            }
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-sm text-ink-500">Preparing a careful answer…</p>}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-slate-100 px-4 py-3">
        {SUGGESTIONS.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-medium text-ink-700 hover:border-teal-300"
            onClick={() => send(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {error && (
        <p className="px-4 text-sm text-red-700" role="alert">
          {error}{' '}
          <button type="button" className="font-semibold underline" onClick={() => send(input)}>
            Retry
          </button>
        </p>
      )}

      <form
        className="flex gap-2 border-t border-slate-100 p-3"
        onSubmit={(event) => {
          event.preventDefault()
          send()
        }}
      >
        <label htmlFor="ai-input" className="sr-only">
          Ask a question
        </label>
        <input
          id="ai-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a listed scheme…"
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5"
        />
        <Button type="submit" disabled={loading}>
          <Send className="h-4 w-4" />
          Send
        </Button>
      </form>
    </div>
  )
}
