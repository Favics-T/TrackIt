import { useState, useRef, useEffect } from 'react'
import Navbar from '../component/layout/Navbar.jsx'
import { Send, Package, Star, TrendingUp, Settings2, MoreVertical, Bot } from 'lucide-react'

const initialMessages = [
  {
    id: 1,
    role: 'user',
    text: "Where is my package?? It is occurring earlier today based on the original order today.",
    time: '11:40 AM',
  },
  {
    id: 2,
    role: 'assistant',
    text: "Hello! I've checked your shipment #TK-86668**.\n\nI noticed there is a minor delay while loading from factory due to dock: transfer back in transit to be next scheduled for delivery in Wednesday Tomorrow, Dec 22 and 30:PM.\n\nWould you like me to enable an additional SMS notification for the your delivery info?",
    time: '11:41 AM',
  },
  {
    id: 3,
    role: 'user',
    text: 'Yes, notify me. Also, can I change the delivery address to my Suite on foot.',
    time: '11:43 AM',
  },
]

const sidebarLinks = [
  { label: 'Dashboard', Icon: Package, to: '/productlisting' },
  { label: 'Track order', Icon: TrendingUp, to: '/liveordertracking' },
  { label: 'New order', Icon: Star, to: '/productlisting' },
  { label: 'AI Help', Icon: Bot, to: '/concierge', active: true },
]

const activeShipment = {
  id: '#TK-86668',
  status: 'Reference: #Tst — #local delivery',
  weight: '2.4 kg',
  date: 'Dec 23, 16:36',
  dimensions: 'Totals 3g · Items 3%',
}

export default function AIChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { id: Date.now(), role: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system:
            'You are Concierge AI, a helpful logistics and order tracking assistant for Trackit — a premium e-commerce delivery platform. You help users track packages, update delivery addresses, manage shipments, and answer logistics questions. Be concise, friendly, and professional. Keep responses under 4 sentences.',
          messages: [
            ...messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: text },
          ],
        }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that request."
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: "I'm having trouble connecting. Please try again.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page title strip */}
      <div className="bg-white border-b border-gray-100 px-6 py-2.5">
        <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">AI Chat Assistant</h1>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-4 flex gap-4 h-[calc(100vh-108px)]">
        {/* Left sidebar: shipment panel */}
        <div className="w-52 flex-shrink-0 flex flex-col gap-3">
          {/* Sidebar nav */}
          <div className="card p-3">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">THE ARCHITEKTURAL FORGE SERIES</p>
            <nav className="space-y-0.5">
              {sidebarLinks.map(({ label, Icon, to, active }) => (
                <a
                  key={label}
                  href={to}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    active ? 'bg-teal-50 text-teal-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Active shipment */}
          <div className="card p-3 flex-1">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Active Shipments</p>
            <div className="bg-gray-900 rounded-lg p-3 mb-2">
              <p className="text-[10px] text-gray-300 mb-1">{activeShipment.status}</p>
              <p className="text-2xl font-bold text-white mb-1">{activeShipment.weight}</p>
              <p className="text-[10px] text-gray-400">{activeShipment.date}</p>
            </div>
            <p className="text-[10px] text-gray-400">{activeShipment.dimensions}</p>

            <div className="mt-3 space-y-1.5">
              {['Arrived Order Waiting', 'Out for Delivery', 'Scheduled Drop Contact'].map((item, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${i === 0 ? 'bg-teal-500' : 'bg-gray-300'}`} />
                  <span className="text-[10px] text-gray-500 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User info */}
          <div className="card p-3 flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[9px] font-bold">JM</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-900 truncate">Paul Mlke Lord</p>
              <p className="text-[9px] text-gray-400 truncate">paul@mlke.org</p>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col card overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Concierge AI</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <p className="text-[10px] text-gray-400">Online now</p>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[72%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-teal-600 text-white rounded-tr-sm'
                        : 'bg-gray-100 text-gray-700 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-400 px-1">{msg.time}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-gray-500">JM</span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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

          {/* Input area */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about your shipments..."
                className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-7 h-7 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
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
