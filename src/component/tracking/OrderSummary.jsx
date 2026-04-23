import { ShieldCheck, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function OrderSummaryPanel({
  product,
  subtotal,
  shipping,
  tax,
  total,
  showPlaceOrder = true,
}) {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h2>

      {/* Product row */}
      {product && (
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-lg bg-gray-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
            <span className="text-[9px] text-gray-400 text-center px-1">{product.name}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
            <p className="text-[11px] text-gray-400">{product.meta}</p>
          </div>
          <span className="text-sm font-semibold text-gray-900">${product.price}</span>
        </div>
      )}

      <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          {shipping === 'FREE' || shipping === 0 ? (
            <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full">FREE</span>
          ) : (
            <span className="font-medium text-gray-900">${shipping}</span>
          )}
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax</span>
          <span className="font-medium text-gray-900">${tax}</span>
        </div>
      </div>

      <div className="flex justify-between items-baseline mt-3 pt-3 border-t border-gray-200">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Amount</span>
        <span className="text-2xl font-bold text-teal-600">${total}</span>
      </div>

      {showPlaceOrder && (
        <>
          <button
            onClick={() => navigate('/confirmation')}
            className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Place Order
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-2 leading-snug">
            By clicking 'Place Order', you agree to our Terms of Service and Privacy Policy.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <ShieldCheck className="w-3 h-3 text-teal-500" />
              Secure Payment
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <RefreshCw className="w-3 h-3 text-teal-500" />
              Insured Logistics
            </div>
          </div>
        </>
      )}
    </div>
  )
}
