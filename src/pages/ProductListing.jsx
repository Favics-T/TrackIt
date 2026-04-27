import { useState, useMemo } from 'react'
import { ChevronRight, Package2, Star, TrendingUp, Settings2, ShoppingCart, Check } from 'lucide-react'
import NavBar from '../component/layout/NavBar.jsx'
import ProductCard from "../component/ProductCard";
import { products } from '../data/product.js'
import { useApp } from '../context/AppContext.jsx'
import Sidebar from '../component/layout/Sidebar'
import BottomNav from '../component/layout/BottomNav.jsx';


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
    <div className="min-h-screen  bg-white">
      <NavBar searchValue={search} onSearch={setSearch} />
      <BottomNav />

      {/* Breadcrumb */}
      {/* <div className="max-w-[1200px] mx-auto px-6 py-13 flex items-center gap-1.5 text-xs text-gray-400">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-smibold text-[20px]">Product Listing</span>
      </div> */}

      <div className="max-w-300 mx-auto px-6 pb-12 py-16 flex gap-16">

        {/* Sidebar */}
        {/* <aside className="w-44 flex-shrink-0">
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
        </aside> */}
        <Sidebar />

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
            <p className="text-[12px] font-extrabold text-gray-700 font-jakarta max-w-xl leading-relaxed">
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
         <div className="grid grid-cols-3 gap-8">
  {filtered.map((product) => {
    const qty   = cartQty(product.id)
    const added = addedIds[product.id]

    return (
      <ProductCard
                key={product.id}
        product={product}
        qty={qty}
        added={added}
        onAdd={handleAdd}
        badgeStyles={badgeStyles}
      />
    )
  })}
</div>
        </div>
      </div>
    </div>
  )
}
