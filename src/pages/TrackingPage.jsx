import Navbar from '../component/layout/Navbar.jsx'
import { MapPin, MessageCircle, ChevronRight } from 'lucide-react'
import {trackingSteps,orderItems} from '../data/tracking.js'

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-[1100px] mx-auto  py-5">
        <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Live Order Tracking
        </h1>

        <div className="flex gap-5">
          {/* Left panel */}
          <div className="flex-1 min-w-0 flex flex-col gap-10 space-y-4">
            {/* Arrival card */}
            <div className="card bg-white p-8 shadow-lg rounded-lg ">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className='flex flex-col -gap-4'>
<p className="text-[12px] font-semibold text-[#3E494A] uppercase tracking-wide ">
                    SHIPMENT ID #TK-882910
                  </p>
                  <h2 className="text-[36px] font-extrabold text-[#1a1c1d]">Arriving Wednesday</h2>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-1">
                    Nov 24, 2024 · 2:00 PM – 5:00 PM
                  </p>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-600 font-semibold px-2.5 py-1 rounded-full">
                  IN TRANSIT
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                <div className="bg-[#00535B] h-1.5 rounded-full" style={{ width: '75%' }} />
              </div>
              <p className="text-[10px] text-gray-400">75% Complete</p>
            </div>

            {/* Tracking history */}
            <div className="card shadow p-8 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Tracking History</h3>
              <div className="relative">
                {trackingSteps.map((step, idx) => (
                  <div key={step.id} className="flex gap-3 relative">
                    {/* Vertical line */}
                    {idx < trackingSteps.length - 1 && (
                      <div
                        className={`absolute left-[9px] top-5 w-0.5 h-full ${
                          step.done ? 'bg-[#00535B]' : 'bg-gray-200'
                        }`}
                        style={{ height: 'calc(100% - 4px)' }}
                      />
                    )}

                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0 mt-0.5">
                      {step.done ? (
                        <div className="w-[18px] h-[18px] bg-[#00535B] rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-[18px] h-[18px] bg-gray-200 rounded-full border-2 border-gray-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-5 flex-1 min-w-0 ${idx === trackingSteps.length - 1 ? 'pb-0' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold ${step.done ? 'text-gray-900' : 'text-gray-400'} ${step.highlight ? 'text-teal-600' : ''}`}>
                            {step.label}
                          </p>
                          {step.detail && (
                            <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{step.detail}</p>
                          )}
                        </div>
                        {step.time && (
                          <span className={`text-[10px] flex-shrink-0 font-medium ${step.done ? 'text-gray-500' : 'text-gray-300'} ${step.highlight ? 'text-teal-500 font-semibold' : ''}`}>
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

          {/* Right panel */}
          <div className="w-64 flex-shrink-0 space-y-4">
            {/* Courier card */}
            <div className="card p-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Courier Details
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  MF
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">MiKyae Hr'e Ffy</p>
                  <p className="text-[10px] text-gray-400">@ffrac.Courier</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mb-3">
                <MapPin className="w-3 h-3 text-teal-500" />
                <span>Est. 5 Pkgs till you</span>
              </div>
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                <MessageCircle className="w-3 h-3" />
                Message Courier
              </button>
            </div>

            {/* Order items */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                  May 27, 2024
                </p>
                <span className="text-[10px] text-gray-400">Status</span>
              </div>

              <div className="space-y-3">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="text-[8px] text-gray-400 text-center leading-tight px-0.5">{item.name.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-400">{item.meta}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 flex-shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-900">$409.00</span>
                <button className="text-[10px] text-teal-600 font-semibold hover:underline flex items-center gap-0.5">
                  View receipt <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Rate courier */}
              <div className="mt-3 bg-gray-50 rounded-lg p-2.5 flex items-center gap-2">
                <div className="w-6 h-6 bg-[#00535B] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-700">Rate your courier</p>
                  <p className="text-[9px] text-gray-400">Leave a 2-min review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
