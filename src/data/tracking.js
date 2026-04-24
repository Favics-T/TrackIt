export const trackingSteps = [
  {
    id: 1,
    label: 'Order Created',
    detail: 'Payment confirmed and order assigned to Finest Merchant Services.',
    time: 'APR 20, 09:17',
    done: true,
    highlight: false,
  },
  {
    id: 2,
    label: 'Processing',
    detail: 'Item confirmed, pulled from inventory and prepared for dispatch.',
    time: 'APR 21, 11:44',
    done: true,
    highlight: false,
  },
  {
    id: 3,
    label: 'Picked Up',
    detail: 'Package is currently in transit to the hub address in Chicago.',
    time: 'APR 22, 3:30 PM',
    done: true,
    highlight: true,
  },
  {
    id: 4,
    label: 'In Transit (Chicago → Denver)',
    detail: 'Expected Delivery: Wednesday',
    time: 'PENDING',
    done: false,
    highlight: false,
  },
  {
    id: 5,
    label: 'Delivered',
    detail: '',
    time: '',
    done: false,
    highlight: false,
  },
]

export const orderItems = [
  { name: 'Pro Runner V2', meta: 'Size 10 · Blue', price: '$129.00' },
  { name: 'Lunar Minimalist Watch', meta: 'Black Leather', price: '$266.03' },
  { name: 'Tan Camo Duffle', meta: 'Large', price: '$96.03' },
]
