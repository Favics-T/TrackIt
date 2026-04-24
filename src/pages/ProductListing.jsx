import { useState, useMemo } from 'react'
import { ChevronRight, Package2, Star, TrendingUp, Settings2, ShoppingCart, Check } from 'lucide-react'
import Navbar from '../component/layout/Navbar.jsx'
import { products } from '../data/product.js'
// import products from '../data/product.js'
import { useApp } from '../context/AppContext.jsx'

const categories = [
  { label: 'All',      Icon: Package2,  filter: null         },
  { label: 'Quoted',   Icon: Star,      filter: 'CURATED'    },
  { label: 'Tracked',  Icon: TrendingUp,filter: 'IN TRANSIT' },
  { label: 'Settled',  Icon: Settings2, filter: 'ONLINE'     },
]

const badgeStyles = {
  teal:  'bg-teal-600 text-white',
  green: 'bg-green-500 text-white',
  amber: 'bg-amber-400 text-white',
}

export default function ProductListing() {
  const { state, dispatch } = useApp()
  const [activeCat, setActiveCat] = useState(0)
  const [search, setSearch]       = useState('')
  const [addedIds, setAddedIds]   = useState({})

  const filtered = useMemo(() => {
    const catFilter = categories[activeCat].filter
    return products.filter(p => {
      const matchesCat    = !catFilter || p.category?.toUpperCase().includes(catFilter)
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [activeCat, search])

  const cartQty = (id) => (state.cart.find(i => i.product.id === id)?.quantity ?? 0)

  const handleAdd = (product) => {
    dispatch({ type: 'ADD_TO_CART', product })
    setAddedIds(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAddedIds(prev => ({ ...prev, [product.id]: false })), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchValue={search} onSearch={setSearch} />

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-gray-400">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium">Product Listing</span>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-12 flex gap-6">

        {/* Sidebar */}
        <aside className="w-44 flex-shrink-0">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Curated Selection
          </p>
          <nav className="space-y-0.5">
            {categories.map(({ label, Icon, filter }, i) => {
              const count = filter
                ? products.filter(p => p.category?.toUpperCase().includes(filter)).length
                : products.length
              return (
                <button
                  key={label}
                  onClick={() => setActiveCat(i)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    activeCat === i
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  <span className={`text-[10px] ${activeCat === i ? 'text-teal-500' : 'text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Hero */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold text-teal-600 uppercase tracking-widest mb-1">
              Editorial Edition
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
              Elevated Essentials.
            </h1>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Experience an uncompromising approach to logistics. Every product is handled with
              precision and delivered with the "Archival and Concierge" touch.
            </p>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package2 className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-400">No products found</p>
              <button
                onClick={() => { setActiveCat(0); setSearch('') }}
                className="mt-3 text-xs text-teal-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((product) => {
              const qty   = cartQty(product.id)
              const added = addedIds[product.id]

              return (
                <div key={product.id} className="card overflow-hidden flex flex-col">
                  {/* Image */}
                  <div
                    className="relative w-full flex items-center justify-center"
                    style={{ backgroundColor: product.bgColor || '#f5f5f4', minHeight: '180px' }}
                  >
                    {product.badge && (
                      <span className={`absolute top-2.5 left-2.5 text-[9px] font-semibold px-2 py-0.5 rounded-full z-10 uppercase tracking-wide ${badgeStyles[product.badgeColor] || badgeStyles.teal}`}>
                        {product.badge}
                      </span>
                    )}
                    {qty > 0 && (
                      <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-white text-teal-600 border border-teal-200 px-1.5 py-0.5 rounded-full z-10">
                        ×{qty} in cart
                      </span>
                    )}
                    <div className="w-full h-[180px] flex items-center justify-center">
                      <span className="text-xs text-gray-400 font-medium px-4 text-center">
                        {product.imageAlt || product.name}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-[11px] text-gray-400 leading-snug mb-2 flex-1">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-baseline gap-1.5 mt-auto">
                      <span className="text-sm font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`w-full mt-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
                        added
                          ? 'bg-green-500 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      {added
                        ? <><Check className="w-3 h-3" /> Added!</>
                        : <><ShoppingCart className="w-3 h-3" /> Add to cart</>
                      }
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
