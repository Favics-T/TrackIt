import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../../pages/pages'


export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50
      bg-white border-t border-gray-100 flex items-center justify-around
      h-14 px-2 safe-area-pb">
      {navLinks.map((pg) => {
        const Icon     = pg.icon
        const isActive = pathname === pg.to

        return (
          <Link
            key={pg.page}
            to={pg.to}
            className="flex flex-col items-center justify-center gap-0.5
              flex-1 h-full transition-colors"
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-xl
              transition-colors
              ${isActive ? 'bg-teal-50' : ''}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
            </div>
            <span className={`text-[10px] font-medium transition-colors
              ${isActive ? 'text-teal-600' : 'text-gray-400'}`}>
              {pg.page}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}