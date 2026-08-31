import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import './index.css';

// Navigation Bar එක වෙනම Component එකක් විදිහට හැදුවා (ලේසි වෙන්න)
const Navigation = () => {
  const navigate = useNavigate();
  
  // LocalStorage එකෙන් ලොගින් වෙලා ඉන්න කෙනාගේ විස්තර ගන්නවා
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo'); // විස්තර මකා දමනවා
    navigate('/login'); // ආයෙත් Login පිටුවට යවනවා
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold tracking-wider">GrR</div>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/cart" className="hover:text-gray-300 transition">Cart</Link>
        
        {/* User කෙනෙක් ඉන්නවා නම් නම සහ Logout බටන් එක පෙන්නනවා, නැත්නම් Login ලින්ක් එක පෙන්නනවා */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-green-400 font-semibold">Hi, {user.name}</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-500 text-sm px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;