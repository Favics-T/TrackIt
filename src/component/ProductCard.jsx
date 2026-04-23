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
    <div className="card shadow-lg overflow-hidden w-73.25 group flex flex-col">
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
        <div className="w-full  flex items-center justify-center">
          <div
            className="text-center text-xs h-[366px] text-gray-400 font-medium px-"
            style={{ wordBreak: 'break-word' }}
          >
            <img src={img} className='object-contain'  />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
          {product.category || 'PRODUCT'}
        </p> */}
        <div className='flex justify-between items-center'>
              <h3 className="text-[20px] font-bold text-[#1A1C1D] leading-tight">{name}</h3>

           <div className="flex items-baseline ">
            <span className="text-sm font-bold text-gray-900">{price}</span>
            {/* {originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">${originalPrice}</span>
            )} */}
          </div>
        </div>
        
        {description && (
          <p className="text-[14px] text-[#3E494A] leading-snug  flex-1">{description}</p>
        )}
        <div className="flex items-center justify-between  ">
         
        </div>
        <button className="btn-primary bg-[#00535B] text-white rounded-2xl w-full  flex items-center justify-center gap-1.5 py-2 cursor-pointer">
          
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
