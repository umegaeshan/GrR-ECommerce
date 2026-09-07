import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  // Quantity එක වෙනස් කිරීම Cart එක තුළදීම
  const updateQty = (id, newQty) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Cart එකෙන් අයින් කිරීම
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
        cartItems,
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Error occurred while initiating checkout.");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans min-h-[75vh]">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 border-b pb-4">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-lg mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block bg-gray-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* භාණ්ඩ ලැයිස්තුව (Modern Cards) */}
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition gap-4">
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border bg-gray-50 p-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-extrabold mt-1">රු. {item.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button 
                      onClick={() => updateQty(item._id, item.qty > 1 ? item.qty - 1 : 1)}
                      className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200 transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-bold text-gray-800">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-3 py-2 rounded-lg transition"
                  >
                    ඉවත් කරන්න
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* ඇණවුම් සාරාංශය (Order Summary Sidebar) */}
          <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl font-bold border-b pb-4 mb-4 text-gray-800">Order Summary</h3>
            
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Item Queantity ({totalItemsCount}):</span>
              <span className="font-bold text-gray-800">රු. {totalPrice}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600 border-b pb-4">
              <span>Delivary Fee :</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            
            <div className="flex justify-between mb-6 text-lg font-extrabold text-gray-900">
              <span>Totale Prices:</span>
              <span className="text-green-600">රු. {totalPrice}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition"
            >
              Checkout 
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;