import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* 1. Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.6)] group-hover:scale-110 transition-transform"></div>
          <span className="text-xl font-black tracking-wider text-white">
            GrR<span className="text-cyan-400">.</span>
          </span>
        </Link>

        {/* 2. Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/cart" className="hover:text-cyan-400 transition-colors">Cart</Link>
          <Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link>
          
          {user && user.isAdmin && (
            <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors">
              Admin Panel
            </Link>
          )}
        </div>

        {/* 3. User / Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-gray-950 flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-gray-200 hidden sm:inline">
                  {user.name}
                </span>
              </div>
              
              <button 
                onClick={handleLogout} 
                className="bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500 hover:text-white text-xs px-3 py-1.5 rounded-full transition-all font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-bold px-6 py-2 rounded-full transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-105 text-sm"
            >
              Sign up
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;