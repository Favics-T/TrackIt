import React from 'react'


const Input =({label,name})=>{
    return (
        <div className='flex flex-col gap-2'>
<label htmlFor='' className="text-sm font-bold ">{label}</label>
        <input className='bg-[#f3f3f5] outline-none focus-none py-1 px-2 block w-full rounded-lg text-[#1a1c1d] ' type="text" value={name} />
        </div>
        
    )
}
export default Input