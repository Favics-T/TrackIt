import React from 'react'

function ProductCard({image,productName,status,price,desc,onClick}) {
  return (
    <div className='rounded-2xl w-73.25 '>
      <div className=' bg-white rounded-2xl'>
        {/* image section */}
        <div className='relative'>
            <img src={image} alt={productName} className='w-full h-91.5 rounded-2xl'  />
            <p className='absolute top-2 left-2 px-3 py-1 bg-[#CDE5FF] rounded-xl text-[#004B74] text-[10px] font-bold '>{status}</p>
        </div>

        {/* product details section */}
        <div className='flex flex-col gap-4 p-6'>
            {/* product name and price */}
            <div className='flex justify-between items-center font-jakarta'>
                <h1 className='font-bold text-[20px] '>{productName}</h1>
                <p className='text-[#0F766E] text-[16px]'>{price}</p>
            </div>

            <p className='text-[16px] text-[#3E494A]'>{desc}</p>
            <button className='bg-[#00535B] px-6 py-3 text-white font-jakarta text-[10px] font-bold rounded-2xl' onClick={onClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
