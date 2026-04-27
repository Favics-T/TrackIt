import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, User, ShoppingCart } from 'lucide-react'
import { navLinks } from '../../pages/pages'
import { useApp } from '../../context/AppContext'

export default function NavBar({ searchValue = '', onSearch }) {
  const location   = useLocation()
  const navigate   = useNavigate()
  const { cartCount } = useApp()

  // Only show the search bar on the product listing page
  const showSearch = location.pathname === '/productlisting'

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-300 mx-auto px-6 h-12 flex items-center gap-6">

        {/* Logo */}
        <Link to="/productlisting" className="flex items-center gap-1.5 mr-2">
          <div className="w-5 h-5 bg-teal-600 rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-sm" />
          </div>
          <span className="font-semibold text-sm text-gray-900 tracking-tight">Trackit</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-xs font-medium transition-colors cursor-pointer ${
                location.pathname === link.to
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">

          {/* Search — only renders on /productlisting */}
          {showSearch && (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 w-44 focus-within:border-teal-400 transition-colors">
              <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={e => onSearch?.(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-xs text-gray-500 placeholder-gray-400 focus:outline-none w-full"
              />
            </div>
          )}

          {/* Cart icon with badge */}
          <button
            onClick={() => navigate('/checkoutpage')}
            className="relative w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white
                text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* User */}
          <button className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <User className="w-3.5 h-3.5 text-gray-600" />
          </button>

        </div>
      </div>
    </header>
  )
}