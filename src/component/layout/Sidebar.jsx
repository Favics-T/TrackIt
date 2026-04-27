import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../../pages/pages'

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className='w-[256px] md:block hidden shrink-0'>
      <div className='h-19.75'>
        <h1 className='text-[18px] font-bold text-[#115E59] font-jakarta'>Curated Selection</h1>
        <p className='text-[10px] text-[#64748B]'>PREMIUM LOGISTICS</p>
      </div>

      <ul className='flex flex-col gap-2'>
        {navLinks.map((pg) => {
          const Icon = pg.icon
          const isActive = pathname === pg.to

          return (
            <Link key={pg.page} to={pg.to}>
              <div className={`flex items-center gap-2.5 p-2 rounded-2xl transition-colors
                ${isActive
                  ? 'bg-[#0f766e] text-white font-bold'
                  : 'text-[#0f766e] hover:bg-teal-50'
                }`}
              >
                <Icon className='text-[12px]' />
                <li className='text-[12px] cursor-pointer list-none'>{pg.page}</li>
              </div>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar