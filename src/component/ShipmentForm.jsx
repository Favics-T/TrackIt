
import { UserContext } from '../context/UserContext.jsx';
import Input from './UI/Input.jsx'
import { useContext } from 'react'

function ShipmentForm() {
  const {formData,handleChange}= useContext(UserContext)

  console.log(formData.email)
  
  return (
    <section className="bg-white shadow-lg p-8 rounded-xl  ">
      <div className='flex flex-col gap-4'>  
        <form >

         <Input onChange={handleChange} value={formData.fullName} label='FULL NAME'  />
          <Input  value={formData.streetAddress} label='STREET ADDRESS'  />
        <div className='flex w-full  gap-4 '>
          <Input onChange={handleChange} label='City' className='w-1/2 ' />
          <Input onChange={handleChange} label='Zip Code' className='w-1/2 ' />
          </div>
        </form>               
        </div>
    </section>
  );}

export default ShipmentForm;