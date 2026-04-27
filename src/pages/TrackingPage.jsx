import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, MessageCircle, ChevronRight,Info,X } from 'lucide-react'
import NavBar from '../component/layout/NavBar.jsx'
import { useApp } from '../context/AppContext.jsx'
import        LiveMap   from   '../pages/LiveMap.jsx'
import { route } from '../data/route.js'
import BottomNav from '../component/layout/BottomNav.jsx'


const [demoBannerVisible, setDemoBannerVisible] = useState(true)

const STATUS_LABELS = {
  created:    { label: 'Order Created', color: 'bg-gray-100 text-gray-600'    },
  processing: { label: 'Processing',    color: 'bg-yellow-100 text-yellow-600' },
  shipped:    { label: 'Shipped',       color: 'bg-blue-100 text-blue-600'     },
  in_transit: { label: 'In Transit',    color: 'bg-blue-100 text-blue-600'     },
  delivered:  { label: 'Delivered',     color: 'bg-green-100 text-green-600'   },
}

export default function TrackingPage() {
  const navigate       = useNavigate()
  const { activeOrder, dispatch } = useApp()

//   const currentIndex = Math.floor(
//   (progressPercent / 100) * (route.length - 1)
// )

// const currentLocation = route[currentIndex]

  //  tracking every 8 seconds to simulate live updates

 useEffect(() => {
  if (!activeOrder) return
  if (activeOrder.status === 'delivered') return

  const interval = setInterval(() => {
    dispatch({ type: 'ADVANCE_TRACKING', orderId: activeOrder.id })
  }, 8000)

  return () => clearInterval(interval)
}, [activeOrder?.status, activeOrder?.id, dispatch])
  // No active order
  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-white md:pb-12 pb-24">
        <NavBar />
        <BottomNav />
        <div className="max-w-150 mx-auto px-6 py-20 text-center">
          <p className="text-sm font-semibold text-gray-500 mb-3">No active order to track.</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  const { id, items, form, total, trackingSteps, progressPercent, status, createdAt } = activeOrder
  const statusMeta = STATUS_LABELS[status] || STATUS_LABELS.processing

  const deliveryDayOffset = status === 'delivered' ? 0 : status === 'in_transit' ? 1 : 2
  const deliveryDate = new Date(createdAt)
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDayOffset)
  const deliveryLabel = status === 'delivered'
    ? 'Delivered'
    : `Arriving ${deliveryDate.toLocaleDateString('en-US', { weekday: 'long' })}`

  return (
    <div className="min-h-screen bg-white ">
     <NavBar />
<BottomNav />

{/* Demo mode banner */}
{demoBannerVisible && (
  <div className="bg-amber-50 border-b border-amber-200 px-4 py-2
    flex items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      <p className="text-[11px] text-amber-700 font-medium">
        <span className="font-bold">Demo mode</span> — tracking status
        updates every 8 seconds to simulate a live delivery.
      </p>
    </div>
    <button
      onClick={() => setDemoBannerVisible(false)}
      className="text-amber-400 hover:text-amber-600 transition-colors shrink-0"
      aria-label="Dismiss"
    >
      <X className="w-3.5 h-3.5" />
    </button>
  </div>
)}

      

      <div className="max-w-275 mx-auto px-4 md:px-6 py-4 md:py-5 pb-24 md:pb-5">
        <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Live Order Tracking
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-5">

          {/*  Left panel */}
          <div className="flex-1 min-w-0 shadow-lg space-y-4">

            {/* Arrival card */}
            <div className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    Delivery Status · Order #{id}
                  </p>
                  <h2 className="text-xl font-bold text-gray-900">{deliveryLabel}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {status !== 'delivered' && ' · 2:00 PM – 5:00 PM'}
                  </p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusMeta.color}`}>
                  {statusMeta.label.toUpperCase()}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1 overflow-hidden">
                <div
                  className="bg-teal-500 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400">{progressPercent}% Complete</p>
            </div>

            {/* Tracking history */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Tracking History</h3>
              <div className="relative">
                {trackingSteps.map((step, idx) => (
                  <div key={step.id} className="flex gap-3 relative">
                    {/* Connector line */}
                    {idx < trackingSteps.length - 1 && (
                      <div
                        className={`absolute left-2.25 top-5 w-0.5 ${step.done ? 'bg-teal-400' : 'bg-gray-200'}`}
                        style={{ height: 'calc(100% - 4px)' }}
                      />
                    )}

                    {/* Dot */}
                    <div className="relative z-10 shrink-0 mt-0.5">
                      {step.done ? (
                        <div className="w-4.5 h-4.5 bg-teal-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-4.5 h-4.5 bg-gray-200 rounded-full border-2 border-gray-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-5 flex-1 min-w-0 ${idx === trackingSteps.length - 1 ? 'pb-0' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold ${
                            step.highlight ? 'text-teal-600' : step.done ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </p>
                          {step.detail && (
                            <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{step.detail}</p>
                          )}
                        </div>
                        {step.time && (
                          <span className={`text-[10px] shrink-0 font-medium ${
                            step.highlight ? 'text-teal-500 font-semibold' : step.done ? 'text-gray-500' : 'text-gray-300'
                          }`}>
                            {step.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="w-full md:w-64 md:shrink-0 shadow-xl rounded-2xl space-y-4">

            {/* Courier card */}
            <div className="card p-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Courier Details
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                  MF
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">MiKyae Hr'e Ffy</p>
                  <p className="text-[10px] text-gray-400">@ffrac.Courier</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mb-3">
                <MapPin className="w-3 h-3 text-teal-500" />
                <span>Est. 5 stops till you</span>
              </div>
              <button
                onClick={() => navigate('/aichat')}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                Message Courier
              </button>
            </div>

            {/* Order items */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${statusMeta.color}`}>
                  {statusMeta.label}
                </span>
              </div>

              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-[8px] text-gray-400 text-center px-0.5"
                      style={{ backgroundColor: product.bgColor || '#f3f4f6' }}
                    >
                      {product.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-gray-900 truncate">{product.name}</p>
                      <p className="text-[10px] text-gray-400">Qty {quantity}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 shrink-0">
                      ${(parseFloat(product.price) * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-900">${total}</span>
                <button
                  onClick={() => navigate('/aichat')}
                  className="text-[10px] text-teal-600 font-semibold hover:underline flex items-center gap-0.5"
                >
                  Get receipt <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Delivery address summary */}
              <div className="mt-3 bg-gray-50 rounded-lg p-2.5">
                <p className="text-[10px] font-semibold text-gray-700 mb-0.5">Delivering to</p>
                <p className="text-[10px] text-gray-400 leading-snug">
                  {form.fullName}<br />
                  {form.streetAddress}, {form.city} {form.zipCode}
                </p>
              </div>

              {/* Rate courier */}
              {status === 'delivered' && (
                <div className="mt-3 bg-teal-50 border border-teal-100 rounded-lg p-2.5 flex items-center gap-2">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-gray-700">Rate your courier</p>
                    <p className="text-[9px] text-gray-400">Leave a 2-min review</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
