import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import './index.css'; // App.css වෙනුවට index.css යොදන්න

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider">GrR</div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/cart" className="hover:text-gray-300 transition">Cart</Link>
          <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
        </div>
      </nav>

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