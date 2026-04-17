import React, { useState } from 'react'
import { pages } from '../../page/pages'
import { Link } from 'react-router-dom'

function Sidebar() {
    const [active,setActive] = useState('')
  return (
    <div className='w-2/10'>
      <div className='h-19.75'>
        <h1 className='text-[18px] font-bold text-[#115E59] font-jakarta'>Curated Selection</h1>
      <p className='text-[10px] text-[#64748B]'>PREMIUM LOGISTICS</p>
      </div>

      {/* links */}
      <ul className='flex flex-col gap-[8px]'>
        {
            pages.map((pg)=>{
                const Icon = pg.icon
             return( 
                <Link to={pg.link}>
                    <div onClick={()=>setActive(pg.page)} className={`flex items-center gap-[10px]  ${active=== pg.page? 'bg-white p-2 rounded-2xl text-[#0F766E] font-bold text-2xl': ''}  `}>
                          <Icon className='text-[12px]' />
             <li className={`text-[#64748B] text-[12px] cursor-pointer `}> {pg.page}</li>
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
