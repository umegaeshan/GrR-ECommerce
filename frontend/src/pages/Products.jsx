import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8 font-sans text-gray-800 max-w-7xl mx-auto min-h-[75vh] pt-40">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">All Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative flex flex-col"
          >
            {/* පින්තූරය සඳහා Hover Effect (Zoom වීම) */}
            <Link to={`/product/${product._id}`} className="block relative overflow-hidden h-56 bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </Link>
            
            <div className="p-6 flex flex-col flex-grow">
              <Link to={`/product/${product._id}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
                {product.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-2xl font-black text-gray-900">
                    රු. {product.price}
                  </span>
                </div>
                
                <Link 
                  to={`/product/${product._id}`} 
                  className="w-full bg-gray-900 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex justify-center items-center gap-2 shadow-md"
                >
                  View Details
                  {/* කුඩා ඊතල අයිකනයක් (Arrow Icon) */}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* භාණ්ඩ කිසිවක් නොමැති නම් පෙන්වන පණිවිඩය */}
        {products.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No products available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;