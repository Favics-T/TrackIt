import { createContext, useContext, useReducer, useEffect } from 'react'


const initialState = {
  // Cart
  cart: [],                  // [{ product, quantity }]

  // Checkout
  checkoutStep: 1,           // 1 | 2 | 3
  checkoutForm: {
    fullName: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    phone: '',
    email: '',
    paymentMethod: 'credit',
  },
  formErrors: {},

  // Orders
  orders: [],                // [{ id, items, form, subtotal, tax, total, status, createdAt, trackingSteps }]
  activeOrderId: null,
}


function generateOrderId() {
  return 'TK-' + Math.floor(10000 + Math.random() * 90000)
}

function calcTotals(cart) {
  const subtotal = cart.reduce((sum, { product, quantity }) => sum + parseFloat(product.price) * quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax
  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  }
}

function buildInitialTrackingSteps() {
  const now = new Date()
  const fmt = (d) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() +
    ', ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return [
    { id: 1, label: 'Order Created',  detail: 'Payment confirmed and order assigned.',           time: fmt(now),                                    done: true,  highlight: false },
    { id: 2, label: 'Processing',   detail: 'Item confirmed and prepared for dispatch.',       time: fmt(new Date(now.getTime() + 3600000)),       done: false, highlight: false },
    { id: 3, label: 'Picked Up',   detail: 'Package in transit to dispatch hub.',             time: fmt(new Date(now.getTime() + 7200000)),       done: false, highlight: false },
    { id: 4, label: 'In Transit',  detail: 'On the way to your city.',                        time: fmt(new Date(now.getTime() + 86400000)),      done: false, highlight: false },
    { id: 5, label: 'Delivered',    detail: 'Package delivered to your address.',              time: fmt(new Date(now.getTime() + 172800000)),     done: false, highlight: false },
  ]
}


function validateForm(form) {
  const errors = {}
  if (!form.fullName.trim())        errors.fullName       = 'Full name is required'
  if (!form.streetAddress.trim())   errors.streetAddress  = 'Street address is required'
  if (!form.city.trim())            errors.city           = 'City is required'
  if (!/^\d{4,10}$/.test(form.zipCode.trim())) errors.zipCode = 'Enter a valid ZIP code'
  if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email'
  return errors
}

// Reducer 
function reducer(state, action) {
  switch (action.type) {

    // Cart
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { ...state, cart: [...state.cart, { product: action.product, quantity: 1 }] }
    }

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.product.id !== action.productId) }

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0)
        return { ...state, cart: state.cart.filter(i => i.product.id !== action.productId) }
      return {
        ...state,
        cart: state.cart.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] }

    // Checkout form
    case 'SET_FORM_FIELD':
      return {
        ...state,
        checkoutForm: { ...state.checkoutForm, [action.field]: action.value },
        formErrors: { ...state.formErrors, [action.field]: '' },
      }

    case 'SET_FORM_ERRORS':
      return { ...state, formErrors: action.errors }

    case 'SET_CHECKOUT_STEP':
      return { ...state, checkoutStep: action.step }

    case 'RESET_CHECKOUT':
      return {
        ...state,
        checkoutStep: 1,
        checkoutForm: initialState.checkoutForm,
        formErrors: {},
      }

    // Place order
    case 'PLACE_ORDER': {
      const totals = calcTotals(state.cart)
      const order = {
        id: generateOrderId(),
        items: [...state.cart],
        form: { ...state.checkoutForm },
        ...totals,
        status: 'processing',
        createdAt: new Date().toISOString(),
        trackingSteps: buildInitialTrackingSteps(),
        progressPercent: 10,
      }
      return {
        ...state,
        orders: [order, ...state.orders],
        activeOrderId: order.id,
        cart: [],
        checkoutStep: 1,
        checkoutForm: initialState.checkoutForm,
        formErrors: {},
      }
    }

    // Tracking: advance a step
    case 'ADVANCE_TRACKING': {
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id !== action.orderId) return order
          const steps = order.trackingSteps
          const nextIdx = steps.findIndex(s => !s.done)
          if (nextIdx === -1) return order
          const updated = steps.map((s, i) => ({
            ...s,
            done: i <= nextIdx,
            highlight: i === nextIdx,
          }))
          const progress = Math.round(((nextIdx + 1) / steps.length) * 100)
          const statusMap = ['processing', 'processing', 'shipped', 'in_transit', 'delivered']
          return { ...order, trackingSteps: updated, progressPercent: progress, status: statusMap[nextIdx] || 'delivered' }
        }),
      }
    }

    default:
      return state
  }
}

//  Context 
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('trackit_state')
      return saved ? { ...init, ...JSON.parse(saved) } : init
    } catch {
      return init
    }
  })

  // Persist to localStorage on every state change
  useEffect(() => {
    localStorage.setItem('trackit_state', JSON.stringify(state))
  }, [state])

  // Convenience selectors
  const cartCount     = state.cart.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotals    = calcTotals(state.cart)
  const activeOrder   = state.orders.find(o => o.id === state.activeOrderId) || null

  return (
    <AppContext.Provider value={{ state, dispatch, cartCount, cartTotals, activeOrder }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

export { validateForm, calcTotals }
