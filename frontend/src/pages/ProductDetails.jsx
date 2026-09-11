import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  
  // States අලුතින් එකතු කළේ
  const [selectedImage, setSelectedImage] = useState('');
  const [qty, setQty] = useState(1); // ප්‍රමාණය (Quantity)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        // මුලින්ම පෙන්වන්නේ ප්‍රධාන image එකයි. වෙනත් images නැත්නම් ප්‍රධාන එකම ගන්නවා.
        setSelectedImage(response.data.image);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Cart එකට Quantity එකත් එක්ක දාන Function එක
  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existItemIndex = cartItems.findIndex((x) => x._id === product._id);
    
    if (existItemIndex >= 0) {
       // කලින් තිබුණ නම් Quantity එක අලුත් අගයට යාවත්කාලීන කරනවා
       cartItems[existItemIndex].qty = qty;
    } else {
       // අලුතින් එකතු කරනවා
       cartItems.push({ ...product, qty });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Successfully added to cart!');
    navigate('/cart');
  };

  if (loading) return <div className="text-center p-10 font-bold text-xl">Loading...</div>;

  // උදාහරණයක් ලෙස අමතර පින්තූර නැත්නම් ප්‍රධාන පින්තූරයම මත පදනම්ව වෙනත් වර්ණ/පින්තූර පෙන්වීමට 배열 එකක් හදාගමු
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans min-h-[70vh] pt-40">
      <Link to="/products" className="text-gray-500 hover:text-gray-900 font-bold mb-6 inline-block">
        &larr; Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* පින්තූර පෙන්වන කොටස (Images Gallery) */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="border rounded-xl overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center p-4">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-[350px] object-contain transition-all duration-300"
            />
          </div>
          
          {/* කුඩා පින්තූර (Thumbnails) මාරු කර බැලීමට */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt="" 
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === img ? 'border-gray-900 scale-105' : 'border-gray-200 opacity-70'}`}
              />
            ))}
          </div>
        </div>

        {/* භාණ්ඩයේ විස්තර සහ Quantity පාලනය */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">{product.category}</p>
            
            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="text-3xl font-extrabold text-green-600 mb-6">
              Rs. {product.price}
            </div>

            <div className="mb-6 flex items-center gap-3">
              <span className="font-bold text-gray-700">Stock:</span>
              {product.countInStock > 0 ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">In Stock ({product.countInStock})</span>
              ) : (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">Out of Stock</span>
              )}
            </div>

            {/* Quantity වෙනස් කිරීමේ කොටස */}
            {product.countInStock > 0 && (
              <div className="mb-6 flex items-center gap-4">
                <span className="font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-bold text-gray-800">{qty}</span>
                  <button 
                    onClick={() => setQty(qty < product.countInStock ? qty + 1 : qty)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={addToCart}
            disabled={product.countInStock === 0}
            className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md ${
              product.countInStock > 0 
                ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.countInStock > 0 ? 'Add to Cart ' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;