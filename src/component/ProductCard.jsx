import React from 'react'
import {ShoppingCart }from 'lucide-react'

function ProductCard({product, variant='default'}) {
   const { name, price, originalPrice, description, badge, badgeColor, bgColor, imageAlt,img } = product

const badgeStyles = {
    teal: 'bg-teal-600 text-white',
    green: 'bg-green-500 text-white',
    amber: 'bg-amber-400 text-white',
  }


  return (
    <div className="card overflow-hidden group flex flex-col">
      {/* Product Image Area */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: bgColor || '#f5f5f4', minHeight: '180px' }}
      >
        {badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[9px] font-semibold px-2 py-0.5 rounded-full z-10 uppercase tracking-wide ${
              badgeStyles[badgeColor] || badgeStyles.teal
            }`}
          >
            {badge}
          </span>
        )}
        {/* Image placeholder rendered as colored div with product label */}
        <div className="w-full h-[180px] flex items-center justify-center">
          <div
            className="text-center text-xs text-gray-400 font-medium px-"
            style={{ wordBreak: 'break-word' }}
          >
            <img src={img} className='object-contain'  />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
          {product.category || 'PRODUCT'}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-1">{name}</h3>
        {description && (
          <p className="text-[11px] text-gray-400 leading-snug mb-2 flex-1">{description}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">${originalPrice}</span>
            )}
          </div>
        </div>
        <button className="btn-primary bg-green-900 text-white rounded-xl w-full mt-2.5 flex items-center justify-center gap-1.5">
          <ShoppingCart className="w-3 h-3" />
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
