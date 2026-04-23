import React from 'react'
// import NavBar from '../component/layout/NavBar.jsx'
import Navbar from '../component/layout/Navbar.jsx'
import { products,sidebarCategories } from '../data/product'
import ProductCard from '../component/ProductCard'
import { ChevronRight, Package2, Star, TrendingUp, Settings2 } from 'lucide-react'
import { useState } from 'react'

const sidebarIcons = [Package2, Star, TrendingUp, Settings2]


function ProductListing() {
  
  const[activeCategory,setActiveCategory] = useState(0)
 
  return (
     <div className="min-h-screen ">
      {/* <Navbar /> */}
      {/* <NavBar /> */}

      {/* Breadcrumb */}
      {/* <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-gray-400">
        <span className="hover:text-gray-600 cursor-pointer">Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium">Product Listing</span>
      </div> */}

      <div className="max-w-[1200px]  flex ">
        {/* Sidebar */}
        {/* <aside className="w-44 flex-shrink-0">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Curated Selection
          </p>
          <nav className="space-y-0.5">
            {sidebarCategories.map((cat, i) => {
              const Icon = sidebarIcons[i]
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(i)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    activeCategory === i
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="flex-1">{cat.label}</span>
                  <span className={`text-[10px] ${activeCategory === i ? 'text-teal-500' : 'text-gray-400'}`}>
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside> */}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Hero header */}
          <div className="mb-6">
            <p className="text-[12px] font-semibold text-[#3E494A] uppercase tracking-widest ">
              Editorial Edition
            </p>
            <h1 className="text-[48px] font-extrabold text-[#00535B] font-jakarta  leading-tight">
              Elevated Essentials.
            </h1>
            <p className="text-[16px] text-[#3E494A] max-w-lg leading-relaxed">
              Experience a refine approach to logistics. Every product is tracked with
              precision, handled with care, and delivered with the "Archival and Concierge"
              touch.
            </p>
          </div>

          {/* Product grid  */}
          <div className="grid grid-cols-3 gap-8">
            {/* Row 1 - 3 columns */}
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Row 2 - product 4 in col 2, product 5 in col 3 */}
            <div className="col-start-1 col-end-2" />
            {products.slice(3, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListing
