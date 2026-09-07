import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams(); // URL එකෙන් භාණ්ඩයේ ID එක ගන්නවා
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Product details error:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Home පිටුවේ තිබුණා වගේම Cart එකට දාන Function එක
  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existItem = cartItems.find((x) => x._id === product._id);
    
    if (existItem) {
       alert('මේ භාණ්ඩය දැනටමත් Cart එකේ ඇත!');
    } else {
       cartItems.push({ ...product, qty: 1 });
       localStorage.setItem('cartItems', JSON.stringify(cartItems));
       alert('සාර්ථකව Cart එකට එකතු කළා!');
       navigate('/cart'); // Cart පිටුවට යවනවා
    }
  };

  if (loading) return <div className="text-center p-10 font-bold text-xl">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans min-h-[70vh]">
      <Link to="/" className="text-gray-500 hover:text-gray-900 font-bold mb-6 inline-block">
        &larr; Go Back
      </Link>

      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* භාණ්ඩයේ පින්තූරය */}
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* භාණ්ඩයේ විස්තර */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-6 border-b pb-4">{product.category}</p>
          
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-extrabold text-green-600 mb-6">
            රු. {product.price}
          </div>

          <div className="mb-6 flex items-center gap-3">
            <span className="font-bold text-gray-700">Availability:</span>
            {product.countInStock > 0 ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">In Stock ({product.countInStock})</span>
            ) : (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">Out of Stock</span>
            )}
          </div>

          <button 
            onClick={addToCart}
            disabled={product.countInStock === 0}
            className={`w-full font-bold py-3 px-4 rounded transition-colors duration-200 ${
              product.countInStock > 0 
                ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.countInStock > 0 ? 'Add to Cart (Buy Now)' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;