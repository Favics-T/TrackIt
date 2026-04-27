import ContactInfo from "../component/ContactInfo";
import PaymentMethod from "../component/PaymentMethod";
import ReviewOrder from "../component/ReviewOrder";
import OrderSummary from "../component/OrderSummary";
import { BiMap } from "react-icons/bi";

function Order() {
  return (
    <div className="min-h-screen  px-4 lg:px-12 md:pb-12 pb-24 ">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex flex-col gap-12">


          <h1 className="text-[36px] font-jakarta font-extrabold text-[#1a1c1d]">
            Finalize Shipment
          </h1>

          <div className='flex flex-col gap-6'>
             <h2 className="font-bold  gap-4 flex items-center   text-[#1a1c1d] text-[20px]">
         <span className=" bg-[#006d77] p-2 rounded-full text-[#9becf7]">
          <BiMap />
          </span> Delivery Address</h2>

          

          </div>

         
          
          <ContactInfo />
          <PaymentMethod />
          <ReviewOrder />
        </div>

        {/* RIGHT SIDE */}
        <OrderSummary />
      </div>
    </div>
  );
}

export default Order;