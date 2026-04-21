function ReviewOrder() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="font-semibold text-gray-700">Review Order</h2>

      <div className="flex justify-between text-sm text-gray-600">
        <p>Shipping Address</p>
        <button className="text-teal-600">Edit</button>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <p>Payment Method</p>
        <button className="text-teal-600">Edit</button>
      </div>
    </section>
  );
}

export default ReviewOrder;