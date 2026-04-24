import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronRight, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function OrderConfirmation() {
  const navigate     = useNavigate()
  const { activeOrder } = useApp()

  // If no active order, redirect to products
  useEffect(() => {
    if (!activeOrder) navigate('/products')
  }, [activeOrder, navigate])

  if (!activeOrder) return null

  const { id, items, form, subtotal, tax, total, createdAt } = activeOrder
  const orderDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  const paymentLabel = {
    credit:   'Credit Card',
    bank:     'Bank Transfer',
    delivery: 'On Delivery',
  }[form.paymentMethod] || form.paymentMethod

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-2.5">
        <p className="text-xs text-gray-400">Order Confirmation</p>
      </div>

      <div className="max-w-180 mx-auto px-6 py-10">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order #{id} Confirmed!
          </h1>
          <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            We've received your order and it's being prepared for dispatch. You'll
            receive updates as your package moves through our network.
          </p>
        </div>

        <div className="flex gap-5 items-start">
          {/* Left: Items + Address */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Delivery meta */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Standard Delivery</span>
                </div>
                <span className="text-[10px] text-gray-400">{orderDate}</span>
              </div>

              <div className="space-y-2.5">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-[8px] text-gray-400 text-center px-1"
                      style={{ backgroundColor: product.bgColor || '#f3f4f6' }}
                    >
                      {product.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{product.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-900 flex-shrink-0">
                      ${(parseFloat(product.price) * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address */}
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">{form.fullName}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed ml-7">
                {form.streetAddress}<br />
                {form.city}, {form.zipCode}<br />
                {form.phone} · {form.email}
              </p>
            </div>
          </div>

          {/* Right: Payment summary */}
          <div className="w-52 flex-shrink-0 card p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Summary</h3>

            <div className="space-y-2 text-xs mb-3">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold text-[10px]">Free</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span className="font-medium text-gray-900">${tax}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-2 mb-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-gray-700">Total Paid</span>
                <span className="text-lg font-bold text-gray-900">${total}</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-gray-50 rounded-lg p-2 mb-3 flex items-center gap-2">
              <div className="w-6 h-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex-shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-gray-700">{paymentLabel}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/tracking')}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors mb-2"
            >
              Track Order
            </button>

            <button
              onClick={() => navigate('/productlisting')}
              className="w-full text-[10px] text-teal-600 font-medium hover:underline text-center"
            >
              Continue Shopping
            </button>

            {/* Secure badge */}
            <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-gray-400">
              <ShieldCheck className="w-3 h-3 text-teal-500" />
              Order secured & insured
            </div>

            {/* Need help */}
            <button
              onClick={() => navigate('/concierge')}
              className="mt-2 w-full border border-gray-200 rounded-lg p-2.5 flex items-center justify-between hover:border-teal-300 transition-colors"
            >
              <p className="text-[10px] text-gray-600 font-medium">Need help?</p>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-8">
          © 2025 Trackit LLC. All rights reserved.
        </p>
      </div>
    </div>
  )
}
