import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Package, Star, TrendingUp, Bot, MoreVertical, X } from 'lucide-react'
import NavBar from '../component/layout/NavBar.jsx'
import Sidebar  from  '../component/layout/Sidebar'
import { useApp } from '../context/AppContext.jsx'
import BottomNav from '../component/layout/BottomNav.jsx'

const sidebarLinks = [
  { label: 'Products',   Icon: Package,    to: '/products'     },
  { label: 'Track order',Icon: TrendingUp, to: '/tracking'     },
  { label: 'New order',  Icon: Star,       to: '/products'     },
  { label: 'AI Help',    Icon: Bot,        to: '/concierge', active: true },
]

function buildSystemPrompt(activeOrder) {
  const base = `You are Concierge AI — the helpful, professional logistics assistant for Trackit, a premium e-commerce delivery platform. You help users track packages, update delivery addresses, manage shipments, and resolve logistics questions. Be concise, warm, and solution-focused. Keep responses under 5 sentences unless detail is truly needed.`

  if (!activeOrder) return base + `\n\nThe user has no active orders right now.`

  const { id, items, form, subtotal, tax, total, status, createdAt, progressPercent, trackingSteps } = activeOrder
  const itemList = items.map(({ product, quantity }) => `${product.name} ×${quantity} ($${product.price})`).join(', ')
  const currentStep = trackingSteps.find(s => s.highlight)?.label || trackingSteps.filter(s => s.done).at(-1)?.label || 'Order Created'

  return `${base}

The user's current active order context:
- Order ID: #${id}
- Placed: ${new Date(createdAt).toLocaleString()}
- Items: ${itemList}
- Subtotal: $${subtotal} | Tax: $${tax} | Total: $${total}
- Delivery address: ${form.fullName}, ${form.streetAddress}, ${form.city} ${form.zipCode}
- Contact: ${form.phone} | ${form.email}
- Payment method: ${form.paymentMethod}
- Current status: ${status} (${progressPercent}% complete)
- Current tracking step: ${currentStep}

Use this context to give accurate, specific answers about their order.`
}

export default function AIChatPage() {
  const navigate       = useNavigate()
  const { activeOrder } = useApp()

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: activeOrder
        ? `Hello! I can see you have an active order **#${activeOrder.id}** that's currently **${activeOrder.status}** (${activeOrder.progressPercent}% complete). How can I help you today?`
        : "Hello! I'm Concierge AI. I can help you track packages, manage your deliveries, or answer any logistics questions. How can I help?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ])
  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef           = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }))

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: buildSystemPrompt(activeOrder),
          messages: history,
        }),
      })

      const data = await res.json()
      const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that request right now."

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: "I'm having trouble connecting. Please check your connection and try again.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen ">
      <NavBar />
      <BottomNav />

      <div className="bg-white border-b border-gray-100 px-6 py-2.5">
        <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          AI Chat Assistant
        </h1>
      </div>

      <div className="max-w-300 mx-auto px-4 py-4 flex gap-16 h-[calc(100vh-108px)]">

        {/* ── Left sidebar ── */}
        <Sidebar />

        {/* ── Chat panel ── */}
        <div className="flex-1 flex flex-col card overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-linear-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Concierge AI</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[10px] text-gray-400">Online · responds instantly</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button
                  onClick={() => setMessages([messages[0]])}
                  className="text-[10px] text-gray-400 hover:text-red-400 transition-colors flex items-center gap-0.5"
                >
                  <X className="w-3 h-3" /> Clear chat
                </button>
              )}
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-linear-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[72%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-sm'
                      : 'bg-gray-100 text-gray-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-400 px-1">{msg.time}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-gray-500">
                      {activeOrder ? activeOrder.form.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 bg-linear-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick prompts — show only if just the welcome message */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {[
                activeOrder ? `Where is order #${activeOrder.id}?` : 'How do I track my order?',
                'Can I change my delivery address?',
                'What\'s your return policy?',
                activeOrder ? 'What items did I order?' : 'How long does shipping take?',
              ].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="text-[10px] bg-gray-100 hover:bg-teal-50 hover:text-teal-700 text-gray-500 px-2.5 py-1 rounded-full transition-colors border border-transparent hover:border-teal-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-200 transition-all">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask anything about your shipments..."
                className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-7 h-7 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
