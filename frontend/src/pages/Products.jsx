import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://grr-backend.onrender.com';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100000);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
        
        if (response.data.length > 0) {
          const highestPrice = Math.max(...response.data.map(p => p.price));
          setMaxPrice(highestPrice);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchSearch = searchQuery === '' || 
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchPrice = product.price <= maxPrice;

    return matchSearch && matchCategory && matchPrice;
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    if (products.length > 0) {
      setMaxPrice(Math.max(...products.map(p => p.price)));
    }
    navigate('/products'); 
  };

  if (loading) return <div className="text-center p-10 font-bold text-xl mt-32 text-gray-500">Loading Products...</div>;

  return (
    // mt-12 සහ py-8 යොදා ඇත්තේ Navbar එකට යටින් හැංගෙන එක වළක්වන්නයි. w-full මගින් තිරය සම්පූර්ණයෙන් භාවිත කරයි.
    <div className="px-4 md:px-8 lg:px-12 py-8 mt-12 font-sans text-gray-800 w-full min-h-[75vh]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {searchQuery ? `"${searchQuery}" results` : 'All Products'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-bold bg-white px-3 py-1 rounded-full border shadow-sm">
            {filteredProducts.length} Items Found
          </span>
        </div>
      </div>
      
      {/* Main Layout: Left Sidebar + Right Product Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* වම් පස - Filters Sidebar */}
        <div className="w-full lg:w-64 shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 font-bold transition">
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-4">Category</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-4 h-4 text-cyan-500 bg-gray-100 border-gray-300 focus:ring-cyan-500"
                  />
                  <span className={`text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-cyan-600 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Max Price</h3>
            <input 
              type="range" 
              min="0" 
              max={products.length > 0 ? Math.max(...products.map(p => p.price)) : 100000} 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-sm font-bold text-gray-500 mt-2">
              <span>Rs. 0</span>
              <span className="text-cyan-600 text-base">Rs. {maxPrice}</span>
            </div>
          </div>
        </div>

        {/* දකුණු පස - Product Grid */}
        <div className="flex-1">
          {/* මෙහි xl:grid-cols-4 යෙදීමෙන් විශාල තිරවලදී පේළියකට භාණ්ඩ 4ක් පෙන්වයි */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-cyan-600 transition-colors line-clamp-1">{product.name}</h3>
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
          
          {filteredProducts.length === 0 && (
            <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 w-full flex flex-col items-center justify-center min-h-[40vh]">
              <div className="text-gray-300 mb-4">
                 <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                 </svg>
              </div>
              <p className="text-gray-500 text-lg font-bold mb-6">
                we're sorry, but no products match your search or filter criteria. Please try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button 
                onClick={clearFilters} 
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-cyan-500 transition-colors shadow-md"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Products;