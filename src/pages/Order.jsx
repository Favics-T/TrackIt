import ShipmentForm from "../component/ShipmentForm";
import ContactInfo from "../component/ContactInfo";
import PaymentMethod from "../component/PaymentMethod";
import ReviewOrder from "../component/ReviewOrder";
import OrderSummary from "../component/OrderSummary";

function Order() {
  return (
    <div className="min-h-screen px-4 lg:px-12 ">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-[36px] font-jakarta font-extrabold text-[#1a1c1d]">
            Finalize Shipment
          </h1>

          <ShipmentForm />
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