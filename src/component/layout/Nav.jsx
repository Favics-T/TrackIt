import React from 'react'
import Logo from '../Logo'
import { pages } from '../../pages/pages'
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';


export default function Nav() {
  return (
    <div className='flex justify-between px-4 py-6'>
    
    <div className='flex gap-12  items-center '>
        <Logo />
      <ul className='flex gap-8 '>
         {
         
                pages.map((pg)=>(
                  <Link to={pg.link}>
                    <li className='text-[14px] text-[#64748B] font-medium'>{pg.page}</li>
                   </Link>
                ))
            }
      </ul>
    </div>
{/* hanging tree jennifer lawrence */}
    <div className='flex items-center gap-8'>
      <input type="text" className='bg-[#f5f5f5]  w-[256px] rounded-2xl' 
      placeholder='.....search curated objected' />
      <CiUser className='text-[#0F766E] font-medium text-lg' />
    </div>



    
      
    </div>
  )
}
