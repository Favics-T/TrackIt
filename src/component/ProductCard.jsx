import { ShoppingCart, Check } from 'lucide-react'

export default function ProductCard({ product, qty, added, onAdd, badgeStyles }) {
  return (
    <div className="card overflow-hidden flex flex-col rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
      
      {/* Image Section */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        // style={{ backgroundColor: product.bgColor || '#f9fafb' }}
      >
        {/* Badges */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[9px] font-semibold px-2 py-0.5 rounded-full z-10 uppercase tracking-wide ${badgeStyles[product.badgeColor] || badgeStyles.teal}`}>
            {product.badge}
          </span>
        )}

        {qty > 0 && (
          <span className="absolute top-3 right-3 text-[9px] font-bold bg-white text-teal-600 border border-teal-200 px-2 py-0.5 rounded-full z-10 shadow-sm">
            ×{qty}
          </span>
        )}

        {/* Image */}
        <div className="w-full h-50  flex items-center justify-center ">
          {product.img ? (
            <img
              src={product.img}
              alt={product.name}
              className="max-h-full  w-75 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <span className="text-xs text-gray-400 font-medium text-center">
              {product.name}
            </span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>

        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-[11px] text-gray-400 leading-snug mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base font-bold text-gray-900">
            {product.price.toFixed(2)}
          </span>

          {/* {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )} */}
        </div>

        {/* Button */}
        <button
          onClick={() => onAdd(product)}
          className={`w-full mt-3 flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 ${
            added
              ? 'bg-[#1a1c1d] text-white'
              : 'bg-teal-800 hover:bg-teal-700 text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}