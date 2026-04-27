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


      <div className=" mx-auto px-4 md:px-6 pb-24 md:pb-12 pt-6 md:py-16 flex gap-8 md:gap-16" >
        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Hero */}
          <div className="mb-6">
            <p className="text-[14px] font-bold text-teal-700 uppercase tracking-widest mb-1">
              Editorial Edition
            </p>
            <h1 className="text-4xl font-thin font-jakarta text-gray-900 mb-2 leading-tight">
              Elevated Essentials.
            </h1>
            <p className="text-[14px]  text-gray-700 font-jakarta max-w-xl leading-relaxed">
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
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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
