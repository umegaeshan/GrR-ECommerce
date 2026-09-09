const Contact = () => {
  return (
    <div className="p-8 max-w-2xl mx-auto font-sans min-h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b pb-4">Contact Us</h1>
      <form className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Your Name</label>
          <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" placeholder="Enter your name" />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Email Address</label>
          <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" placeholder="Enter your email" />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea rows="4" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-900" placeholder="Enter your message"></textarea>
        </div>
        <button type="button" className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;