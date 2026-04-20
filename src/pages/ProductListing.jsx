import React from 'react'
import Product from '../component/Product'
import { product } from '../data/product'
import ProductCard from '../component/ProductCard'


function ProductListing() {
  const addToCart =()=>{

  }
  return (
    <div className='flex flex-col gap-12'>
      <div className=''>
        {/* title */}
        <p className='text-[12px] text-[#0F766E] font-semibold'>EDITORIAL EDITION</p>
        <h1 className='text-[48px] font-semibold font-jakarta text-[#00535B]'>Elevated Essentials.</h1>
        <p className='w-5/10 text-[#3E494A] text-[16px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur molestiae asperiores est quidem! Placeat, nobis dignissimos? Facilis hic temporibus quasi!</p>
      </div>

      {/* product listing */}
      <div className='grid grid-cols-3 gap-6'>
         {
        product.map(({img,productName,price,desc,status})=>(
          <ProductCard key={productName} image={img} productName={productName} desc={desc} status={status} price={price} onClick={addToCart}/>
        ))
      }
      </div>
     
    </div>
  )
}

export default ProductListing
