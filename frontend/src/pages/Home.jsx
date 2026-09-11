import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Products Fetching Error:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existItem = cartItems.find((x) => x._id === product._id);
    
    if (existItem) {
       alert('Thus product is already in your cart!');
    } else {
       cartItems.push({ ...product, qty: 1 });
       localStorage.setItem('cartItems', JSON.stringify(cartItems));
       alert('Product added successfully to cart!');
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen ">
      
      {/* 1. Modern Hero Section (Background Image සහිතව) */}
      <div 
        className="relative h-[60vh] md:h-[75vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/6214128/pexels-photo-6214128.jpeg')" }} 
      >
        {/* අකුරු පැහැදිලිව පෙනීම සඳහා යොදන අඳුරු ආවරණය (Gradient Overlay) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900/90"></div>
        
        <div className="relative z-10 text-center px-4 mt-10">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
            GrR E-Commerce
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light italic tracking-[0.2em] uppercase mt-2">
            Beyond the Limits
          </p>
          <button 
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            className="mt-12 bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* 2. Product Grid Section */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Latest Products
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <div 
              key={product._id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative flex flex-col"
            >
              {/* "New" Badge එක */}
              <div className="absolute top-4 right-4 z-10 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                New
              </div>

              {/* පින්තූරය සඳහා Hover Effect (Zoom වීම) */}
              <Link to={`/product/${product._id}`} className="block relative overflow-hidden h-56">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
                  {product.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-2xl font-black text-gray-900">
                      Rs. {product.price}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product)} 
                    className="w-full bg-gray-900 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex justify-center items-center gap-2"
                  >
                    {/* Cart Icon එක */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;