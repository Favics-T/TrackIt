import React, { useState } from 'react'
import { navLinks} from '../../pages/pages'
import { Link } from 'react-router-dom'

function Sidebar() {
    const [active,setActive] = useState('Home')
  return (
    <div className='w-[256px]'>
      <div className='h-19.75'>
        <h1 className='text-[18px] font-bold text-[#115E59] font-jakarta'>Curated Selection</h1>
      <p className='text-[10px] text-[#64748B]'>PREMIUM LOGISTICS</p>
      </div>

      {/* links */}
      <ul className='flex flex-col gap-2 '>
        {
            navLinks.map((pg)=>{
                const Icon = pg.icon
             return( 
                <Link key={pg.page} to={pg.to}>
                    <div onClick={()=>setActive(pg.page)} className={`flex items-center gap-2.5 p-2  ${active=== pg.page? 'bg-[#0f766e]  rounded-2xl text-[#ffffff] font-bold text-2xl': 'text-[#0f766e]'}  `}>
                          <Icon className='text-[12px]' />
             <li className={` text-[12px] cursor-pointer `}> {pg.page}</li>
                </div> 
                </Link>
                
           )
})
        }
      </ul>
    </div>
  )
}

export default Sidebar
