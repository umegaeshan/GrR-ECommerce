import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* ========================================== */}
          {/* 1. Logo (වම් පස) */}
          {/* ========================================== */}
          <div className="flex items-center md:w-1/4">
            <Link to="/" className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 hover:opacity-80 transition-opacity">
              GrR.
            </Link>
          </div>

          {/* ========================================== */}
          {/* 2. DESKTOP VIEW: මැද ඇති මෙනුව (Centered Links) */}
          {/* ========================================== */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-6 py-2 rounded-full border border-gray-700/50">
              <Link to="/" className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300">Home</Link>
              <Link to="/products" className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300">Products</Link>
              <Link to="/about" className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300">Contact Us</Link>
              {userInfo?.isAdmin && (
                <Link to="/admin" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 px-4 py-2 rounded-full text-base font-semibold transition-all duration-300">Admin Dashboard</Link>
              )}
            </div>
          </div>

          {/* ========================================== */}
          {/* 3. DESKTOP VIEW: දකුණු පස ඇති Icons (Cart & Profile) */}
          {/* ========================================== */}
          <div className="hidden md:flex items-center justify-end space-x-4 md:w-1/4">
            
            {/* Clear Cart SVG Icon */}
            <Link to="/cart" className="p-2.5 bg-gray-800/50 hover:bg-gray-700 border border-gray-700/50 rounded-full text-gray-300 hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </Link>
            
            {userInfo ? (
              <div className="relative">
                {/* Clear User Profile SVG Icon */}
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)} 
                  className="p-2.5 bg-gray-800/50 hover:bg-gray-700 border border-gray-700/50 rounded-full text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-gray-100 transform origin-top-right transition-all duration-300 ease-out">
                    <div className="px-5 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate mt-0.5">{userInfo.name}</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={logoutHandler} 
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl font-semibold transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-full text-base font-bold shadow-lg shadow-blue-500/30 transition-all duration-300">
                Login
              </Link>
            )}
          </div>

          {/* ========================================== */}
          {/* 4. MOBILE VIEW */}
          {/* ========================================== */}
          <div className="flex md:hidden items-center space-x-3">
            
            <Link to="/cart" className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </Link>

            {userInfo ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100">
                    <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100 font-bold truncate">{userInfo.name}</div>
                    <div className="p-1">
                      <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl font-semibold">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-blue-400 text-base font-bold px-2">Login</Link>
            )}

            {/* Clear Hamburger Menu Icon */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 ml-1 text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Hamburger Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">Products</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">Contact Us</Link>
          {userInfo?.isAdmin && (
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-medium text-emerald-400 hover:bg-emerald-400/10 transition-colors">Admin Dashboard</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;