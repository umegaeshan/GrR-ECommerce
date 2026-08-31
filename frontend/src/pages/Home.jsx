import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Products ගෙන ඒමේදී දෝෂයක්:", error);
      }
    };
    fetchProducts();
  }, []);

  // භාණ්ඩ Cart එකට එකතු කරන Function එක
  const addToCart = (product) => {
    // 1. කලින් දාපු භාණ්ඩ තියෙනවද බලනවා (නැත්නම් හිස් ලිස්ට් එකක් ගන්නවා)
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // 2. මේ භාණ්ඩය කලින් Cart එකේ දාලද බලනවා
    const existItem = cartItems.find((x) => x._id === product._id);
    
    if (existItem) {
       alert('මේ භාණ්ඩය දැනටමත් Cart එකේ ඇත!');
    } else {
       // 3. අලුත් භාණ්ඩය ලිස්ට් එකට එකතු කරලා සේව් කරනවා
       cartItems.push({ ...product, qty: 1 });
       localStorage.setItem('cartItems', JSON.stringify(cartItems));
       alert('සාර්ථකව Cart එකට එකතු කළා!');
    }
  };

  return (
    <div className="p-8 font-sans text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">GrR E-Commerce</h1>
        <p className="text-lg text-gray-500 italic mt-2">Beyond the Limits</p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">අපේ නවතම භාණ්ඩ</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-extrabold text-green-600">රු. {product.price}</span>
              </div>
              {/* මෙතන තමයි වෙනස් කළේ */}
              <button 
                onClick={() => addToCart(product)} 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;