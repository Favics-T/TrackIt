import React, { useContext } from 'react'
import Product from '../component/Product'
import { products } from '../data/product'
import ProductCard from '../component/ProductCard'
import { ProductContext } from '../hook/ProductContext'


function ProductListing() {
  const {addToCart,text} = useContext(ProductContext)
 
  return (
    <div className='flex flex-col gap-12'>
      <div className=''>
        {/* title */}
        <p className='text-[12px] text-[#0F766E] font-semibold'>EDITORIAL EDITION</p>
        <h1 className='text-[48px] font-semibold font-jakarta text-[#00535B]'>Elevated Essentials.</h1>
        <p className='w-5/10 text-[#3E494A] text-[16px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur molestiae asperiores est quidem! Placeat, nobis dignissimos? Facilis hic temporibus quasi!</p>
      </div>

      {/* product listing */}
      <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
         {
        products.map(({img,productName,price,desc,status})=>(
          <ProductCard onClick={addToCart} key={productName} image={img} productName={productName} desc={desc} status={status} price={price} />
        ))
      }
      <h1>{text}</h1>
      </div>
     
    </div>
  )
}

export default ProductListing
