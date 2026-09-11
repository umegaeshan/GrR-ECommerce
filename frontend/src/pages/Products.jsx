import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL එකෙන් Search කරන වචනය ලබාගැනීම
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // Database එකෙන් සියලුම භාණ්ඩ ගෙන ඒම
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Search එකට අදාළව භාණ්ඩ පෙරීම (Filter කිරීම)
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true; // Search කර නැත්නම් ඔක්කොම පෙන්වනවා
    return (
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Search එක මකා දමා නැවත සියලුම භාණ්ඩ බැලීමට
  const clearSearch = () => {
    navigate('/products');
  };

  if (loading) return <div className="text-center p-10 font-bold text-xl mt-20 text-gray-500">Loading Products...</div>;

  return (
    <div className="p-8 font-sans text-gray-800 max-w-7xl mx-auto min-h-[75vh]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {searchQuery ? `"${searchQuery}" සඳහා සෙවුම් ප්‍රතිඵල` : 'සියලුම භාණ්ඩ (All Products)'}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-bold bg-white px-3 py-1 rounded-full border shadow-sm">
            {filteredProducts.length} Items Found
          </span>
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-1 rounded-full text-sm font-bold transition shadow-sm"
            >
              Clear Search &times;
            </button>
          )}
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
            <Link to={`/product/${product._id}`}>
              <div className="relative overflow-hidden bg-white p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-5 pb-0">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
              </div>
            </Link>
            <div className="px-5 pb-5 pt-2 flex flex-col flex-grow justify-end">
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-black text-green-600 tracking-tight">රු. {product.price}</span>
              </div>
              <Link 
                to={`/product/${product._id}`} 
                className="block text-center w-full bg-gray-900 hover:bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Search ප්‍රතිඵල කිසිවක් නොමැති විට පෙන්වන පණිවිඩය */}
      {filteredProducts.length === 0 && (
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 mt-10">
          <div className="text-gray-300 mb-4 flex justify-center">
             <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
             </svg>
          </div>
          <p className="text-gray-500 text-xl font-bold mb-6">
            ඔබ සෙවූ <span className="text-gray-900">"{searchQuery}"</span> සඳහා භාණ්ඩ කිසිවක් අප සතුව නොමැත.
          </p>
          <button 
            onClick={clearSearch} 
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-cyan-500 transition-colors shadow-md"
          >
            සියලුම භාණ්ඩ බලන්න
          </button>
        </div>
      )}

    </div>
  );
};

export default Products;