import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    // 1. Floating Container (පාවෙන සැකැස්ම)
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      
      {/* 2. Glassmorphism Main Navbar */}
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 md:px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300">
            <span className="text-white font-black text-sm tracking-tighter">GrR</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </div>
          <span className="hidden lg:block text-xl font-bold tracking-wide text-white group-hover:text-cyan-400 transition-colors">
            GrR<span className="text-cyan-500">.</span>
          </span>
        </Link>

        {/* Inner Pill Links (නවීන අභ්‍යන්තර මෙනුව) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-full">
          <Link to="/" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Home</Link>
          <Link to="/products" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Products</Link>
          <Link to="/cart" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Cart</Link>
          <Link to="/about" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">About Us</Link>
          <Link to="/contact" className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Contact Us</Link>
          
          {user && user.isAdmin && (
            <Link to="/admin" className="px-5 py-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-full transition-all duration-300 relative group">
              Admin
              {/* Hover කරන විට යටින් දිස්වන කුඩා තිත */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>
            </Link>
          )}
        </div>

        {/* User / Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* පරිශීලක නම සහ අයිකනය */}
              <div className="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/5 hover:border-white/20 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 flex items-center justify-center font-extrabold text-xs shadow-inner">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-200 hidden sm:inline">
                  {user.name}
                </span>
              </div>
              
              {/* නවීන Icon-based Logout Button එක */}
              <button 
                onClick={handleLogout} 
                className="group relative p-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                title="Logout"
              >
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="relative px-7 py-2.5 rounded-full font-extrabold text-sm text-gray-900 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] hover:scale-105"
            >
              Sign up
            </Link>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Navbar;