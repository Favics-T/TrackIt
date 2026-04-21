import { BiMap } from "react-icons/bi";
import Input from './UI/Input.jsx'
import { useState } from 'react'

function ShipmentForm() {
  // const [deliveryData,setDeliveryData] = useState({fullName:'',})
  const [fullName,setFullName]= useState('')
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="font-bold text-[#1a1c1d] text-[20px]"> <span className="text-white bg-[#006d77] text-[#9beccf7]"><BiMap /></span> Delivery Address</h2>

      {/* <div className="grid md:grid-cols-2 gap-4">
        <label htmlFor="">Full Name</label>
        <input className="input" placeholder="Full Name" />
        <label htmlFor="">Address</label>
        <input className="input" placeholder="Address" />
        <label htmlFor="">Street Address</label>
        <input className="input" placeholder="Street Address" />
        <label htmlFor="">Zip Code</label>
        <input className="input" placeholder="Zip Code" />
        <label htmlFor="">City</label>
        <input className="input md:col-span-2" placeholder="City" />
      </div> */}
      <div className='flex flex-col gap-4'>
          <Input value={fullName} label='FULL NAME'  />
          <Input value={fullName} label='STREET ADDRESS'  />
        <div className='flex w-full  gap-4 mt-2'>
          <Input label='City' />
          <Input label='Zip Code' />
          </div>
        </div>

    </section>
  );
}

export default ShipmentForm;