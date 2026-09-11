const About = () => {
  return (
    <div className="p-8 font-sans text-gray-800 max-w-4xl mx-auto min-h-[75vh] pt-45">
      <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
        
        {/* Background Decorative Blurs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-green-400/10 to-cyan-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Us</span>
          </h1>
          
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              Welcome to <strong className="text-gray-900">GrR E-Commerce!</strong> Our mission is to fulfill your needs through a reliable, convenient, and secure platform. We offer a wide range of high-quality products, including sports equipment, home goods, and modern tech accessories, all curated to elevate your lifestyle.
            </p>
            
            <p>
              Driven by our core theme, <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 italic tracking-wide">"Beyond the Limits,"</span> our dedicated team at <strong className="text-gray-900">PIXCODE Hub</strong> is constantly pushing traditional boundaries. We are committed to innovation and excellence, working tirelessly to provide you with the ultimate, seamless shopping experience.
            </p>
          </div>

          {/* Optional: Simple highlight boxes for visual appeal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="font-bold text-gray-900">Secure</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="font-bold text-gray-900">Fast</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="font-bold text-gray-900">Reliable</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;