function OrderSummary() {
  return (
    <aside className="bg-white p-6 rounded-xl shadow-sm space-y-6 h-fit">
      <h2 className="font-semibold text-gray-800">Order Summary</h2>

      {/* Item */}
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md" />
        <div className="flex-1">
          <p className="text-sm font-medium">Item Name</p>
          <p className="text-xs text-gray-500">1 unit</p>
        </div>
        <p className="text-sm">$95.00</p>
      </div>

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>$95.00</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>$12.12</p>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <p>Total</p>
        <p>$204.12</p>
      </div>

      <button className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition">
        Place Order
      </button>
    </aside>
  );
}

export default OrderSummary;