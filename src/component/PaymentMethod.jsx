function PaymentMethod() {
  const methods = ["Credit Card", "Bank Transfer", "On Delivery"];

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="font-semibold text-gray-700">Payment Method</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {methods.map((method) => (
          <button
            key={method}
            className="border rounded-lg p-4 text-sm hover:border-teal-600 hover:text-teal-600 transition"
          >
            {method}
          </button>
        ))}
      </div>
    </section>
  );
}

export default PaymentMethod;