function ShipmentForm() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="font-semibold text-gray-700">Delivery Address</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input className="input" placeholder="Full Name" />
        <input className="input" placeholder="Address" />
        <input className="input" placeholder="Street Address" />
        <input className="input" placeholder="Zip Code" />
        <input className="input md:col-span-2" placeholder="City" />
      </div>
    </section>
  );
}

export default ShipmentForm;