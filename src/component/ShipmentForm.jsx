
import { UserContext } from '../hook/UserContext.jsx';
import Input from './UI/Input.jsx'
import { useContext } from 'react'

function ShipmentForm() {
  const {formData,handleChange}= useContext(UserContext)
  
  return (
    <section className="bg-white p-8 rounded-xl  ">
      <div className='flex flex-col gap-4'>        
          <Input  value={formData.fullName} label='FULL NAME'  />
          <Input  value={formData.streetAddress} label='STREET ADDRESS'  />
        <div className='flex w-full  gap-4 '>
          <Input onChange={handleChange} label='City' className='w-1/2 ' />
          <Input onChange={handleChange} label='Zip Code' className='w-1/2 ' />
          </div>
        </div>
    </section>
  );}

export default ShipmentForm;