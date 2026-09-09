import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-8 font-sans text-gray-800 max-w-6xl mx-auto min-h-[75vh] pt-45">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Contact Information (Dark Theme) */}
        <div className="md:w-2/5 bg-gray-900 p-10 md:p-14 text-white relative overflow-hidden">
          {/* Decorative Blurs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -ml-20 -mt-20"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mb-20"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-white">
                Get in <span className="text-cyan-400">Touch</span>
              </h2>
              <p className="text-gray-400 mb-10 leading-relaxed text-sm md:text-base">
                Have a question or need assistance? Our PIXCODE Hub team is here to help. Reach out to us, and we will respond as soon as possible.
              </p>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                    <p className="font-bold text-gray-100">support@grr.com</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                    <p className="font-bold text-gray-100">+94 77 123 4567</p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="font-bold text-gray-100">Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side: Contact Form (Light Theme) */}
        <div className="md:w-3/5 p-10 md:p-14 relative bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-gray-900"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea 
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="How can we help you?"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none text-gray-900"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Contact;