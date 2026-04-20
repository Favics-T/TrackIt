function ContactInfo() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="font-semibold text-gray-700">Contact Information</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input className="input" placeholder="Phone Number" />
        <input className="input" placeholder="Email Address" />
      </div>
    </section>
  );
}

export default ContactInfo;