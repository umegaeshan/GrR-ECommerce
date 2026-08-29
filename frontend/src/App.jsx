import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* හැම පිටුවකම උඩින් පේන Navigation Bar එක */}
      <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '15px' }}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* අදාළ ලින්ක් එකට ගියාම පේන්න ඕනේ පිටුව තීරණය කරන්නේ මෙතනින් */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;