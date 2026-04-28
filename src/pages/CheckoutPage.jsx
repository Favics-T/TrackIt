import { useNavigate } from 'react-router-dom'
import { CreditCard, Building2, Package, AlertCircle } from 'lucide-react'
import NavBar from '../component/layout/NavBar.jsx'
import StepIndicator from '../component/tracking/StepIndicator.jsx'
import { useApp } from '../context/AppContext.jsx'
import { validateForm } from '../context/AppContext.jsx'
import { ShieldCheck, RefreshCw } from 'lucide-react'
import BottomNav from '../component/layout/BottomNav.jsx'
import Input from '../component/UI/Input.jsx'
import { useEffect } from 'react'
import { usePaystack } from '../hooks/usePaystack'
import { Loader2 } from 'lucide-react'
// import { usePaystackPayment } from 'paystack'

const paymentMethods = [
  { id: 'credit',  
     label: 'Credit Card', 
        sub: 'Instant processing', 
         Icon: CreditCard  },
  { id: 'bank',     label: 'Bank Transfer',  sub: '1-2 business days',   Icon: Building2   },
  { id: 'delivery', label: 'On Delivery',    sub: 'Cash or Card',        Icon: Package     },
]

function FieldError({ error }) {
  if (!error) return null
  return (
    <p className="flex items-center gap-1 text-[10px] text-red-500 mt-1">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {error}
    </p>
  )
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { state, dispatch, cartTotals } = useApp()
  const { checkoutForm: form, formErrors: errors, checkoutStep } = state
  const [paymentLoading, setPaymentLoading] = useState(false)


  // If cart is empty redirect back
  if (state.cart.length === 0 && checkoutStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <BottomNav />
        <div className="max-w-150 mx-auto px-6 py-20 text-center md:pb-12 pb-24">
          <p className="text-sm font-semibold text-gray-500 mb-3">Your cart is empty.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  const setField = (field, value) =>
    dispatch({ type: 'SET_FORM_FIELD', field, value })

  const paystackConfig = {
  reference:  `TK-${Date.now()}`,         // unique per attempt
  email:      form.email,
  amount:     cartTotals.paystackAmount,   // in kobo
  publicKey:  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  currency:   'NGN',
  metadata: {
    custom_fields: [
      { display_name: 'Customer Name',    variable_name: 'full_name',    value: form.fullName     },
      { display_name: 'Delivery Address', variable_name: 'address',      value: form.streetAddress },
      { display_name: 'City',             variable_name: 'city',         value: form.city          },
      { display_name: 'Phone',            variable_name: 'phone',        value: form.phone         },
    ],
  },
}

const initializePayment = usePaystackPayment(paystackConfig)

 const handlePlaceOrder = () => {
  // Step 1 — validate form first, before touching Paystack
  const errs = validateForm(form)

  if (Object.keys(errs).length > 0) {
    dispatch({ type: 'SET_FORM_ERRORS', errors: errs })

    const addressErrors = ['fullName', 'streetAddress', 'city', 'zipCode']
    const contactErrors = ['phone', 'email']
    const hasAddressErr = addressErrors.some(k => errs[k])
    const hasContactErr = contactErrors.some(k => errs[k])

    if (hasAddressErr) dispatch({ type: 'SET_CHECKOUT_STEP', step: 1 })
    else if (hasContactErr) dispatch({ type: 'SET_CHECKOUT_STEP', step: 2 })
    return
  }

  // Step 2 — form is valid, open Paystack popup
  setPaymentLoading(true)

  initializePayment({
    // ✅ Payment successful
    onSuccess: (transaction) => {
      setPaymentLoading(false)
      dispatch({ type: 'SET_CHECKOUT_STEP', step: 3 })
      // Pass the Paystack reference into the order so it's stored
      dispatch({ type: 'PLACE_ORDER', paystackRef: transaction.reference })
      navigate('/confirmation')
    },

    //  User closed the popup or payment failed
    onClose: () => {
      setPaymentLoading(false)
      // Don't place the order — just let them try again
    },
  })
}




// Advance to step 2 once address fields are filled
useEffect(() => {
  const { fullName, streetAddress, city, zipCode } = form
  const addressDone = fullName && streetAddress && city && zipCode
  if (addressDone && checkoutStep === 1) {
    dispatch({ type: 'SET_CHECKOUT_STEP', step: 2 })
  }
}, [form.fullName, form.streetAddress, form.city, form.zipCode])

// Advance to step 3 once contact fields are filled
useEffect(() => {
  const { phone, email } = form
  const contactDone = phone && email
  if (contactDone && checkoutStep === 2) {
    dispatch({ type: 'SET_CHECKOUT_STEP', step: 3 })
  }
}, [form.phone, form.email])
  return (
    <div className="min-h-screen ">
      <NavBar />
      <BottomNav />

      <div className="max-w-275 mx-auto px-4 md:px-6 pt-6 md:pt-20 pb-24 md:pb-6">
        {/* Step indicator */}
       <div className="flex justify-center mb-6">
  <StepIndicator currentStep={checkoutStep} totalSteps={3} />
</div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">

          {/* ── Left: Form ── */}
          <div className="w-full flex-1 card p-4 md:p-6 shadow-xl rounded-2xl">
            <p className="text-[10px] font-semibold text-teal-600 uppercase tracking-widest mb-1">
              Step 01 / 03
            </p>

            <h1 className="text-2xl font-bold text-gray-900 mb-5">Finalize Shipment</h1>

            {/* Delivery Address */}
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-gray-900">Delivery Address</h2>
              </div>

              <div className="space-y-3">
  <Input
    id="fullName"        name="fullName"
    label="Full Name"   value={form.fullName}
    onChange={e => setField('fullName', e.target.value)}
    placeholder="Faith Taiwo"
    error={errors.fullName}
  />
  <Input
    id="streetAddress"     name="streetAddress"
    label="Street Address" value={form.streetAddress}
    onChange={e => setField('streetAddress', e.target.value)}
    placeholder="12 St John's Close"
    error={errors.streetAddress}
  />
  <div className="grid grid-cols-2 gap-3">
    <Input
      id="city"    name="city"
      label="City" value={form.city}
      onChange={e => setField('city', e.target.value)}
      placeholder="Port Harcourt"
      error={errors.city}
    />
    <Input
      id="zipCode"    name="zipCode"
      label="ZIP Code" value={form.zipCode}
      onChange={e => setField('zipCode', e.target.value)}
      placeholder="10001"
      error={errors.zipCode}
    />
  </div>
</div>
            </section>

            {/* Contact Information */}
            <section className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 border-2 border-teal-600 rounded flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-gray-900">Contact Information</h2>
              </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <Input
    id="phone"          name="phone"
    label="Phone Number" value={form.phone}
    type="tel"
    onChange={e => setField('phone', e.target.value)}
    placeholder="+234 800 000 0000"
    error={errors.phone}
  />
  <Input
    id="email"           name="email"
    label="Email Address" value={form.email}
    type="email"
    onChange={e => setField('email', e.target.value)}
    placeholder="faith@email.com"
    error={errors.email}
  />
</div>
            </section>

            {/* Payment Method */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 border-2 border-teal-600 rounded flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-gray-900">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentMethods.map(({ id, label, sub, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setField('paymentMethod', id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      form.paymentMethod === id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${form.paymentMethod === id ? 'text-teal-600' : 'text-gray-400'}`} />
                    <p className={`text-xs font-semibold ${form.paymentMethod === id ? 'text-teal-700' : 'text-gray-700'}`}>
                      {label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Review items summary */}
            {state.cart.length > 0 && (
              <section className="mt-6 pt-5 border-t border-gray-100">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Review Order · {state.cart.reduce((s, i) => s + i.quantity, 0)} item{state.cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
                </h2>
                <div className="space-y-2">
                  {state.cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between items-center text-xs text-gray-600">
                      <span className="font-medium">{product.name} <span className="text-gray-400">×{quantity}</span></span>
                      <span className="font-semibold">${(parseFloat(product.price) * quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                  <span>Payment</span>
                  <span className="font-semibold capitalize text-gray-700">{form.paymentMethod.replace('_', ' ')}</span>
                </div>
              </section>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="w-full md:w-64 md:shrink-0 card p-4 md:p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h2>

            {/* Cart items */}
            <div className="space-y-3 mb-4">
              {state.cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-2.5">
                
               
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-gray-900 truncate">{product.name}</p>
                    <p className="text-[10px] text-gray-400">Qty: {quantity}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-900">
                    ${(parseFloat(product.price) * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${cartTotals.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full">FREE</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (8%)</span>
                <span className="font-medium text-gray-900">${cartTotals.tax}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mt-3 pt-3 border-t border-gray-200">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</span>
              <span className="text-2xl font-bold text-teal-600">${cartTotals.total}</span>
            </div>

            <button
  onClick={handlePlaceOrder}
  disabled={paymentLoading || state.cart.length === 0}
  className="w-full mt-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300
    disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-lg
    flex items-center justify-center gap-2 transition-colors"
>
  {paymentLoading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Opening payment...
    </>
  ) : (
    <>
      Pay ${cartTotals.total} →
    </>
  )}
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
                Insured
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
