import { useNavigate } from 'react-router-dom'
import { Package2, ChevronRight, ShoppingBag } from 'lucide-react'
import NavBar from '../component/layout/NavBar'
import BottomNav from '../component/layout/BottomNav'
import Sidebar from '../component/layout/Sidebar'
import { useApp } from '../context/AppContext'

const STATUS_STYLES = {
  created:    'bg-gray-100 text-gray-600',
  processing: 'bg-yellow-100 text-yellow-700',
  shipped:    'bg-blue-100 text-blue-700',
  in_transit: 'bg-blue-100 text-blue-700',
  delivered:  'bg-green-100 text-green-700',
}

const STATUS_LABELS = {
  created:    'Created',
  processing: 'Processing',
  shipped:    'Shipped',
  in_transit: 'In Transit',
  delivered:  'Delivered',
}

export default function OrderHistory() {
  const navigate        = useNavigate()
  const { state, dispatch } = useApp()
  const { orders }      = state

  const handleTrack = (orderId) => {
    dispatch({ type: 'SET_ACTIVE_ORDER', orderId })
    navigate('/trackingpage')
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <BottomNav />

      <div className="max-w-300 mx-auto px-4 md:px-6 pt-6 md:py-10
        pb-24 md:pb-10 flex gap-8 md:gap-16">

        <Sidebar />

        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold text-teal-600 uppercase
              tracking-widest mb-1">
              Account
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
            <p className="text-xs text-gray-400 mt-1">
              {orders.length} order{orders.length !== 1 ? 's' : ''} placed
            </p>
          </div>

          {/* Empty state */}
          {orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center
                justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-500 mb-1">
                No orders yet
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Your completed orders will appear here.
              </p>
              <button
                onClick={() => navigate('/productlisting')}
                className="text-xs font-semibold text-teal-600 hover:underline"
              >
                Browse Products →
              </button>
            </div>
          )}

          {/* Order list */}
          <div className="space-y-3">
            {orders.map((order) => {
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
              })
              const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.processing
              const statusLabel = STATUS_LABELS[order.status] || 'Processing'
              const isActive    = state.activeOrderId === order.id

              return (
                <div
                  key={order.id}
                  className={`card p-4 rounded-xl border transition-all
                    ${isActive
                      ? 'border-teal-300 ring-1 ring-teal-200'
                      : 'border-gray-100 hover:border-gray-200'
                    }`}
                >
                  {/* Order header row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs font-bold text-gray-900">
                          #{order.id}
                        </p>
                        {isActive && (
                          <span className="text-[9px] font-bold bg-teal-600 text-white
                            px-1.5 py-0.5 rounded-full">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">{orderDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5
                        rounded-full ${statusStyle}`}>
                        {statusLabel}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        ${order.total}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-1 mb-3 overflow-hidden">
                    <div
                      className="bg-teal-500 h-1 rounded-full transition-all duration-700"
                      style={{ width: `${order.progressPercent}%` }}
                    />
                  </div>

                  {/* Items */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {order.items.map(({ product, quantity }) => (
                      <span
                        key={product.id}
                        className="text-[10px] bg-gray-50 text-gray-600 border
                          border-gray-100 px-2 py-0.5 rounded-full"
                      >
                        {product.name} ×{quantity}
                      </span>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-2
                    border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">
                      To: {order.form.fullName} · {order.form.city}
                    </p>
                    <button
                      onClick={() => handleTrack(order.id)}
                      className="flex items-center gap-1 text-[10px] font-semibold
                        text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      {order.status === 'delivered' ? 'View details' : 'Track order'}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}