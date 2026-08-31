import { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // පිටුව ලෝඩ් වෙද්දී LocalStorage එකේ තියෙන භාණ්ඩ ටික ගන්නවා
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  // Cart එකෙන් භාණ්ඩයක් අයින් කරන Function එක
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // මුළු මුදල ගණනය කිරීම
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-8 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">ඔබේ සාප්පු කරත්තය (Cart)</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">ඔබේ කරත්තය හිස්ව ඇත.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* භාණ්ඩ ලැයිස්තුව */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-semibold">රු. {item.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ඉවත් කරන්න
                </button>
              </div>
            ))}
          </div>

          {/* මුළු මුදල පෙන්වන කොටස */}
          <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-md border border-gray-100 h-fit">
            <h3 className="text-xl font-bold border-b pb-3 mb-4">ඇණවුම් සාරාංශය</h3>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">භාණ්ඩ ({cartItems.length}):</span>
              <span className="font-bold">රු. {totalPrice}</span>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition">
              Checkout (මිලදී ගන්න)
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;